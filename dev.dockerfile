FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install -g nodemon

CMD [ "nodemon", "app.js" ]