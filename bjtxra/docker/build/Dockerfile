####################################
## docker build -t docker.devops.tr/bedrock/bedrock-build:latest .
## docker push docker.devops.tr/bedrock/bedrock-build:latest
####################################

FROM centos:7

WORKDIR /opt

COPY init.sh .

RUN chmod +x init.sh && sh init.sh

ENV NODE_HOME /usr/local/lib/node-v16.15.1-linux-x64
ENV JAVA_HOME /usr/local/lib/jdk-11.0.12
ENV MAVEN_HOME /usr/local/lib/apache-maven-3.8.6
ENV PATH $JAVA_HOME/bin:$NODE_HOME/bin:$MAVEN_HOME/bin:$PATH
ENV CLASSPATH $JAVA_HOME/jre/lib/ext:$JAVA_HOME/lib/toos.jar

ENV LANG en_US.UTF-8
ENV TZ=Asia/Shanghai
