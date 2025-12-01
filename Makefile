.PHONY: install backend frontend start clean clean-py clean-node

### -----------------------------
###  VARIABLES
### -----------------------------
BACKEND_DIR=backend
FRONTEND_DIR=frontend


### -----------------------------
###  RUN BOTH (backend + frontend)
### -----------------------------
start:
	make -j2 backend frontend



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
	cd $(BACKEND_DIR) && uv run uvicorn src.main:app --reload

frontend:
	cd $(FRONTEND_DIR) && ng serve



### -----------------------------
###  CLEAN COMMANDS (optional)
### -----------------------------
clean-py:
	cd $(BACKEND_DIR) && find . -type d -name "__pycache__" -exec rm -r {} +

clean-node:
	cd $(FRONTEND_DIR) && rm -rf node_modules

clean: clean-py clean-node
