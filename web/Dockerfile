FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2 -g && \
    npm ci
    
COPY . .

RUN npm run compile-sass && \
    npm run build

EXPOSE 5000
CMD ["pm2-runtime", "ecosystem.config.js", "--env production"]
