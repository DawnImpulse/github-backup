# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# git is required for cloning repos
RUN apk add --no-cache git

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# build
RUN npm install
RUN npm run build && npm prune --production

# final runtime stage
FROM node:20-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

# default volume for backups
VOLUME ["/github-backup"]

# environment variables documentation
ENV BACKUP_DIR=/github-backup

# run the docker env runner
CMD ["node", "dist/docker.js"]
