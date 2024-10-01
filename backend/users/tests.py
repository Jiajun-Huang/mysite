from django.test import TestCase

# Create your tests here.


class AuthTestCase(TestCase):
    def test_register(self):
        response = self.client.post(
            "/api/auth/registration/",
            {
                "username": "admin2",
                "email": "user@example.com",
                "password1": "string1234",
                "password2": "string1234",
            },
        )

        self.assertEqual(response.status_code, 201)

        response = self.client.post(
            "/api/auth/login/", {"username": "admin2", "password": "string1234"}
        )

        self.assertEqual(response.status_code, 200)
