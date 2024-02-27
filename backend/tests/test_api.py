import pytest
from main import app as flask_app

@pytest.fixture
def app():
    flask_app.config['TESTING'] = True
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_hello(client):
    response = client.get('/api/hello')
    assert response.status_code == 200
    assert response.data == b'{\n    "success": "Hello from the Easy Email server"\n}\n'

def test_invite(client):
    data = {"email": "joedoe@gmail.com"}
    response = client.post('/api/invite', json=data)
    assert response.status_code == 200
    assert response.data == b'{\n    "success": "Invitation email was sent to join Easy Email"\n}\n'