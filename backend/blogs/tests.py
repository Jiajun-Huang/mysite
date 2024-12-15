from blogs.models import Blog, Category, Tag
from django.contrib.auth.models import User
from django.test import TestCase


class BlogTestCase(TestCase):
    def setUp(self):
        # Create a superuser
        self.superuser = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='securepassword'
        )

        # Create a regular user
        self.user = User.objects.create_user(
            username='user',
            email='user@example.com',
            password='securepassword'
        )

        # Log in as superuser to get the JWT token
        response = self.client.post(
            "/api/auth/login/",  # Endpoint to generate the JWT token
            {"username": "admin", "password": "securepassword"},
        )
        self.assertEqual(response.status_code, 200)  # Ensure token is successfully created
        self.token = response.json().get("access")  # Extract the access token
        assert self.token is not None  # Verify the token was retrieved successfully

    def test_get_blog(self):
        # Test retrieving blog list
        response = self.client.get("/api/blog/")
        self.assertEqual(response.status_code, 200)

    def test_get_tag(self):
        # Test retrieving tag list
        response = self.client.get("/api/tag/")
        self.assertEqual(response.status_code, 200)

    def test_get_category(self):
        # Test retrieving category list
        response = self.client.get("/api/category/")
        self.assertEqual(response.status_code, 200)
    
    def test_create_tag(self):
        # Ensure the token is available
        assert self.token is not None

        # Test creating a tag
        response = self.client.post(
            "/api/tag/",
            {"name": "Test Tag"},
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
        )
        self.assertEqual(response.status_code, 201)

    def test_create_category(self):
        # Ensure the token is available
        assert self.token is not None

        # Test creating a category
        response = self.client.post(
            "/api/category/",
            {"name": "Test Category"},
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
        )
        self.assertEqual(response.status_code , 201)

    def test_create_blog(self):
        # Ensure the token is available
        assert self.token is not None
        self.client.force_login(self.superuser)
        category = Category.objects.create(name="Test Category")
        tag1 = Tag.objects.create(name="Tag 1")
        tag2 = Tag.objects.create(name="Tag 2")
        
        # create a file to upload
        file = open("test.md", "w")
        file.write("This is a test file")
        file.close()

        # Test creating a blog
        response = self.client.post(
            "/api/blog/",
            {
                "title": "Test Blog",
                "description": "This is a test blog",
                "category": category.id,
                "tags": [tag1.id, tag2.id],
                "uri": "test-blog",
                "files": open("test.md", "rb"),
            },
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
        )
        print(response.json())
        self.assertEqual(response.status_code, 201)  # Verify the blog was created