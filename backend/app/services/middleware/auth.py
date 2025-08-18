import os
import jwt
from dotenv import load_dotenv
from models.black_list_token import BlacklistToken

load_dotenv()

jwt_secret = os.getenv("JWT_SECRET")
jwt_algorithm = os.getenv("JWT_ALGORITHM")


def is_token_valid(token: str):
    decoded = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    jti = decoded.get("jti")
    if BlacklistToken.objects(jti=jti).first():
        raise ValueError("Token is blacklisted")
    return decoded
