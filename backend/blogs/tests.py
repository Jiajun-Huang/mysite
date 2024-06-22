from django.test import TestCase

# Create your tests here.
class BLogTestCase(TestCase):
    
    # test create blog
    def test_category(self):
        response = self.client.post('/api/category/', {'name': 'Test Category 1'})
        id_1 = response.json()['id']
        self.assertEqual(response.status_code, 201)
        response = self.client.post('/api/category/', {'name': 'Test Category 2'})
        id_2 = response.json()['id']
        self.assertEqual(response.status_code, 201)

        # list all categories
        response = self.client.get('/api/category/')
        self.assertEqual(response.status_code, 200)
        print(response.json())
        lenth = len(response.json())
        # delete one category
        response = self.client.delete(f'/api/category/{id_1}/')
        self.assertEqual(response.status_code, 204)
        response = self.client.get('/api/category/')

        self.assertEqual(len(response.json()), lenth - 1)
        # update one category
        response = self.client.put(f'/api/category/{id_2}/', {'name': 'Test Category 3'})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/category/')

        self.assertEqual(response.json()[0]['name'], 'Test Category 3')
        
        response = self.client.get(f'/api/category/')
        self.assertEqual(response.status_code, 200)
        print(response.json())

        # clean up
        response = self.client.delete(f'/api/category/{id_2}/')
        self.assertEqual(response.status_code, 204)

    def test_tag(self):
        response = self.client.post('/api/tag/', {'name': 'Test Tag'})
        self.assertEqual(response.status_code, 201)
        response = self.client.get('/api/tag/')
        self.assertEqual(response.status_code, 200)
        print(response.json())
        lenth = len(response.json())
        response = self.client.delete('/api/tag/1/')
        self.assertEqual(response.status_code, 204)
        response = self.client.get('/api/tag/')
        self.assertEqual(len(response.json()), lenth - 1)
        response = self.client.put('/api/tag/2/', {'name': 'Test Tag 2'})
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/tag/')
        self.assertEqual(response.json()[0]['name'], 'Test Tag 2')
        response = self.client.delete('/api/tag/2/')
        self.assertEqual(response.status_code, 204)
        
        
    
    def test_create_blog(self):
        # create one category
        response = self.client.post('/api/category/', {'name': 'Test Category'})
        self.assertEqual(response.status_code, 201)
        
        
    