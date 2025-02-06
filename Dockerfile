# Build
FROM node:20 AS base

WORKDIR /app

RUN npm i -g pnpm@9.12.1

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Run
FROM node:20-alpine3.19 AS release

WORKDIR /app

RUN npm i -g pnpm@9.12.1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=base --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=base --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=base --chown=nextjs:nodejs /app/.next ./.next
COPY --from=base --chown=nextjs:nodejs /app/public ./public

USER nextjs

CMD ["pnpm", "start"]
