#!/bin/sh
set -e

echo "Ejecutando el script docker-entrypoint.sh..."

if [ "${1#-}" != "$1" ]; then
	set -- php-fpm "$@"
fi

if [ -f composer.json ]; then
	echo "Ejecutando comandos..."

	chmod -R 775 public
	chmod -R 775 var/cache/

	composer install --prefer-dist --no-progress --no-interaction
	npm install
	npm run build
	php bin/console cache:clear --env=prod
fi

exec docker-php-entrypoint "$@"
