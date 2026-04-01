#!/bin/sh

# Exit immediately if a command fails
set -e

echo "Starting Deployment Script..."

# 1. Wait for database (optional but helpful)
echo "Checking database connection..."

# Run Migrations
php artisan migrate --force

# Clear and Cache Config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Supervisor (the main process)
echo "Starting Supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf