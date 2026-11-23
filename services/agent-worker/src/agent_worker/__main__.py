import json
import sys

if sys.argv[1:] == ["--health"]:
    print(json.dumps({"status": "ok", "service": "agent-worker", "readiness": "scaffold"}))
elif sys.argv[1:]:
    print("Usage: python -m agent_worker [--health]", file=sys.stderr)
    sys.exit(2)
