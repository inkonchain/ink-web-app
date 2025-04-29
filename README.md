# Ink Web App

Ink is a cutting-edge Layer 2 (L2) blockchain built on Optimism's Superchain and released by Kraken. This repository contains the web application that serves as the main interface for users to interact with Ink's ecosystem.

## Getting Started

### Prerequisites

- Node.js 20.x
- PNPM 9.12.1

### Environment Variables

```sh
cp .env.example .env.local
```

Instructions on how to fill in those environment variables coming soon!

### Installation

```sh
pnpm install
```

### Running in development

```sh
pnpm dev
```

## Deployments

To deploy to production:

1. Checkout main branch: `git checkout main && git pull`
2. Create a tag: `date +%Y-%m-%d-$(git rev-parse --short HEAD) | pbcopy && git tag $(pbpaste)`
3. Push the tag: `git push origin $(pbpaste)`
4. Complete the internal deployment process
