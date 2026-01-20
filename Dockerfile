FROM node:20-alpine 
 
WORKDIR /app
 
RUN apk add --no-cache \
    mysql-client gcc musl-dev
 
COPY package.json /app/package.json 
 
RUN npm install 
 
CMD ["npm", "run", "build"]

COPY ./dist /app/
 
EXPOSE 3000

CMD ["npm", "run", "serve"]
