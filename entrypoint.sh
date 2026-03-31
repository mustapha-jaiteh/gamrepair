#!/bin/sh

# Replace the port in the Nginx config
if [ -n "$PORT" ]; then
    sed -i "s/\${PORT}/$PORT/g" /etc/nginx/http.d/default.conf
fi

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Start Supervisor
echo "Starting Supervisor..."
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
