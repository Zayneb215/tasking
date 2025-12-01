### -----------------------------
###  VARIABLES
### -----------------------------
BACKEND_DIR=backend
FRONTEND_DIR=frontend


### -----------------------------
###  INSTALL COMMANDS
### -----------------------------
install:
	cd $(BACKEND_DIR) && uv sync
	cd $(FRONTEND_DIR) && npm install


### -----------------------------
###  RUN COMMANDS
### -----------------------------
backend:
	cd $(BACKEND_DIR) && uv run uvicorn main:app --reload

frontend:
	cd $(FRONTEND_DIR) && ng serve


### -----------------------------
###  RUN BOTH (backend + frontend)
### -----------------------------
start:
	make -j2 backend frontend


### -----------------------------
###  CLEAN COMMANDS (optional)
### -----------------------------
clean-py:
	cd $(BACKEND_DIR) && find . -type d -name "__pycache__" -exec rm -r {} +

clean-node:
	cd $(FRONTEND_DIR) && rm -rf node_modules

clean: clean-py clean-node
