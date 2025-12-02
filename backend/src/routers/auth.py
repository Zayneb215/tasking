from fastapi import APIRouter, Depends, HTTPException,status
from sqlalchemy.orm import Session
import bcrypt
from src.database import SessionLocal
from src.schemas import UserCreate, UserResponse, LoginRequest, LoginResponse
from src.models import User
from src.security import create_access_token


router = APIRouter(prefix="/auth", tags=["Auth"])

# Dependency to get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register", response_model=UserResponse)
async def register_user(payload: UserCreate, db: Session = Depends(get_db)):

    # Check duplicates...
    
    # Convert password to bytes
    password_bytes = payload.password.encode("utf-8")

    # Hash using bcrypt directly
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())

    user = User(
        username=payload.username,
        email=payload.email,
        password_hash=hashed.decode("utf-8")
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.post("/login", response_model=LoginResponse)
async def login_user(payload: LoginRequest, db: Session = Depends(get_db)):

    # Find user by email
    user = db.query(User).filter(User.email == payload.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )

    # Validate password
    password_bytes = payload.password.encode("utf-8")
    stored_hash_bytes = user.password_hash.encode("utf-8")

    if not bcrypt.checkpw(password_bytes, stored_hash_bytes):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )

    # Create JWT token
    token = create_access_token({
        "sub": str(user.id),
        "username": user.username,
        "email": user.email,
        "id": user.id
    })

    return LoginResponse(
        token=token,
        username=user.username,
        email=user.email
    )
