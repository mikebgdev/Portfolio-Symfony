#!/usr/bin/env bash
set -euo pipefail
# Use the local resource queue when present; hosted CI uses its runner limits.
launcher=/home/miki/trabajo/scripts/build-limits/inspect-limit
if [[ -x "$launcher" && ${LOCAL_LIMITED_BUILD:-0} != 1 ]]; then
  exec "$launcher" bash "$0" "$@"
fi
cd "$(git rev-parse --show-toplevel)"
version=8.30.1
if [[ -n ${GITLEAKS_BIN:-} ]]; then
  scanner=$GITLEAKS_BIN
else
  [[ $(uname -s) == Linux && $(uname -m) == x86_64 ]] || { echo 'Set GITLEAKS_BIN to Gitleaks 8.30.1 on this platform.' >&2; exit 2; }
  stage=$(mktemp -d "${TMPDIR:-/tmp}/repo-secrets.XXXXXX")
  trap 'rm -rf "$stage"' EXIT
  curl --fail --location --silent --show-error --retry 3 "https://github.com/gitleaks/gitleaks/releases/download/v${version}/gitleaks_${version}_linux_x64.tar.gz" -o "$stage/gitleaks.tar.gz"
  echo "551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb  $stage/gitleaks.tar.gz" | sha256sum --check --status
  tar -xzf "$stage/gitleaks.tar.gz" -C "$stage" gitleaks
  scanner=$stage/gitleaks
fi
[[ $("$scanner" version) == "$version" ]] || { echo 'Gitleaks 8.30.1 is required.' >&2; exit 2; }
# git checks committed history; dir also catches local changes before committing.
"$scanner" git . --log-opts=--all --redact=100 --no-banner
"$scanner" dir . --redact=100 --no-banner
