FROM node:10

RUN npm install -g truffle@3.4.11

COPY ./package.json /usr/src/app/package.json

WORKDIR /usr/src/app

RUN npm install
