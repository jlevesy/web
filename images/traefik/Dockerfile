FROM alpine:latest

ADD https://github.com/containous/traefik/releases/download/v1.5.0/traefik_linux-arm /traefik
RUN apk add --no-cache ca-certificates && \
  chmod +x /traefik

EXPOSE 80 443 8080
ENTRYPOINT ["/traefik"]
