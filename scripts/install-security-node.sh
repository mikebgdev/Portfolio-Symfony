#!/bin/sh
# Nixpacks' historical package snapshot predates the Node security release.
# Run during the image build, before npm; never during application startup.
set -eu
version=22.23.4
[ "$(uname -m)" = x86_64 ] || { echo 'Unsupported Node build architecture' >&2; exit 1; }
target=$(readlink -f "$(command -v node)")
[ "$(node --version)" != "v$version" ] || exit 0
temporary=$(mktemp -d)
trap 'rm -rf "$temporary"' EXIT HUP INT TERM
archive="node-v$version-linux-x64.tar.xz"
curl --proto '=https' --tlsv1.2 --fail --location --silent --show-error \
    "https://nodejs.org/dist/v$version/$archive" -o "$temporary/$archive"
printf '%s  %s\n' '1805bcd35e6815559bd2eb97db438d3fdb0eb3a5e6a977b7c1badca76337e9ce' "$temporary/$archive" | sha256sum --check --status
tar -xJf "$temporary/$archive" --strip-components=2 -C "$temporary" "node-v$version-linux-x64/bin/node"
install -m 0755 "$temporary/node" "$target"
[ "$(node --version)" = "v$version" ]
