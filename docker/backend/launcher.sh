#!/bin/bash

# DB
while ! nc -z mariadb_database 3306; do
  echo 'Waiting for database startup…'
  sleep 1
done

set -e

# Preparation
if [ ! -f /backend/.env ]; then
  cp /backend/.env.example /backend/.env
fi

cd /backend

composer install

# Run
exec supervisord -c /etc/supervisor/supervisord.conf