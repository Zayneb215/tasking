from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.database import SessionLocal
from src.models import ToDoList, User
from src.schemas import TodoCreate, TodoResponse
from src.security import SECRET_KEY, ALGORITHM
import jwt

router = APIRouter(prefix="/todos", tags=["ToDo List"])


# ---------------------------
# DB DEPENDENCY
# ---------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------
# JWT AUTHENTICATION
# ---------------------------
bearer_scheme = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
):
    token = credentials.credentials  # <-- FastAPI extracts the JWT for you

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


# ---------------------------
# CREATE TODO
# ---------------------------
@router.post("/create", response_model=TodoResponse)
async def create_todo(
    payload: TodoCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = ToDoList(
        content=payload.content,
        user_id=user.id
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


# ---------------------------
# LIST OWN TODOS
# ---------------------------
@router.get("/my", response_model=list[TodoResponse])
async def list_my_todos(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todos = db.query(ToDoList).filter(ToDoList.user_id == user.id).all()
    return todos


# ---------------------------
# DELETE TODO
# ---------------------------
@router.delete("/{todo_id}")
async def delete_todo(
    todo_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    todo = db.query(ToDoList).filter(
        ToDoList.id == todo_id,
        ToDoList.user_id == user.id
    ).first()

    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted"}
