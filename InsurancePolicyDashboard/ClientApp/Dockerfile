FROM node:23-bullseye as build

WORKDIR /app

COPY . .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]