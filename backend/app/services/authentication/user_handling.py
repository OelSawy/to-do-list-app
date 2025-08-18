import os
import jwt
import time
import random
import requests
import uuid
from models.user import User
from models.otp import OTP
from schemas.user import UserCreate, UserCreateResponse, UserLogin, UserLoginResponse, UserPasswordReset, UserPasswordResetResponse, UserLogout, UserLogoutResponse, UserValidateOTP, UserValidateOTPResponse, UserChangePassword, UserChangePasswordResponse
from dotenv import load_dotenv
from fastapi import Response, Request
from models.black_list_token import BlacklistToken

load_dotenv()

jwt_secret = os.environ.get("JWT_SECRET")
jwt_algorithm = os.environ.get("JWT_ALGORITHM")
brevo_api_key = os.getenv("BREVO_API_KEY")
brevo_url = os.getenv("BREVO_URL")

def create_user(user_data: UserCreate) -> UserCreateResponse:
    if User.objects(email=user_data.email).first():
        raise ValueError("Email already registered.")
    
    user = User(
        firstName=user_data.firstName,
        lastName=user_data.lastName,
        email=user_data.email
    )
    user.set_password(user_data.password)
    user.save()
    
    return UserCreateResponse(
        id=str(user.id),
        firstName=user.firstName,
        lastName=user.lastName,
        email=user.email
    )

def sign_jwt(id: str, first_name: str, email: str) -> str:
    jti = str(uuid.uuid4())
    payload = {
        "id": id,
        "firstName": first_name,
        "email": email,
        "exp": int(time.time()) + 86400,
        "jti": jti
    }
    token = jwt.encode(payload, jwt_secret, algorithm=jwt_algorithm)
    return token

def login_user(user_data: UserLogin, response: Response) -> UserLoginResponse:
    user = User.objects(email=user_data.email).first()
    if not user:
        raise ValueError("Email doesn't exist.")
    if not user.check_password(user_data.password):
        raise ValueError("Invalid password.")

    token=sign_jwt(str(user.id), user.firstName, user.email)
    
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=86400,
        secure=False,
        samesite="Lax"
    )

    return UserLoginResponse(
        id=str(user.id),
        firstName=user.firstName,
        lastName=user.lastName,
        email=user.email,
        token=token
    )


def logout(request: Request) -> UserLogoutResponse:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("No token found in cookies")

    try:
        decoded = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
        jti = decoded.get("jti")
        if not jti:
            raise ValueError("Invalid token payload")

        BlacklistToken(jti=jti).save()

        return UserLogoutResponse(
            data="User logged out successfully.",
            status="success"
        )

    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

def send_password_reset_email(user_data: UserPasswordReset) -> UserPasswordResetResponse:
    user = User.objects(email=user_data.email).first()
    if not user:
        raise ValueError("Email doesn't exist.")
    otp = str(random.randint(100000, 999999))
    temp = OTP(code=otp)
    temp.save()
    user.otp = temp
    user.save()

    headers = {
        "accept": "application/json",
        "api-key": brevo_api_key,
        "content-type": "application/json"
    }

    payload = {
        "to": [{"email": user.email}],
        "templateId": 11,
        "params": {
            "firstName": user.firstName,
            "otp": otp
        }
    }

    response = requests.post(brevo_url, json=payload, headers=headers)

    if response.status_code == 201:
        return UserPasswordResetResponse(
            data="Password reset email sent successfully.",
            status="success"
        )
    else:
        raise ValueError(response.text)

def validate_otp(user_data: UserValidateOTP) -> UserValidateOTPResponse:
    user = User.objects(email=user_data.email).first()
    if not user:
        raise ValueError("Email doesn't exist.")
    if not user.validateOTP(user_data.otp):
        raise ValueError("Invalid OTP.")
    else: 
        return UserValidateOTPResponse(
            data="OTP validated successfully.",
            status="success"
        )

def change_password(user_data: UserChangePassword) -> UserChangePasswordResponse:
    user = User.objects(email=user_data.email).first()
    if not user:
        raise ValueError("Email doesn't exist.")
    if user_data.new_password != user_data.confirm_password:
        raise ValueError("Passwords do not match.")

    user.set_password(user_data.new_password)
    user.save()

    return UserChangePasswordResponse(
        data="Password changed successfully.",
        status="success"
    )