from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    
class UserCreateResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: EmailStr
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class UserLoginResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: EmailStr
    token: str
    
    class Config:
        from_attributes = True

class UserLogout(BaseModel):
    token: str

class UserLogoutResponse(BaseModel):
    data: str
    status: str

    class Config:
        from_attributes = True

class UserPasswordReset(BaseModel):
    email: EmailStr

class UserPasswordResetResponse(BaseModel):
    data: str
    status: str

    class Config:
        from_attributes = True

class UserValidateOTP(BaseModel):
    email: EmailStr
    otp: str

class UserValidateOTPResponse(BaseModel):
    data: str
    status: str

    class Config:
        from_attributes = True

class UserChangePassword(BaseModel):
    email: EmailStr
    new_password: str
    confirm_password: str

class UserChangePasswordResponse(BaseModel):
    data: str
    status: str

    class Config:
        from_attributes = True