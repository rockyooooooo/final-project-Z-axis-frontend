FROM node:14-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 80

# TODO: use different Dockerfile for production and development
# production
RUN yarn build
# CMD ["npx", "serve", "-s", "build"]
# development
# CMD ["yarn", "start"]
# Keep the container running for debugging purposes
# CMD ["tail", "-f", "/dev/null"]

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
