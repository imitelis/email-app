from elasticsearch import Elasticsearch
from dotenv import load_dotenv
import os
from models import User

load_dotenv()

def get_client():
    client = Elasticsearch(
        'https://74e0bf38c97b49b4bbcbe7ad6631d212.us-central1.gcp.cloud.es.io',
        basic_auth=(os.getenv("ELASTIC_USER"), os.getenv("ELASTIC_PASSWORD")),
    )
    return client

def format_emails(res, db_user):
    emails = []
    for hit in res["hits"]["hits"]:
        email = hit["_source"]
        recipient_uuid = email['recipient_uuid']
        db_recipient = User.query.get(recipient_uuid)
        formatted_email = {
            'uuid': email['email_uuid'],
            'sender': {
                'uuid': email['sender_uuid'],
                'full_name': db_user.full_name,
                'email': db_user.email
            },
            'recipient': {
                'uuid': email['recipient_uuid'],
                'full_name': db_recipient.full_name,
                'email': db_recipient.email
            },
            'subject': email['email_subject'],
            'body': email['email_body'],
            'sent_date': email['sent_date'],
            'read_date': email['read_date'],
            'recipient_folder': email['folder']
        }
        emails.append(formatted_email)
    return emails

def format_email_to_doc(email):
    doc = {
            "email_uuid": str(email.uuid),
            "sender_uuid": str(email.sender_uuid),
            "recipient_uuid": str(email.recipient_uuid),
            "email_subject": str(email.subject),
            "email_body": str(email.body),
            "sent_date": email.sent_date,
            "read_date": email.read_date    ,
            "folder": str(email.recipient_folder)
    }
    return doc