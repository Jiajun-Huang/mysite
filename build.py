import argparse
import os
import subprocess
import sys

# Configuration
REMOTE_DOCKER_HOST = os.environ.get("REMOTE_DOCKER_HOST", "ssh://unraid")
REMOTE_APP_DIR = os.environ.get("REMOTE_APP_DIR", "/mnt/user/appdata")

# Django environment variables
os.environ["DJANGO_ALLOWED_HOSTS"] = "localhost 127.0.0.1"
os.environ["DATABASE_URL"] = "mysql://demo:12345678@192.168.1.5:3306/MYSQL_DATABASE"
os.environ["MINIO_STORAGE_URL"] = "http://192.168.1.10:9000/test"
os.environ["MINIO_STORAGE_ACCESS_KEY"] = "Z2UEZevaUAlmeX3t0W2K"
os.environ["MINIO_STORAGE_SECRET_KEY"] = "nMkyHsuoFXm2Vn8r41S91rv5WK66NUH0JXe1P9Jg"

# Next.js environment variables
os.environ["BACKEND_ADDR"] = "http://192.168.1.7"
os.environ["NEXT_PUBLIC_BACKEND_ADDR"] = "http://192.168.1.7"
os.environ["STORAGE_ADDR"] = "192.168.1.10"
os.environ["NEXT_PUBLIC_STORAGE_ADDR"] = os.environ["STORAGE_ADDR"]
os.environ["NEXT_SHARP_PATH"] = os.path.join(
    os.getcwd(), "frontend", "node_modules", "sharp"
)


def run_command(command, error_message):
    """Execute a local shell command and handle errors."""
    try:
        subprocess.check_call(command, shell=True)
    except subprocess.CalledProcessError:
        print(f"{error_message} failed")
        exit(1)


def run_remote_script(script, error_message):
    """Execute a bash script on the remote host via SSH."""
    script = script.replace("\r\n", "\n").replace("\r", "")
    script_bytes = script.encode("utf-8")

    result = subprocess.run(
        ["ssh", "unraid", "bash", "-s"],
        input=script_bytes,
        capture_output=True,
    )

    if result.stdout:
        print(result.stdout.decode("utf-8", errors="replace"))
    if result.stderr:
        print(result.stderr.decode("utf-8", errors="replace"))

    if result.returncode != 0:
        print(f"{error_message} failed")
        exit(1)


def remote_build(image_name, build_context, dockerfile="Dockerfile"):
    """Build Docker image on remote host using SSH context."""
    print(f"Building {image_name} on remote Docker host ({REMOTE_DOCKER_HOST})...")
    build_cmd = f"docker -H {REMOTE_DOCKER_HOST} build -t {image_name}:latest -f {dockerfile} {build_context}"
    run_command(build_cmd, f"Remote build {image_name}")


def deploy_on_unraid():
    """Deploy containers on Unraid server."""
    print("Running deployment on Unraid...")

    script_path = os.path.join(os.path.dirname(__file__), "deploy_unraid.sh")
    with open(script_path, "r", encoding="utf-8") as f:
        script_template = f.read()

    script = script_template.replace("{{REMOTE_APP_DIR}}", REMOTE_APP_DIR)
    run_remote_script(script, "Deployment command")


def build_all():
    """Build both backend and frontend, then deploy."""
    # Build backend
    os.chdir("backend")
    remote_build("my-django-app", ".", "Dockerfile")

    # Build frontend
    os.chdir("../frontend")
    print("Building Next.js app...")
    run_command("npm run build", "Next.js build failed")
    remote_build("my-nextjs-app", ".", "Dockerfile")

    os.chdir("..")
    deploy_on_unraid()
    print("Build and deployment completed successfully!")


def build_backend():
    """Build backend and deploy."""
    os.chdir("backend")
    remote_build("my-django-app", ".", "Dockerfile")
    os.chdir("..")
    deploy_on_unraid()
    print("Backend build and deployment completed successfully!")


def build_frontend():
    """Build frontend and deploy."""
    os.chdir("frontend")
    print("Building Next.js app...")
    run_command("npm run build", "Next.js build failed")
    remote_build("my-nextjs-app", ".", "Dockerfile")
    os.chdir("..")
    deploy_on_unraid()
    print("Frontend build and deployment completed successfully!")


def start_frontend():
    # cd into frontend directory
    os.chdir("frontend")
    # Run the start script
    run_command("npm run dev", "Failed to start frontend")


def start_backend():
    # cd into backend directory
    os.chdir("backend")
    # Run the start script
    run_command("python manage.py runserver", "Failed to start backend")


def main():
    parser = argparse.ArgumentParser(
        description="Build and deploy Django and Next.js apps to Unraid server"
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Build subcommand
    build_parser = subparsers.add_parser("build", help="Build and deploy application")
    build_parser.add_argument(
        "target",
        nargs="?",
        default="all",
        choices=["frontend", "backend", "all"],
        help="What to build (frontend, backend, or all). Defaults to 'all'",
    )
    build_parser.add_argument(
        "--deploy-only",
        action="store_true",
        help="Skip building, only deploy existing images",
    )

    # Start subcommand
    start_parser = subparsers.add_parser("start", help="Start application locally")
    start_parser.add_argument(
        "target",
        choices=["frontend", "backend"],
        help="What to start (frontend or backend)",
    )

    args = parser.parse_args()

    if args.command == "build":
        if args.deploy_only:
            deploy_on_unraid()
        elif args.target == "frontend":
            build_frontend()
        elif args.target == "backend":
            build_backend()
        elif args.target == "all":
            build_all()
    elif args.command == "start":
        if args.target == "frontend":
            start_frontend()
        elif args.target == "backend":
            start_backend()


if __name__ == "__main__":
    main()
