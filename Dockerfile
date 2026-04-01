# Stage 1: Build Assets
FROM node:20-alpine AS build
ENV NODE_ENV=production

# Compile-time arguments for Vite/Inertia
ARG VITE_REVERB_APP_KEY
ARG VITE_REVERB_HOST
ARG VITE_REVERB_PORT
ARG VITE_REVERB_SCHEME

WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
RUN npm run build

# Stage 2: Runtime (Alpine-based)
FROM php:8.3-fpm-alpine

# Install System Dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    unzip \
    zip \
    git \
    oniguruma-dev \
    icu-dev \
    linux-headers \
    curl \
    postgresql-client

# Install PHP Extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql pgsql mbstring gd zip opcache intl pcntl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy Project Files
COPY . .
# Remove Vite development hot-reload file if it exists
RUN rm -f public/hot
# Copy compiled React assets from Stage 1
COPY --from=build /app/public/build ./public/build

# Install PHP Dependencies
RUN composer install --no-dev --optimize-autoloader

# --- CRITICAL PERMISSIONS & NGINX FIX ---
# Create all necessary directories for Laravel and Alpine Nginx
RUN mkdir -p \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache \
    bootstrap/cache \
    /run/nginx \
    /var/lib/nginx/tmp \
    /var/log/nginx

# Ensure log files exist so Nginx doesn't crash on start
RUN touch /var/log/nginx/access.log /var/log/nginx/error.log

# Set ownership to www-data (the user running PHP and Nginx)
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/lib/nginx \
    /var/log/nginx \
    /run/nginx

# Set directory permissions
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create storage symlink
RUN php artisan storage:link

# Copy Config Files
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Setup Entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]