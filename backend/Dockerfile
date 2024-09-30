# Use the official Python image (Debian slim variant)
FROM python:3.11.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements.txt first to leverage Docker layer caching
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app

# Expose the port the app will run on
EXPOSE 8000

# Add a healthcheck to ensure the service is up
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost:8000/ || exit 1

# Start the migration and collect static files
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput


# Calculate the number of workers dynamically and run the app
CMD gunicorn --workers=$(( 2 * $(nproc) + 1 )) --bind=0.0.0.0:8000 mysite.wsgi:application
