from mongoengine import Document, StringField, DateTimeField, ListField, ReferenceField, BooleanField

class Task(Document):
    title = StringField(required=True)
    description = StringField(required=True)
    dueDate = DateTimeField(required=True)
    status = BooleanField(default=False)
    label = StringField(default="")
    user = ReferenceField('User', reverse_delete_rule=4)