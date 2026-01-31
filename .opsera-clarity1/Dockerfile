# ════════════════════════════════════════════════════════════════════════════
# DOCKERFILE - Multi-stage build for Vite React SPA
# RULE 74: Use nginx-unprivileged for non-root security
# RULE 73: Use npm install --legacy-peer-deps instead of npm ci
# ════════════════════════════════════════════════════════════════════════════

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (RULE 73: legacy-peer-deps for compatibility)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM nginxinc/nginx-unprivileged:alpine AS production

# Copy custom nginx config
COPY .opsera-clarity1/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# NGINX unprivileged runs on port 8080
EXPOSE 8080

# Health check (RULE 79: SPA health check is /)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
