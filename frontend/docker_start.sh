node server.js

docker run -d -p 8000:8000 -v /mnt/user/appdata/webapp:/app --name my-django-container my-django-app