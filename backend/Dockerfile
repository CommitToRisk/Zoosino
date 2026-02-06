FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    icu-dev \
    mysql-client

RUN docker-php-ext-install \
    intl \
    pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-scripts

RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var

USER www-data

CMD ["php-fpm"]
