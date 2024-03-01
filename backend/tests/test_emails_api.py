import pytest
from main import app as flask_app
from flask_jwt_extended import create_access_token

@pytest.fixture
def app():
    flask_app.config['TESTING'] = True
    #flask_app.config['ERROR_404_HELP'] = False
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_emails_post(client):
    data= {
        "to": "carlosquintero@gmail.com",
        "subject": "testtesttesttesttestSUB",
        "body": "testtesttesttesttestBOD"}
    
    #TODO: This shouldn't be hard coded but accessing with function gives: OutOfContextError
    access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2MzgxMCwianRpIjoiMWJlNGRlYmEtYmM3ZC00OWI5LTg1YWUtNjRlMzhhMmY5MjRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImNhcmxvc3F1aW50ZXJvMkBnbWFpbC5jb20iLCJuYmYiOjE3MDkyNjM4MTAsImNzcmYiOiIzZDRkM2Q5OS04ZmFiLTQ2MDgtOGE0Ni00NWUwM2ZlZTc5YzYifQ.cdaXvLhvsM-np_YbhqixehXrDj2EnMQ0WjCnjuLeR7A"#create_access_token("carlosquintero2@gmail.com", expires_delta=False)
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    }

    response = client.post('/api/emails/', headers=headers,json=data)
    resturned_mail=str(response.data)

    assert response.status_code == 201
    assert  all(match in resturned_mail  for match in ["uuid", "sender", "recipient","subject","body","sent_date","read_date"] )
    assert "testtesttesttesttestBOD" in resturned_mail and "testtesttesttesttestSUB" in resturned_mail

def test_emails_inbox(client):

    #TODO: This shouldn't be hard coded but accessing with function gives: OutOfContextError
    access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2MzgxMCwianRpIjoiMWJlNGRlYmEtYmM3ZC00OWI5LTg1YWUtNjRlMzhhMmY5MjRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImNhcmxvc3F1aW50ZXJvMkBnbWFpbC5jb20iLCJuYmYiOjE3MDkyNjM4MTAsImNzcmYiOiIzZDRkM2Q5OS04ZmFiLTQ2MDgtOGE0Ni00NWUwM2ZlZTc5YzYifQ.cdaXvLhvsM-np_YbhqixehXrDj2EnMQ0WjCnjuLeR7A"#create_access_token("carlosquintero2@gmail.com", expires_delta=False)
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    }

    response = client.get('/api/emails/inbox', headers=headers)
    resturned_mail=str(response.data)

    assert response.status_code == 200
    assert "carlosquintero2@gmail.com" in resturned_mail and "recipient_folder" in resturned_mail
    #TODO: How to test the contents of the inbox email?

def test_emails_sent(client):

    #TODO: This shouldn't be hard coded but accessing with function gives: OutOfContextError
    access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2MzgxMCwianRpIjoiMWJlNGRlYmEtYmM3ZC00OWI5LTg1YWUtNjRlMzhhMmY5MjRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImNhcmxvc3F1aW50ZXJvMkBnbWFpbC5jb20iLCJuYmYiOjE3MDkyNjM4MTAsImNzcmYiOiIzZDRkM2Q5OS04ZmFiLTQ2MDgtOGE0Ni00NWUwM2ZlZTc5YzYifQ.cdaXvLhvsM-np_YbhqixehXrDj2EnMQ0WjCnjuLeR7A"#create_access_token("carlosquintero2@gmail.com", expires_delta=False)
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    }

    response = client.get('/api/emails/sent', headers=headers)
    resturned_mail=str(response.data)

    assert response.status_code == 200
    assert "carlosquintero2@gmail.com" in resturned_mail and "recipient_folder" in resturned_mail
    #TODO: How to test the contents of the inbox email?

def test_one_get_email_inbox(client):
    primary_key="134b2c50-c72a-4fe2-8c24-311e0bc611a1"

    #TODO: This shouldn't be hard coded but accessing with function gives: OutOfContextError
    access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2MzgxMCwianRpIjoiMWJlNGRlYmEtYmM3ZC00OWI5LTg1YWUtNjRlMzhhMmY5MjRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImNhcmxvc3F1aW50ZXJvMkBnbWFpbC5jb20iLCJuYmYiOjE3MDkyNjM4MTAsImNzcmYiOiIzZDRkM2Q5OS04ZmFiLTQ2MDgtOGE0Ni00NWUwM2ZlZTc5YzYifQ.cdaXvLhvsM-np_YbhqixehXrDj2EnMQ0WjCnjuLeR7A"#create_access_token("carlosquintero2@gmail.com", expires_delta=False)
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    }

    response = client.get('/api/emails/inbox/{}'.format(primary_key), headers=headers)
    resturned_mail=str(response.data)

    assert response.status_code == 200
    assert "carlosquintero2@gmail.com" in resturned_mail and "recipient_folder" in resturned_mail
    #TODO: How to test the contents of the inbox email?

def test_one_get_email_sent(client):
    primary_key="c9fa2d88-5012-49e1-a2dd-085f94f5793d"

    #TODO: This shouldn't be hard coded but accessing with function gives: OutOfContextError
    access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2MzgxMCwianRpIjoiMWJlNGRlYmEtYmM3ZC00OWI5LTg1YWUtNjRlMzhhMmY5MjRhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImNhcmxvc3F1aW50ZXJvMkBnbWFpbC5jb20iLCJuYmYiOjE3MDkyNjM4MTAsImNzcmYiOiIzZDRkM2Q5OS04ZmFiLTQ2MDgtOGE0Ni00NWUwM2ZlZTc5YzYifQ.cdaXvLhvsM-np_YbhqixehXrDj2EnMQ0WjCnjuLeR7A"#create_access_token("carlosquintero2@gmail.com", expires_delta=False)
    headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    }

    response = client.get('/api/emails/sent/{}'.format(primary_key), headers=headers)
    resturned_mail=str(response.data)

    assert response.status_code == 200
    assert "carlosquintero2@gmail.com" in resturned_mail and "recipient_folder" in resturned_mail
    #TODO: How to test the contents of the inbox email?