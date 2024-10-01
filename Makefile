# envrinment variable:
export DJANGO_ALLOWED_HOSTS = localhost 127.0.0.1
export DATABASE_URL = mysql://demo:12345678@192.168.1.5:3306/MYSQL_DATABASE
export MINIO_STORAGE_URL = http://192.168.1.10:9000/blog
export MINIO_STORAGE_ACCESS_KEY = Z2UEZevaUAlmeX3t0W2K
export MINIO_STORAGE_SECRET_KEY = nMkyHsuoFXm2Vn8r41S91rv5WK66NUH0JXe1P9Jg

#  frontend envrinment variable:
export BACKEND_ADDR = http://localhost:8000
export NEXT_PUBLIC_BACKEND_ADDR=http://localhost:8000
export STORAGE_ADDR = 192.168.1.10
export NEXT_PUBLIC_STORAGE_ADDR="$STORAGE_ADDR"

.PHONY: backend
backend:
	cd backend && python manage.py runserver
 
.PHONY: frontend
frontend:
	cd frontend && npm run dev

.PHONY: frontend-build
frontend-build:
	cd frontend && npm run build