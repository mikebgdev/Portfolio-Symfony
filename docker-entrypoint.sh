#!/bin/sh
set -e

echo "Ejecutando el script docker-entrypoint.sh..."
echo "LS:"
ls -l

if [ "${1#-}" != "$1" ]; then
	set -- php-fpm "$@"
fi

if [ -f composer.json ]; then
	echo "Ejecutando comandos..."

	composer install --prefer-dist --no-progress --no-interaction
	npm install
	npm run build
	php bin/console cache:clear --env=prod
fi

exec docker-php-entrypoint "$@"
