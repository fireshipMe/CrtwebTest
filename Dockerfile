FROM node:11.5.0-alpine

WORKDIR /app

COPY package.json /app

RUN npm install --quiet

COPY . /app

CMD ["npm", "run", "start"]
