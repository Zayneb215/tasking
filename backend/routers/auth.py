from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt

from app.database import SessionLocal
from app.schemas import UserCreate, UserResponse
from app.models import User

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

    # check existing email
    existing_email = db.query(User).filter(User.email == payload.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # check username
    existing_username = db.query(User).filter(User.username == payload.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")

    # create new user
    user = User(
        username=payload.username,
        email=payload.email,
        password_hash=bcrypt.hash(payload.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
