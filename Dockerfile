FROM node:alpine

WORKDIR /app

COPY package.json .

RUN apk --no-cache add make

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]