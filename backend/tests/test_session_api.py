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

def test_login_successful(client):
    data = {"email": "carlosquintero@gmail.com", "password": "123456789"}
    response = client.post('/api/login', json=data)
    assert response.status_code == 200
    #TODO:How to test the creation of the access token?

def test_login_wrong_password(client):
    data = {"email": "carlosquintero@gmail.com", "password": "123456789123"}

 
    response = client.post('/api/login', json=data)
    assert response.status_code == 401
    assert response.data == b'{\n    "message": "Wrong credentials"\n}\n'


def test_login_user_not_found(client):
    data = {"email": "notrealnotrealnotrealnotreal", "password": "123456789123"}
    
    response = client.post('/api/login', json=data)
    assert response.status_code == 404
    assert   'User not found' in str(response.data) #TODO: The message said URI was taken as [/api/login] why?

def test_signup_successful(client):
    data = {"email": "signuptestAAA@gmail.com", 
            "password": "123456789",
            "cellphone":"123456789789",
            "full_name":"Carlos Quitana",}
    response = client.post('/api/signup', json=data)
    
    primary_key= str(response.data).split('"uuid": "')[1].split('",')[0]
    client.delete('/api/users/{}'.format(primary_key)) #TODO: Use a test database
    
    assert response.status_code == 201
    #TODO: Prepare a test db
    #TODO: How to test that the email is beign sent?


def test_signup_user_already_exists(client):
    data = {"email": "carlosquintero@gmail.com", 
            "password": "123456789",
            "cellphone":"123456789789",
            "full_name":"Carlos Quitana",}
    
    response = client.post('/api/signup', json=data)
    assert response.status_code == 400
    assert   'User already exists' in str(response.data) 







