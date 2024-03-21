from elasticsearch import Elasticsearch
from dotenv import load_dotenv
import os

load_dotenv()

def get_client():
    client = Elasticsearch(
        'https://74e0bf38c97b49b4bbcbe7ad6631d212.us-central1.gcp.cloud.es.io',
        basic_auth=(os.getenv("ELASTIC_USER"), os.getenv("ELASTIC_PASSWORD")),
    )
    return client

