FROM node:20.4.0-alpine3.18

WORKDIR /mnt/datos/ShortenerAPI

COPY package*.json ./

RUN npm install -g typescript
RUN npm install
COPY . .

RUN npm run build
CMD ["npm", "start"]
