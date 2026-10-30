FROM node:24-alpine AS base

ARG UID=1000
ARG GID=1000
ARG CONTAINER_USER=appuser

# Delete default user node
RUN deluser node
# Create new group
RUN addgroup -g $GID $CONTAINER_USER
# Create new user
RUN adduser -D -u $UID -G $CONTAINER_USER $CONTAINER_USER

# 1. Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi


# 2. Rebuild the source code only when needed
FROM base AS builder

ENV PUBLIC_BASE_URL=https://atheonworks.com

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cp .env.example .env && \
    chown $CONTAINER_USER:$CONTAINER_USER .env
RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=$CONTAINER_USER:$CONTAINER_USER /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=$CONTAINER_USER:$CONTAINER_USER /app/.next/standalone ./
COPY --from=builder --chown=$CONTAINER_USER:$CONTAINER_USER /app/.next/static ./.next/static


USER $CONTAINER_USER

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]