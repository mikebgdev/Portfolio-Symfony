#!/bin/sh
set -e

if [ "${1#-}" != "$1" ]; then
	set -- php-fpm "$@"
fi

if [ -f composer.json ]; then
	composer install --prefer-dist --no-progress --no-interaction
	npm install
	npm run build
	php bin/console cache:clear --env=prod
fi

exec docker-php-entrypoint "$@"
