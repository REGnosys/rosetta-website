FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i
COPY . .

RUN npm run build:prod
RUN npm install pm2 -g

EXPOSE 5000
CMD ["pm2-runtime", "ecosystem.config.js", "--env production"]
