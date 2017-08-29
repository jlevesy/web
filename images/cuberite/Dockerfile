FROM alpine:3.6 as build

ARG CUBERITE_BRANCH=master

RUN apk add --update build-base  git cmake && \
  git clone --recursive https://github.com/cuberite/cuberite.git -b ${CUBERITE_BRANCH} && \
  cd cuberite && \
  mkdir release && \
  cd release && \
  cmake -DCMAKE_BUILD_TYPE=RELEASE .. && \
  make -j `nproc`

# FROM alpine:3.6 as run
# COPY --from=build /cuberite/Server /server

CMD ["cuberite/Server/Cuberite"]
