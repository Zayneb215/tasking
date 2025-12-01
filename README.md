# Makefile Documentation

This documentation explains how to use the provided **Makefile** to manage both the backend (FastAPI) and frontend (Angular) projects.

---

## 📘 Overview

The Makefile automates common tasks such as installing dependencies, running the development servers, and cleaning build artifacts.

Project structure:

```
project/
 ├── backend/
 ├── frontend/
 └── Makefile
```

---

## 🧱 Makefile Contents

```
BACKEND_DIR=backend
FRONTEND_DIR=frontend

install:
	cd $(BACKEND_DIR) && uv sync
	cd $(FRONTEND_DIR) && npm install

backend:
	cd $(BACKEND_DIR) && uv run uvicorn main:app --reload

frontend:
	cd $(FRONTEND_DIR) && ng serve

start:
	make -j2 backend frontend

clean-py:
	cd $(BACKEND_DIR) && find . -type d -name "__pycache__" -exec rm -r {} +

clean-node:
	cd $(FRONTEND_DIR) && rm -rf node_modules

clean: clean-py clean-node
```

---

## 🚀 Commands

### **Install dependencies**

Install backend and frontend dependencies in one step:

```
make install
```

Runs:

* `uv sync` in `backend/`
* `npm install` in `frontend/`

---

### **Run backend (FastAPI)**

```
make backend
```

Starts FastAPI with auto-reload:

* URL: [http://localhost:8000](http://localhost:8000)

---

### **Run frontend (Angular)**

```
make frontend
```

Starts Angular dev server:

* URL: [http://localhost:4200](http://localhost:4200)

---

### **Run both frontend + backend together**

```
make start
```

Runs both servers in parallel (useful for development).

---

### **Clean Python caches**

```
make clean-py
```

Removes all `__pycache__` folders in backend.

---

### **Clean Node modules**

```
make clean-node
```

Deletes `node_modules` in frontend.

---

### **Clean everything**

```
make clean
```

Runs both cleanup tasks.

---

## 📑 Summary Table

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `make install`    | Install backend & frontend dependencies |
| `make backend`    | Run backend FastAPI server              |
| `make frontend`   | Run Angular dev server                  |
| `make start`      | Run both backend + frontend             |
| `make clean`      | Clean Python caches + node_modules      |
| `make clean-py`   | Clean Python cache folders              |
| `make clean-node` | Remove frontend node_modules            |

---

## Frontend Documentation (Local Project)
- [Frontend](/frontend/docs/doc.md)
- [Backend](/backend/docs/doc.md)