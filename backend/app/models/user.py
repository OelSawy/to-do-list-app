from mongoengine import Document, StringField, ListField, ReferenceField
import bcrypt
from datetime import datetime

class User(Document):
    firstName = StringField(required=True)
    lastName = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    tasks = ListField(ReferenceField('Task'))
    otp = ReferenceField('OTP')

    def set_password(self, raw_password: str):
        bytes = raw_password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(bytes, salt)
        self.password = hashed_password.decode('utf-8')
        
    def check_password(self, raw_password: str) -> bool:
        bytes = raw_password.encode('utf-8')
        return bcrypt.checkpw(bytes, self.password.encode('utf-8'))

    def validateOTP(self, otp: str) -> bool:
        if not self.otp:
            return False
        return self.otp.code == otp and self.otp.expiresIn > datetime.utcnow()