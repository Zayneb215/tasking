from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()
class User(BaseModel):
    name: str
    surname: str
 
@app.get("/")
async def root():
    return {"message": "Hello this my API"}

 
users =[
     User(name="zaineb",surname="bellil"),
 ]
@app.get("/users")
async def getusers():
    return users


@app.post("/users")
async def createusers(user :User):
    print(user.name)
    print(user.surname)
    users.append(user)
    return user
