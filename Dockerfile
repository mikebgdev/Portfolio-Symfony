FROM php:8.2-apache

# Instalamos los paquetes necesarios
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    unzip \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Configuramos los módulos de PHP
RUN docker-php-ext-install pdo pdo_mysql

# Habilita mod_rewrite
RUN a2enmod rewrite

# Establecemos la raíz web de Apache en el directorio público del proyecto
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Copiamos nuestra aplicación a la carpeta de trabajo del contenedor
COPY . /var/www/html/

# Establecemos la carpeta de trabajo
WORKDIR /var/www/html/

# Instalar Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

COPY --from=composer/composer:2-bin --link /composer /usr/bin/composer

# Instalar dependencias de Composer
RUN composer install --prefer-dist --no-progress --no-interaction

# Install nodejs npm
RUN npm install
RUN npm run build

# Exponemos el puerto 80 para el tráfico HTTP
EXPOSE 80

# Iniciamos el servidor Apache en primer plano
CMD ["apache2-foreground"]
