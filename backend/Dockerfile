FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache icu-dev mysql-client

# Install PHP extensions
RUN docker-php-ext-install intl pdo_mysql

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy files
COPY . .

# Speed up the container
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Give permissions to Symfony's cache/logs
RUN chown -R www-data:www-data var/