import os
from dotenv import load_dotenv
from mongoengine import connect

load_dotenv()

uri = os.getenv("MONGO_URI")

def connect_db():
    try:
        connect(alias='default', host=uri, serverSelectionTimeoutMS=5000)
        print("Successfully connected to MongoDB!")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
