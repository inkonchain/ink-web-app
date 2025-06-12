.PHONY: help release dev build start lint lint-fix format format-check test fix-all install clean health-test

help: ## Show this help message
	@echo "\033[1mAvailable commands:\033[0m"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[0;36m%-15s\033[0m %s\n", $$1, $$2}'

release: ## Interactive release command with enhanced developer experience
	@echo "\033[1m🚀 Creating Release\033[0m"
	@echo ""
	@echo "Current branch: \033[1;34m$$(git branch --show-current)\033[0m"
	@if [ "$$(git branch --show-current)" != "main" ]; then \
		echo "\033[1;33m⚠️  Warning: you're not on the main branch. Make sure this is really what you want to do.\033[0m"; \
	fi
	@echo "Current commit: \033[1;33m$$(git rev-parse --short=8 HEAD)\033[0m ($$(git log -1 --pretty=format:'%s'))"
	@TAG=$$(date +%Y-%m-%d-$$(git rev-parse --short=8 HEAD)); \
	echo "Tag to create: \033[1;32m$$TAG\033[0m"; \
	echo ""; \
	if git rev-parse --verify "$$TAG" >/dev/null 2>&1; then \
		echo "\033[1;31m❌ Error: Tag $$TAG already exists!\033[0m"; \
		echo ""; \
		echo "Existing tags:"; \
		git tag -l --sort=-version:refname | head -5; \
		echo ""; \
		echo "To see all tags: \033[1mgit tag -l --sort=-version:refname\033[0m"; \
		echo "To delete a tag: \033[1mgit tag -d $$TAG && git push origin :refs/tags/$$TAG\033[0m"; \
		exit 1; \
	fi; \
	read -p "Type 'yes' to create and push this release tag: " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		git tag $$TAG; \
		git push origin $$TAG; \
		echo ""; \
		echo "\033[1;32m✅ Release tag $$TAG created and pushed successfully!\033[0m"; \
		echo ""; \
		echo "\033[1m📋 Check internal documentation for next steps.\033[0m"; \
	else \
		echo ""; \
		echo "\033[1;31m❌ Cancelled creating release tag\033[0m"; \
	fi

# Development commands
dev: ## Start development server with turbo
	pnpm run dev

dev-https: ## Start development server with HTTPS
	pnpm run dev:https

build: ## Build the application for production
	pnpm run build

start: ## Start production server
	pnpm run start

# Code quality commands
lint: ## Run ESLint
	pnpm run lint

lint-fix: ## Run ESLint with auto-fix
	pnpm run lint:fix

format: ## Format code with Prettier
	pnpm run format

format-check: ## Check code formatting
	pnpm run format:check

test: ## Run Playwright tests
	pnpm run test

fix-all: ## Run lint:fix and format
	pnpm run fix:all

# Package management
install: ## Install dependencies
	pnpm install

clean: ## Clean node_modules and lockfile
	rm -rf node_modules pnpm-lock.yaml

# Health check testing
health-test: ## Test health endpoint (requires dev server running)
	@echo "\033[1mTesting basic health check...\033[0m"
	@curl -s http://localhost:3000/api/health | jq . || curl -s http://localhost:3000/api/health
	@echo ""
	@echo "\033[1mTesting deep health check...\033[0m"
	@curl -s http://localhost:3000/api/health?deep=true | jq . || curl -s http://localhost:3000/api/health?deep=true