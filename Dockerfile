FROM node:14

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
