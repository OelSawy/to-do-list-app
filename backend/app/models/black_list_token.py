from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class BlacklistToken(Document):
    jti = StringField(required=True, unique=True)
    created_at = DateTimeField(default=datetime.utcnow)
