FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

# php extensions installer: https://github.com/mlocati/docker-php-extension-installer
COPY --from=mlocati/php-extension-installer:latest --link /usr/bin/install-php-extensions /usr/local/bin/

RUN apk add --no-cache \
		acl \
		fcgi \
		file \
		gettext \
		git \
	;

RUN set -eux; \
    install-php-extensions \
		apcu \
		intl \
		opcache \
		zip \
    ;

RUN apk update && \
    apk add --no-cache jq

RUN apk add libpng-dev libjpeg-turbo-dev freetype-dev
RUN apk update
RUN docker-php-ext-install gd

# Install nodejs npm
RUN apk update && apk add --no-cache \
    nodejs \
    npm

# Instalar Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

COPY --from=composer/composer:2-bin --link /composer /usr/bin/composer

COPY . /var/www/html/


# Instalar dependencias de Composer
RUN composer install --prefer-dist --no-progress --no-interaction

# Install nodejs npm
RUN npm install
RUN npm run build

RUN php bin/console cache:clear --env=prod

CMD ["php-fpm"]
