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

# Copy the requirements file into the container

COPY docker_entry.sh /docker_entry.sh
# Expose the port the app runs on
EXPOSE 8000

# RUN chmod +x docker_entry.sh
# Run Gunicorn
CMD ["/docker_entry.sh"]
