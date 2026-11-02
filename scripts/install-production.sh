#!/bin/sh
# Keep the Nixpacks install command short while preserving its existing steps.
set -eu
sh scripts/install-security-node.sh
mkdir -p /var/log/nginx /var/cache/nginx && nix-env -iA php82 -f https://github.com/NixOS/nixpkgs/archive/da6dc0e7b26060f2f71ce3ef7088fb56ee44fa36.tar.gz --priority 0 && composer install --ignore-platform-reqs && node scripts/configure-php-fpm-security.cjs && npm ci
