FROM arm32v7/node:8-slim as build
ADD . /app
WORKDIR /app
RUN yarn install && yarn run build

FROM arm32v7/nginx:mainline AS run
RUN sed -i '/http {/a charset UTF-8;\nserver_tokens off;' /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
