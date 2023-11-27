FROM node:lts-bookworm-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM base AS production
RUN npm run build