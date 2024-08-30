from django.test import TestCase


# Create your tests here.
class BLogTestCase(TestCase):
    
    token = None

    def test_setup(self):
        print('setUp')
        response = self.client.post('/api/auth/registration/', {
            "username": "admin",
            "email": "user@example.com",  
            "password1": "string1234",
            "password2": "string1234"
        })

        self.assertEqual(response.status_code, 201)
        print(response.json())
        
        response = self.client.post('/api/auth/login/', { 'username': 'admin', 'password': 'string1234'})
        self.assertEqual(response.status_code, 200)
        self.token = response.json()['access']
        print("token", self.token)

    def test_get_blog(self):
        response = self.client.get('/api/blog/')
        self.assertEqual(response.status_code, 200)
        print(response.json())

    
    def test_get_tag(self):
        response = self.client.get('/api/tag/')
        self.assertEqual(response.status_code, 200)
        print(response.json())

    def test_get_category(self):
        response = self.client.get('/api/category/')    
        self.assertEqual(response.status_code, 200)
        print(response.json())

        
        
    