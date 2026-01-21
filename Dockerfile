# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL
RUN apk add --no-cache openssl openssl-dev

# Install dependencies
COPY package*.json tsconfig.json ./

RUN npm install

# Copy source
COPY . .

# Build TypeScript → JavaScript
RUN npm run build
# output assumed in /app/dist


# ---------- Production stage ----------
FROM node:20-alpine

WORKDIR /app

# Install OpenSSL (required for Prisma)
RUN apk add --no-cache openssl openssl-dev

# Install only production dependencies
COPY package*.json ./

RUN npm install --only=production

# Copy compiled JS from builder
COPY --from=builder /app/dist ./dist

# Regenerate Prisma client after OpenSSL installation
RUN npx prisma generate --schema=./dist/src/prisma/schema.prisma

EXPOSE 3000

CMD ["npm", "run", "serve"]

