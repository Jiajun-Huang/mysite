# Use the official Python image (Debian slim variant)
FROM python:3.11.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config 
# Copy only requirements.txt first to leverage Docker layer caching
COPY requirements.txt /app/

# Copy the rest of the application code
COPY . /app

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the port the app will run on
EXPOSE 8000

# Add a healthcheck to ensure the service is up
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost:8000/ || exit 1

# print env variables
RUN printenv

# Start the migration and collect static files
CMD python manage.py migrate && \
    python manage.py collectstatic --noinput && \
    gunicorn --workers=$(( 2 * $(nproc) + 1 )) --bind=0.0.0.0:8000 mysite.wsgi:application
