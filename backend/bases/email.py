from flask_restx import fields
from config.api import api


EmailUserBase = api.model(
    "EmailUserBase",
    {
        "uuid": fields.String(description="User UUID"),
        "full_name": fields.String(
            description="User Full name", min_length=8, max_length=128
        ),
        "email": fields.String(description="User Email", min_length=8, max_length=128),
    },
)

EmailBase = api.model(
    "EmailBase",
    {
        "uuid": fields.String(description="Email UUID"),
        "sender": fields.Nested(EmailUserBase, description="Sender User"),
        "recipient": fields.Nested(EmailUserBase, description="Recipient User"),
        "subject": fields.String(description="Email subject", max_length=128),
        "body": fields.String(description="Email body", max_length=1028),
        "sent_date": fields.DateTime(description="Email sent date"),
        "read_date": fields.DateTime(description="Email read date"),
        # "sender_delete": fields.Boolean,
        # "recipient_delete": fields.Boolean,
        "recipient_folder": fields.Integer(
            description="Email recipient folder", min_value=0, max_value=4
        ),
    },
)

EmailInputBase = api.model(
    "EmailInputBase",
    {
        "to": fields.String(
            description="Recipient email", min_length=8, max_length=128
        ),
        "subject": fields.String(
            description="Email subject", min_length=8, max_length=128
        ),
        "body": fields.String(description="Email body", min_length=8, max_length=1028),
    },
)

EmailFolderBase = api.model(
    "EmailUserBase",
    {
        "recipient_folder": fields.Integer(
            description="Email recipient folder", min_value=0, max_value=4
        ),
    },
)
