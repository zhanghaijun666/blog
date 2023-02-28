FROM redis:6.2.7-alpine

LABEL maintainer "zhanghaijun <zhanghaijun@bjtxra.com>"

ENV LANG=en_US.UTF-8 TZ=Asia/Shanghai

## 使用阿里镜像
RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
## 使用科大镜像
#RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories

## 修改时区
RUN apk update \
    && apk add tzdata \
    && echo "${TZ}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && rm /var/cache/apk/*
## 添加中文字体
RUN apk add --update ttf-dejavu fontconfig && rm -rf /var/cache/apk/*