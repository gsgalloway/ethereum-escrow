FROM node:10

RUN npm install -g truffle@3.2.93

COPY ./package.json /usr/src/app/package.json

WORKDIR /usr/src/app

RUN npm install
