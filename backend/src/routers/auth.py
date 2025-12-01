from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import bcrypt
from src.database import SessionLocal
from src.schemas import UserCreate, UserResponse
from src.models import User

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
