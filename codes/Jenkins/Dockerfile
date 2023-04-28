FROM docker.io/library/maven:3.8-openjdk-8-slim AS build
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo$TZ > /etc/timezone
WORKDIR /build
COPY settings.xml /root/.m2/
COPY . /build
RUN mvn -Dmaven.test.skip=true package

FROM docker.io/library/eclipse-temurin:8u332-b09-jre-focal AS release
ENV TZ=Asia/Shanghai
ARG version
EXPOSE 8080
WORKDIR /app
COPY --from=build /build/target/test-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT java -server \
  ${JAVA_OPTS} \
  -jar /app/app.jar \
  --user.timezone=GMT+08 \
  --java.security.egd=file:/dev/./urandom ${JAVA_CLI}
