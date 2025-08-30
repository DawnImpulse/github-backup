# syntax=docker/dockerfile:1
FROM oven/bun:1.2.19-alpine AS base

# git is required for cloning repos
RUN apk add --no-cache git

WORKDIR /app

COPY package.json .
COPY bun.lock .
COPY ./src ./src

RUN bun install --production --frozen-lockfile

# default volume for backups
VOLUME ["/github-backup"]

# run the docker env runner
CMD ["bun", "src/docker.ts"]
