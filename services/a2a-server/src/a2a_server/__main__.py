import json
import sys

if sys.argv[1:] == ["--health"]:
    print(json.dumps({"status": "ok", "service": "a2a-server", "readiness": "scaffold"}))
elif sys.argv[1:]:
    print("Usage: python -m a2a_server [--health]", file=sys.stderr)
    sys.exit(2)
