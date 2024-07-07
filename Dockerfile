FROM node:14

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build
RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build"]

# Keep the container running for debugging purposes
# CMD ["tail", "-f", "/dev/null"]
