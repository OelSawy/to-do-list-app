from mongoengine import Document, StringField, DateTimeField
from datetime import datetime, timedelta

class OTP(Document):
    code = StringField(required=True, unique=True)
    expiresIn = DateTimeField(default=(datetime.utcnow() + timedelta(minutes=15)))
