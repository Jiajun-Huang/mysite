import argparse
import os
import subprocess
import sys

# Set environment variables
os.environ['DJANGO_ALLOWED_HOSTS'] = 'localhost 127.0.0.1'
os.environ['DATABASE_URL'] = 'mysql://demo:12345678@192.168.1.5:3306/MYSQL_DATABASE'
os.environ['MINIO_STORAGE_URL'] = 'http://192.168.1.10:9000/blog'
os.environ['MINIO_STORAGE_ACCESS_KEY'] = 'Z2UEZevaUAlmeX3t0W2K'
os.environ['MINIO_STORAGE_SECRET_KEY'] = 'nMkyHsuoFXm2Vn8r41S91rv5WK66NUH0JXe1P9Jg'

# Frontend environment variables
os.environ['BACKEND_ADDR'] = 'http://192.168.1.5:8000'
os.environ['NEXT_PUBLIC_BACKEND_ADDR'] = 'https://jiajunhuang.cc'
os.environ['STORAGE_ADDR'] = '192.168.1.10'
os.environ['NEXT_PUBLIC_STORAGE_ADDR'] = os.environ['STORAGE_ADDR']
os.environ['NEXT_SHARP_PATH'] = os.path.join(os.getcwd(), 'frontend', "node_modules", "sharp")

# Function to run a shell command and handle errors
def run_command(command, error_message):
    try:
        subprocess.check_call(command, shell=True)
    except subprocess.CalledProcessError:
        print(f"{error_message} failed")
        exit(1)

def all():
    
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
    run_command('ssh unraid "cd /mnt/user/appdata && bash deploy.sh"', "Deployment script")

    print("Build and deployment completed successfully!")


def backend():
    os.chdir('backend')
    print("Building Django Docker image...")
    run_command("docker build -t my-django-app:latest .", "Django build")
    os.chdir('..')
    os.makedirs('build', exist_ok=True)
    print("Saving Django Docker image to tar file...")
    run_command("docker save my-django-app:latest -o build/my-django-app.tar.gz", "Failed to save Django image")
    print("Copying Django image to Unraid...")
    run_command("scp -C build/my-django-app.tar.gz unraid:/mnt/user/appdata/my-django-app.tar.gz", "Failed to copy Django image")
    print("Running deployment on Unraid...")
    run_command('ssh unraid "cd /mnt/user/appdata && bash deploy.sh"', "Deployment script")
    print("Backend build and deployment completed successfully!")
    

def frontend():
    os.chdir('frontend')
    print("Building Next.js Docker image...")
    run_command("npm run build", "Next.js build failed")
    run_command("docker build -t my-nextjs-app:latest .", "Next.js build")
    os.chdir('..')
    os.makedirs('build', exist_ok=True)
    print("Saving Next.js Docker image to tar file...")
    run_command("docker save my-nextjs-app:latest -o build/my-nextjs-app.tar.gz", "Failed to save Next.js image")
    print("Copying Next.js image to Unraid...")
    run_command("scp -C build/my-nextjs-app.tar.gz unraid:/mnt/user/appdata/my-nextjs-app.tar.gz", "Failed to copy Next.js image")
    print("Running deployment on Unraid...")
    run_command('ssh unraid "cd /mnt/user/appdata && bash deploy.sh"', "Deployment script")
    print("Frontend build and deployment completed successfully!")
    

def start_frontend():
    # cd into frontend directory
    os.chdir('frontend')
    # Run the start script
    run_command("npm run dev", "Failed to start frontend")
    

def start_backend():
    # cd into backend directory
    os.chdir('backend')
    # Run the start script
    run_command("python manage.py runserver", "Failed to start backend")
def main():
    # parser = argparse.ArgumentParser(description='Build and deploy Django and Next.js apps to Unraid server')
    # parser.add_argument('app', choices=['all', 'backend', 'frontend'], help='Choose which app to build and deploy')
    # args = parser.parse_args()
    # if args.app == 'all':
    #     all()
    # elif args.app == 'backend':
    #     backend()
    # elif args.app == 'frontend':
    #     frontend()
    # else:
    #     print("Invalid argument")
    #     exit(1)
        
    # get first argument [build, start]
    app = sys.argv[1] 
    
    # get second argument [frontend, backend]
    action = sys.argv[2]
    
    if app == 'build':
        if action == 'frontend':
            frontend()
        elif action == 'backend':
            backend()
        elif action == 'all':
            frontend()
            backend()
        else:
            print("Invalid argument")
            exit(1)
    elif app == 'start':
        if action == 'frontend':
            start_frontend()
        elif action == 'backend':
            start_backend()
        else:
            print("Invalid argument")
            exit(1)
    else:
        print("Invalid argument")
        exit(1)
if __name__ == '__main__':
    main()