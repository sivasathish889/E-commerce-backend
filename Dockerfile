FROM node:20-alpine 
 
WORKDIR /app
 
RUN apk add --no-cache \
    mysql-client \
    gcc \
    musl-dev \
    openssl \
    openssl-dev \
    python3
 
COPY package.json /app/package.json 
 
RUN npm install 
 
COPY ./dist /app/
 
COPY ./src/prisma /app/src/prisma
 
RUN npx prisma generate --schema=./src/prisma/schema.prisma
 
EXPOSE 3000

CMD ["npm", "run", "serve"]
