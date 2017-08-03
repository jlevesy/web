FROM node:8-alpine as build
COPY . /app
WORKDIR /app
RUN yarn install && yarn run build

FROM nginx:mainline-alpine AS run
COPY --from=build /app/dist /usr/share/nginx/html
