# Stage 1: Build Assets
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM php:8.3-fpm-alpine

# Install System Dependencies (Optimized for Render)
RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    libzip-dev \
    unzip \
    git \
    oniguruma-dev \
    icu-dev \
    linux-headers
    # 1. Install System Dependencies (The "Translators")
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    unzip \
    zip \
    curl \
    git

# # 2. Configure and Install PHP Extensions
# RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
#     && docker-php-ext-install pdo pdo_pgsql pgsql mbstring gd zip opcache intl pcntl

# Install PHP Extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql pgsql mbstring gd zip opcache intl pcntl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy Project Files
COPY . .
COPY --from=build /app/public/build ./public/build

# Install PHP Dependencies
RUN composer install --no-dev --optimize-autoloader

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    postgresql-client


# Copy Docker Config Files
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Copy Entrypoint Script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Environment Setup
EXPOSE 80 8080

# Setup Directory Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
RUN php artisan storage:link

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
