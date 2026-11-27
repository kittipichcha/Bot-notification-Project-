const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_ROOT = path.resolve(__dirname, '..');
const BRANCH_RE = /^(feat|fix|chore|docs|refactor|test|ci)\/(ep[0-9]{2}-[0-9]{2}|[0-9]+)-[a-z0-9][a-z0-9-]*$/;

function validateBranchName(branch) {
  if (typeof branch !== 'string' || !branch.trim()) {
    return { ok: false, error: 'Missing pull request head branch name' };
  }
  const match = branch.trim().match(BRANCH_RE);
  if (!match) {
    return {
      ok: false,
      branch,
      error: `Branch "${branch}" must match ^(feat|fix|chore|docs|refactor|test|ci)/(epXX-YY|<num>)-<slug>$`,
    };
  }
  const token = match[2];
  const isEp = token.startsWith('ep');
  return {
    ok: true,
    branch: branch.trim(),
    type: match[1],
    kind: isEp ? 'ep' : 'number',
    issueToken: isEp ? token.toUpperCase() : Number(token),
  };
}

function stripHtmlComments(text) {
  return String(text || '').replace(/<!--[\s\S]*?-->/g, '');
}

function extractIssueRefs({ title = '', body = '', repoFullName = '' } = {}) {
  const combined = `${title}\n${stripHtmlComments(body)}`;
  const errors = [];
  const githubSet = new Set();
  const epSet = new Set();
  const normalizedRepo = String(repoFullName || '').trim().toLowerCase();

  for (const match of combined.matchAll(/https?:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+\b/gi)) {
    errors.push(`Pull request URL "${match[0]}" is not a valid issue reference`);
  }

  for (const match of combined.matchAll(/https?:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)\/issues\/(\d+)\b/gi)) {
    const ownerRepo = match[1].toLowerCase();
    const num = Number(match[2]);
    if (normalizedRepo && ownerRepo !== normalizedRepo) {
      errors.push(`Foreign repository issue URL "${match[0]}" is not allowed`);
    } else if (num === 0) {
      errors.push('Issue reference #0 is invalid');
    } else {
      githubSet.add(num);
    }
  }

  for (const match of combined.matchAll(/(?:^|[\s(\[:"',/])([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)?#(\d+)\b/g)) {
    const ownerRepo = match[1] ? match[1].toLowerCase() : null;
    const num = Number(match[2]);
    if (ownerRepo && normalizedRepo && ownerRepo !== normalizedRepo) {
      errors.push(`Foreign repository issue reference "${match[1]}#${match[2]}" is not allowed`);
    } else if (ownerRepo && !normalizedRepo) {
      errors.push(`Cross-repository issue reference "${match[1]}#${match[2]}" is not allowed without matching repository context`);
    } else if (num === 0) {
      errors.push('Issue reference #0 is invalid');
    } else {
      githubSet.add(num);
    }
  }

  for (const match of combined.matchAll(/\b(EP[0-9]{2}-[0-9]{2})\b/gi)) {
    epSet.add(match[1].toUpperCase());
  }

  return {
    githubNumbers: [...githubSet].sort((a, b) => a - b),
    epIds: [...epSet].sort(),
    errors,
  };
}

async function defaultResolveGitHubIssue(repoFullName, number) {
  if (!repoFullName || !repoFullName.includes('/')) {
    throw new Error(`Cannot resolve GitHub issue #${number}: missing owner/repo`);
  }
  const url = `https://api.github.com/repos/${repoFullName}/issues/${number}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'notification-ci-governance',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub issue #${number} lookup failed with HTTP ${res.status}`);
  }
  return res.json();
}

async function validatePrGovernance({
  root = DEFAULT_ROOT,
  event,
  resolveGitHubIssue = defaultResolveGitHubIssue,
} = {}) {
  const errors = [];
  if (!event || typeof event !== 'object' || !event.pull_request) {
    return { ok: false, errors: ['Missing pull_request payload in event'] };
  }

  const pr = event.pull_request;
  const branch = pr.head?.ref;
  const repoFullName = event.repository?.full_name || process.env.GITHUB_REPOSITORY || '';

  const branchResult = validateBranchName(branch);
  if (!branchResult.ok) {
    errors.push(branchResult.error);
  }

  const refs = extractIssueRefs({
    title: pr.title || '',
    body: pr.body || '',
    repoFullName,
  });
  errors.push(...refs.errors);

  if (refs.githubNumbers.length === 0 && refs.epIds.length === 0) {
    errors.push('Pull request title or body must reference a tracked issue (e.g. #<num> or EPxx-yy)');
  }

  for (const epId of refs.epIds) {
    const issueFile = path.join(root, 'docs', 'issues', `${epId}.md`);
    if (!fs.existsSync(issueFile)) {
      errors.push(`Referenced issue file docs/issues/${epId}.md does not exist`);
    }
  }

  const resolvedIssues = [];
  for (const num of refs.githubNumbers) {
    try {
      const issue = await resolveGitHubIssue(repoFullName, num);
      if (!issue || typeof issue !== 'object') {
        errors.push(`GitHub issue #${num} returned an empty response`);
        continue;
      }
      if (issue.pull_request) {
        errors.push(`GitHub #${num} is a pull request, not an issue`);
        continue;
      }
      resolvedIssues.push({
        number: num,
        title: String(issue.title || ''),
      });
    } catch (err) {
      errors.push(err.message);
    }
  }

  if (branchResult.ok && (refs.githubNumbers.length > 0 || refs.epIds.length > 0)) {
    if (branchResult.kind === 'ep') {
      const expectedEp = branchResult.issueToken;
      const hasMatchingEpRef = refs.epIds.includes(expectedEp);
      const hasMatchingGhTitle = resolvedIssues.some((issue) =>
        issue.title.toUpperCase().startsWith(expectedEp),
      );
      if (!hasMatchingEpRef && !hasMatchingGhTitle) {
        errors.push(
          `Branch "${branchResult.branch}" requires linked issue "${expectedEp}" or a GitHub issue whose title starts with "${expectedEp}"`,
        );
      }
    } else if (branchResult.kind === 'number') {
      const expectedNum = branchResult.issueToken;
      if (!refs.githubNumbers.includes(expectedNum)) {
        errors.push(`Branch "${branchResult.branch}" requires linked GitHub issue #${expectedNum}`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    branch: branchResult,
    refs,
    resolvedIssues,
    errors,
  };
}

function parseArgs(argv) {
  let eventPath = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--event-path') {
      eventPath = argv[++i];
      if (!eventPath) throw new Error('Missing value for --event-path');
    } else {
      throw new Error(`Unknown argument: ${argv[i]}`);
    }
  }
  if (!eventPath) throw new Error('Usage: check-pr-governance.js --event-path <path>');
  return { eventPath: path.resolve(eventPath) };
}

if (require.main === module) {
  (async () => {
    const { eventPath } = parseArgs(process.argv.slice(2));
    const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    const result = await validatePrGovernance({ root: DEFAULT_ROOT, event });
    if (!result.ok) {
      for (const err of result.errors) console.error(`ERROR: ${err}`);
      process.exitCode = 1;
    } else {
      console.log(
        `PR governance passed (branch=${result.branch.branch}, ep=${result.refs.epIds.join(',') || 'none'}, issues=${result.refs.githubNumbers.join(',') || 'none'}).`,
      );
    }
  })().catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}

module.exports = {
  BRANCH_RE,
  validateBranchName,
  stripHtmlComments,
  extractIssueRefs,
  validatePrGovernance,
};
