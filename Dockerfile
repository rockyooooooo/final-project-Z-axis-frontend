FROM node:14

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

# production
RUN yarn build
CMD ["npx", "serve", "-s", "build"]

# development
# CMD ["yarn", "start"]

# Keep the container running for debugging purposes
# CMD ["tail", "-f", "/dev/null"]
