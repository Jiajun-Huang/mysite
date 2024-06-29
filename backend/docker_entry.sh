#!/bin/sh
set -e
pip install --upgrade pip
pip install -r requirements.txt
python manage.py collectstatic --noinput
gunicorn --workers=3 --bind=0.0.0.0:8000 mysite.wsgi:application
