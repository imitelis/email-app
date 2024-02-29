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

def test_email_post(client):
    pass
