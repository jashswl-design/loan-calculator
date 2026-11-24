# Replace with your EC2-3 (Web-Prod) Private IP when deploying from EC2-2
PROD_HOST ?= 10.0.0.100
PROD_USER ?= ubuntu
PROD_DIR  ?= /var/www/html

.PHONY: test deploy

test:
	@echo "=== Running Automated Tests ==="
	node test.js

deploy:
	@echo "=== Deploying to Production Web Server ($(PROD_HOST)) ==="
	scp -o StrictHostKeyChecking=no index.html style.css calculator.js $(PROD_USER)@$(PROD_HOST):$(PROD_DIR)/
	@echo "=== Deployment Complete ==="