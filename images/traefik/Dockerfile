FROM arm32v7/golang:latest AS build

ENV TRAEFIK_PATH=/go/src/github.com/containous/traefik \
  TRAEFIK_REPO=https://github.com/containous/traefik.git \
  TRAEFIK_BRANCH=v1.5

RUN mkdir -p ${TRAEFIK_PATH} && \
  git clone ${TRAEFIK_REPO} -b ${TRAEFIK_BRANCH} ${TRAEFIK_PATH} && \
  cd ${TRAEFIK_PATH} && \
  go get github.com/jteeuwen/go-bindata/... && \
  go generate && \
  go build ./cmd/traefik

FROM arm32v7/debian:stretch-slim AS RUN

COPY --from=build /go/src/github.com/containous/traefik/traefik /traefik

RUN apt-get install ca-certificates

EXPOSE 80
ENTRYPOINT ["/traefik"]

LABEL org.label-schema.vendor="Containous" \
      org.label-schema.url="https://traefik.io" \
      org.label-schema.name="Traefik" \
      org.label-schema.description="A modern reverse-proxy" \
      org.label-schema.version="v1.5.0-rc1" \
      org.label-schema.docker.schema-version="1.0"
