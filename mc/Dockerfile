FROM alpine:3.6 as build

ARG SPIGOT_VERSION=1.12

ENV BUILDTOOLS_REPO=https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar

RUN apk add --update openjdk8 git curl && \
  mkdir -p /build && \
  cd /build && \
  curl -o BuildTools.jar -sL ${BUILDTOOLS_REPO} && \
  java -jar BuildTools.jar -rev ${SPIGOT_VERSION}

FROM alpine:3.6 as run
ARG SPIGOT_VERSION=1.12

RUN apk add --update openjdk8-jre

COPY --from=build /build/spigot-${SPIGOT_VERSION}.jar /minecraft/
COPY config/* minecraft/

ADD https://dev.bukkit.org/projects/multiverse-core/files/latest /minecraft/plugin
ADD https://dev.bukkit.org/projects/multiverse-portals/files/latest /minecraft/plugin

WORKDIR /minecraft

ENTRYPOINT ["java","-jar","spigot-${SPIGOT_VERSION}.jar", "${JAVA_OPTS}"]
