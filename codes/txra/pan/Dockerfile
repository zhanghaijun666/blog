FROM centos-systemd:7.0

WORKDIR /opt/cloudserver
ENV container docker

RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;

RUN curl http://192.168.10.6/repository/cloud/releases/test-avicdigital/Server-4.0/cloudserver-4.0-1.x86_64.rpm -o /opt/cloudserver-4.0.rpm --progress
RUN yum install -y /opt/temp/cloudserver.rpm
RUN rm -rf /opt/temp

RUN yum install -y openssl
RUN yum install -y initscripts

ENV LANG en_US.utf8
ENV TZ Asia/Shanghai
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone

EXPOSE 443
VOLUME [ "/sys/fs/cgroup" ]
CMD ["/usr/sbin/init"]