import pytest
from main import app as flask_app


@pytest.fixture
def app():
    flask_app.config['TESTING'] = True
    #flask_app.config['ERROR_404_HELP'] = False
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_get_user(client):
    data = {"email": "fordeletetest@gmail.com", 
            "password": "123456789",
            "cellphone":"123456789789",
            "full_name":"Carlos Quitana Delete",}
    response = client.post('/api/signup', json=data)
    
    primary_key= str(response.data).split('"uuid": "')[1].split('",')[0]

    response = client.get('/api/users/{}'.format(primary_key))
    returned_user=str(response.data)
    
    client.delete('/api/users/{}'.format(primary_key)) #TODO: Use a test database
    
    assert response.status_code == 200
    assert  primary_key in returned_user
    assert  all(match in returned_user for match in ["email", "cellphone", "full_name"] )
    assert 'password' not in returned_user

def test_get_user_not_found(client):
    
    primary_key='000000-00000-470e-ad22-8d90e6f82373'
    response = client.get('/api/users/{}'.format(primary_key))
    
    
    assert response.status_code == 404
    assert   'User not be found' in str(response.data) #TODO: The message said URI was taken as [/api/login] why?

def test_delete_user(client):
    
    data = {"email": "fordeletetest@gmail.com", 
            "password": "123456789",
            "cellphone":"123456789789",
            "full_name":"Carlos Quitana Delete",}
    response = client.post('/api/signup', json=data)
    
    primary_key= str(response.data).split('"uuid": "')[1].split('",')[0]
    
    response = client.delete('/api/users/{}'.format(primary_key)) #TODO: Use a test database
    
    assert response.status_code == 204

def test_delete_user_not_found(client):
    
    primary_key='delete-00000-470e-ad22-8d90e6f82373'
    response = client.delete('/api/users/{}'.format(primary_key))
    
    
    assert response.status_code == 404
    assert   'User not found' in str(response.data) #TODO: The message said URI was taken as [/api/login] why?



    