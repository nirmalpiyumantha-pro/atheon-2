FROM node:24-alpine

ARG UID=1000
ARG GID=1000
ARG CONTAINER_USER=developer

RUN apk add --no-cache libc6-compat

# Delete default user node
RUN deluser node
# Create new group
RUN addgroup -g $GID $CONTAINER_USER
# Create new user
RUN adduser -D -u $UID -G $CONTAINER_USER $CONTAINER_USER

WORKDIR /app

# Change user
USER $CONTAINER_USER