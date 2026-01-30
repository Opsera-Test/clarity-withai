# ════════════════════════════════════════════════════════════════════════════
# DOCKERFILE - Multi-stage build for React/Vite SPA
# RULE 74: Use nginx-unprivileged for non-root security
# ════════════════════════════════════════════════════════════════════════════

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# RULE 73: Use npm install --legacy-peer-deps (not npm ci)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginxinc/nginx-unprivileged:alpine

# Copy custom nginx config
COPY .opsera-cwa-2/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 (nginx-unprivileged default)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1
