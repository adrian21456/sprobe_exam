#!/bin/bash
set -e

# Clear Laravel caches to avoid stale config issues
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Ensure SQLite database file exists if using sqlite
if [ "$DB_CONNECTION" = "sqlite" ]; then
  if [ ! -f "$DB_DATABASE" ]; then
    echo "Creating SQLite database file at $DB_DATABASE"
    mkdir -p "$(dirname "$DB_DATABASE")"
    touch "$DB_DATABASE"
    chmod 777 "$DB_DATABASE"
  fi
fi

# Run migrations and seed database
php artisan migrate:fresh --seed --force

# Start Laravel development server in background
php artisan serve --host=0.0.0.0 --port=8000 &

# Start the queue worker (in foreground to keep container running)
php artisan queue:work