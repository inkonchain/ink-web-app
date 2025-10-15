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

## Production Deployment

To deploy to production:

1. Create the release tag using the interactive release command:

```bash
make release
```

The command will guide you through release creation, showing current branch/commit info and providing step-by-step deployment instructions.

I'm here INKognito

