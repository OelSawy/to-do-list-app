from fastapi import APIRouter, HTTPException, Response, Request
from schemas.user import UserCreate, UserCreateResponse, UserLogin, UserLoginResponse, UserLogout, UserLogoutResponse, UserPasswordReset, UserPasswordResetResponse, UserValidateOTP, UserValidateOTPResponse, UserChangePassword, UserChangePasswordResponse
from services.authentication.user_handling import create_user, login_user, logout, send_password_reset_email, validate_otp, change_password

router = APIRouter()

@router.post("", response_model=UserCreateResponse)
def user_register(user_data: UserCreate):
    try:
        return create_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/login", response_model=UserLoginResponse)
def user_login(user_data: UserLogin, response: Response):
    try:
        return login_user(user_data, response)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/logout", response_model=UserLogoutResponse)
def user_logout(request: Request):
    try:
        return logout(request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/reset", response_model=UserPasswordResetResponse)
def user_password_reset(user_data: UserPasswordReset):
    try:
        return send_password_reset_email(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/validate", response_model=UserValidateOTPResponse)
def user_validate_otp(user_data: UserValidateOTP):
    try:
        return validate_otp(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/change", response_model=UserChangePasswordResponse)
def user_change_password(user_data: UserChangePassword):
    try:
        return change_password(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))