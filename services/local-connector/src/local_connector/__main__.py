import json
import sys

if sys.argv[1:] == ["--health"]:
    print(json.dumps({"status": "ok", "service": "local-connector", "readiness": "scaffold"}))
elif sys.argv[1:]:
    print("Usage: python -m local_connector [--health]", file=sys.stderr)
    sys.exit(2)
