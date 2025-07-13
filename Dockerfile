FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

RUN apk add --no-cache openssl ffmpeg

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production
# Copy built files from the correct location

COPY --from=builder /app/dist ./dist

WORKDIR /app

EXPOSE 3000 9229

# Should show main.ts and other build outputs
# CMD [""]  

CMD ["node", "dist/main.js"]
