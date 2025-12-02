from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database import Base, engine
from src.routers import auth
from src.routers import todolist

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# -------- CORS SETTINGS --------
origins = [
    "http://localhost:4200",   # Angular dev
    "http://127.0.0.1:4200",
    # "https://your-domain.com"  # Add production domain here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],       # Allow all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],       # Allow all headers
)
# --------------------------------

# Register routers
app.include_router(auth.router)
app.include_router(todolist.router)

@app.get("/")
def root():
    return {"message": "FastAPI is running 🚀"}
