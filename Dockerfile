# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Serve stage - non-root (RULE 74, 74b)
FROM nginxinc/nginx-unprivileged:alpine
USER 101:101
EXPOSE 8080
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
