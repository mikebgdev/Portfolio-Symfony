#!/usr/bin/env bash
set -euo pipefail
# Use the local resource queue when present; hosted CI uses its runner limits.
launcher=/home/miki/trabajo/scripts/build-limits/build-limit
if [[ -x "$launcher" && ${LOCAL_LIMITED_BUILD:-0} != 1 ]]; then
  exec "$launcher" bash "$0" "$@"
fi
cd "$(git rev-parse --show-toplevel)"
python3 ci/check_repository.py
composer validate --no-check-publish
vendor/bin/php-cs-fixer fix --dry-run --diff
vendor/bin/phpunit
npm run build
