FROM mariadb:10.4

LABEL maintainer "zhanghaijun <zhanghaijun@bjtxra.com>"

ENV TZ=Asia/Shanghai

RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && sed -i s@/security.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list \
    && apt-get update \
    ## 调整中国时区
    ## apt-get install -y tzdata && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    && apt-get install -y tzdata && ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    ## 中文字体
    && apt-get install -y locales && sed -ie 's/# zh_CN.UTF-8 UTF-8/zh_CN.UTF-8 UTF-8/g' /etc/locale.gen \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV LANG=zh_CN.UTF-8 LANGUAGE=zh_CN.UTF-8 LC_ALL=zh_CN.UTF-8
