FROM node:21-alpine

WORKDIR /usr/src/plans_microservice

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
