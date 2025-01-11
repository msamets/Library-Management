FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

ENV DB_HOST="127.0.0.1"
ENV DB_PORT=3306
ENV DB_USERNAME="user"
ENV DB_PASSWORD="root"
ENV DB_DATABASE=library_db
ENV PORT=3000

RUN npm run build

CMD [ "yarn", "dev" ]