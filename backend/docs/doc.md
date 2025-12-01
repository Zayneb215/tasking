# FastAPI Backend Documentation

This document describes the FastAPI backend implementation, including project structure, database setup, user registration endpoint, CORS configuration, and process flow. A textual architecture diagram is included to illustrate the system.

---

# 📁 Project Structure

```
backend/
 ├── main.py
 ├── database.py
 ├── models.py
 ├── schemas.py
 └── routers/
      └── auth.py
```

Each file has a clear responsibility:

* **main.py** → App entrypoint, CORS setup, router registration, DB initialization.
* **database.py** → SQLAlchemy engine, session management, Base class.
* **models.py** → SQLAlchemy ORM models.
* **schemas.py** → Pydantic validation & response models.
* **routers/auth.py** → All authentication routes (e.g., /register).

---

# 🗄️ Database Setup

The backend uses **SQLAlchemy** with **SQLite** by default. You can swap the connection string in `database.py` to use PostgreSQL or MySQL.

### database.py

```
DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

---

# 👤 User Model

### models.py

```
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
```

This model stores basic user information and the hashed password.

---

# 📦 Request & Response Schemas

### schemas.py

```
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True
```

These schemas validate incoming data and shape outgoing responses.

---

# 🔐 Authentication Router

### routers/auth.py

```
@router.post("/register", response_model=UserResponse)
async def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    # Validation: unique email, unique username
    # Hash password using bcrypt
    # Store new user in database
```

**Flow:**

1. Check if email or username already exists.
2. Hash user password using bcrypt.
3. Insert user into database.
4. Return newly created user (without password).

---

# 🌍 CORS Configuration

CORS is enabled in `main.py` to allow connections from Angular:

```
origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

This ensures the frontend can make API requests without being blocked by the browser.

---

# 🔄 Application Flow (Textual Diagram)

```
+----------------+        HTTP POST /auth/register         +----------------+
|  Angular App   | ------------------------------------>   |   FastAPI API  |
|  (frontend)    |                                         |  (backend)     |
+----------------+                                         +----------------+
        |                                                           |
        | Validate form                                             |
        |                                                           |
        |          JSON Payload                                     |
        | --------------------------------------------------------- |
        | { username, email, password }                             |
        |                                                           |
        |                                       +------------------+|
        |                                       |  Pydantic Model   |
        |                                       | UserCreate        |
        |                                       +------------------+|
        |                                                           |
        |                                       Validate data       |
        |                                                           |
        |                                       Check DB for user   |
        |                                                           |
        |                                       Hash password       |
        |                                                           |
        |                                       Insert user         |
        |                                                           |
        |<--------------------------------------------------------- |
        |             JSON Response (id, username, email)           |
        |                                                           |
+----------------+                                         +----------------+
|   UI updates   |                                         |   Database     |
+----------------+                                         +----------------+
```

---

# ▶️ Running the Backend

Start the FastAPI server:

```
uv run uvicorn main:app --reload
```

Visit API docs:

```
http://127.0.0.1:8000/docs
```

---

# 🧪 Test the Register Endpoint

```
curl -X POST http://localhost:8000/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "john", "email": "john@test.com", "password": "123456"}'
```

Expected result:

```
{
  "id": 1,
  "username": "john",
  "email": "john@test.com"
}
```

---

# 📌 Next Steps

You can extend the backend with:

* JWT Login
* Protected routes
* Token refresh flow
* Alembic migrations
* PostgreSQL support
* User roles & permissions

Let me know if you want any of these additions!
