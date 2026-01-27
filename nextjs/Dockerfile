# Multi-stage build for Next.js application
FROM docker.io/library/node:20-alpine AS builder
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

# Generate Prisma Client
ARG DATABASE_URL="mysql://build:build@localhost:3306/build"
RUN npx prisma generate

# Copy source and build
COPY . .

# Build-time environment variables
ARG NEXT_PUBLIC_KAKAO_MAP_KEY
ENV NEXT_PUBLIC_KAKAO_MAP_KEY=$NEXT_PUBLIC_KAKAO_MAP_KEY
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Verify standalone output exists
RUN test -d .next/standalone || (echo "ERROR: standalone directory not found" && exit 1)

# Production image
FROM docker.io/library/node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache curl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir .next && \
    chown nextjs:nodejs .next

# Copy build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
