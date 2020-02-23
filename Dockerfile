FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

CMD [ "node", "bin.js" ]
