#!/bin/bash

# Deployment script for Unraid
# This script stops and removes old containers, then starts new ones

set -e

APP_DIR="{{REMOTE_APP_DIR}}"

echo "Stopping existing containers..."
docker stop Django-app || true
docker stop Nextjs-app || true

echo "Removing old containers..."
docker rm Django-app || true
docker rm Nextjs-app || true

echo "Starting containers with latest images..."

# Start Django backend
docker run -d \
  --name Django-app \
  --restart unless-stopped \
  --net bridge \
  -p 8000:8000 \
  -e DATABASE_URL='mysql://demo:12345678@192.168.1.5:3306/MYSQL_DATABASE' \
  -e MINIO_STORAGE_URL='http://192.168.1.10:9000/test' \
  -e MINIO_STORAGE_ACCESS_KEY='Z2UEZevaUAlmeX3t0W2K' \
  -e MINIO_STORAGE_SECRET_KEY='nMkyHsuoFXm2Vn8r41S91rv5WK66NUH0JXe1P9Jg' \
  -e DJANGO_ALLOWED_HOSTS='*' \
  -v "${APP_DIR}/django/staticfiles:/app/staticfiles" \
  -v "${APP_DIR}/django/resources:/app/resources" \
  --label net.unraid.docker.icon='https://raw.githubusercontent.com/selfhostedshow/selfhosted_templates/master/Images/django-admin.png' \
  --label net.unraid.docker.webui='http://[IP]:[PORT:8000]' \
  my-django-app:latest

# Start Next.js frontend
docker run -d \
  --name Nextjs-app \
  --restart unless-stopped \
  --net bridge \
  -p 3000:3000 \
  -e NEXT_PUBLIC_BACKEND_ADDR='http://192.168.1.7' \
  -e BACKEND_ADDR='http://192.168.1.7' \
  -e NEXT_PUBLIC_STORAGE_ADDR='192.168.1.10' \
  --label net.unraid.docker.icon='https://raw.githubusercontent.com/selfhostedshow/selfhosted_templates/master/Images/nextcloud-icon.png' \
  --label net.unraid.docker.webui='http://[IP]:[PORT:3000]' \
  my-nextjs-app:latest

echo "Deployment complete!"
