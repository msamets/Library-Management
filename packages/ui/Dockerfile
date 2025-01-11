FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_API_BASE_URL=http://localhost:3000
ENV NODE_ENV=development

RUN npm run build

EXPOSE 3001

CMD [ "npm", "start" ]