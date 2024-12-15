import os
import subprocess

# Set environment variables
os.environ['DJANGO_ALLOWED_HOSTS'] = 'localhost 127.0.0.1'
os.environ['DATABASE_URL'] = 'mysql://demo:12345678@192.168.1.5:3306/MYSQL_DATABASE'
os.environ['MINIO_STORAGE_URL'] = 'http://192.168.1.10:9000/blog'
os.environ['MINIO_STORAGE_ACCESS_KEY'] = 'Z2UEZevaUAlmeX3t0W2K'
os.environ['MINIO_STORAGE_SECRET_KEY'] = 'nMkyHsuoFXm2Vn8r41S91rv5WK66NUH0JXe1P9Jg'

# Frontend environment variables
os.environ['BACKEND_ADDR'] = 'http://192.168.1.5:8000'
os.environ['NEXT_PUBLIC_BACKEND_ADDR'] = 'http://192.168.1.5:8000'
os.environ['STORAGE_ADDR'] = '192.168.1.10'
os.environ['NEXT_PUBLIC_STORAGE_ADDR'] = os.environ['STORAGE_ADDR']

# Function to run a shell command and handle errors
def run_command(command, error_message):
    try:
        subprocess.check_call(command, shell=True)
    except subprocess.CalledProcessError:
        print(f"{error_message} failed")
        exit(1)

# Navigate to backend directory, build the Docker image, and handle errors
os.chdir('backend')
print("Building Django Docker image...")
run_command("docker build -t my-django-app:latest .", "Django build")

# Navigate to frontend directory, build the Docker image, and handle errors
os.chdir('../frontend')
print("Building Next.js Docker image...")
run_command("npm run build", "Next.js build failed")
run_command("docker build -t my-nextjs-app:latest .", "Next.js build")

# Create a build directory if it doesn't exist
os.makedirs('../build', exist_ok=True)

# Save Docker images to tar files
print("Saving Django Docker image to tar file...")
run_command("docker save my-django-app:latest -o ../build/my-django-app.tar.gz", "Failed to save Django image")

print("Saving Next.js Docker image to tar file...")
run_command("docker save my-nextjs-app:latest -o ../build/my-nextjs-app.tar.gz", "Failed to save Next.js image")

# Securely copy Docker images to Unraid server
print("Copying Django image to Unraid...")
run_command("scp ../build/my-django-app.tar.gz unraid:/mnt/user/appdata/my-django-app.tar.gz", "Failed to copy Django image")

print("Copying Next.js image to Unraid...")
run_command("scp ../build/my-nextjs-app.tar.gz unraid:/mnt/user/appdata/my-nextjs-app.tar.gz", "Failed to copy Next.js image")

# SSH into Unraid and run deployment script
print("Running deployment on Unraid...")
run_command("ssh unraid 'bash /mnt/user/appdata/deploy.sh'", "Deployment script")

print("Build and deployment completed successfully!")
