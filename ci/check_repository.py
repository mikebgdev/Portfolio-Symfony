#!/usr/bin/env python3
"""Check repository documentation and metadata without executing the app."""
import json
from pathlib import Path
import re
import subprocess
root = Path(__file__).resolve().parents[1]
readme = root / "README.md"
assert readme.is_file() and len(readme.read_text(encoding="utf-8")) > 100, "Missing usable README.md"
assert (root / "docs/LICENSING.md").is_file(), "Missing licensing review"
for name in ("package.json", "composer.json"):
    if (root / name).exists():
        json.loads((root / name).read_text())
files = subprocess.check_output(["git", "ls-files", "-z"], cwd=root).decode().split("\0")
for name in files:
    if not name:
        continue
    assert not re.search(r"(^|/)(id_rsa|id_ed25519|credentials\.json|service-account[^/]*\.json)$", name, re.I), "Private credential filename tracked: " + name
    assert not name.endswith((".jks", ".keystore", ".p12", ".pfx")), "Private signing material tracked: " + name
    base = Path(name).name
    env_template = base.endswith((".example", ".sample", ".dist"))
    reviewed_env = name in {".env", ".env.test"} and (root / "composer.json").exists()
    assert not (base.startswith(".env") and not env_template and not reviewed_env), "Runtime env file tracked: " + name
print("README, licensing review, JSON manifests and credential filenames: OK")
