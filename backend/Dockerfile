# Use the official Python image from Docker Hub (Debian slim variant)
FROM python:3.11.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y gcc default-libmysqlclient-dev pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy the whole project to the working directory
COPY . /app

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt




# Expose the port the app runs on
EXPOSE 8000

# Run the app gunicorn --workers=3 --bind=0.0.0.0:8000 mysite.wsgi:application
CMD ["gunicorn", "--workers=3", "--bind=0.0.0.0:8000 mysite.wsgi:application"]  