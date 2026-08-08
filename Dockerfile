# =========================
# Builder Stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Enable stable pnpm behavior for Docker
ENV NODE_ENV=development

# Install pnpm
RUN npm install -g pnpm

# Force pnpm to behave like npm (important fix)
RUN pnpm config set node-linker hoisted

# Copy dependency files first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm run build


# =========================
# Production Stage
# =========================
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Same linker strategy (important)
RUN pnpm config set node-linker hoisted

# Copy only production artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies ONLY
RUN pnpm install --prod --frozen-lockfile

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]