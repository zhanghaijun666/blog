OS_ARCH=$(uname -m||arch)
OS_RELEASE_GENERIC=''

log() {
  level=$1
  shift
  prefix=$1
  shift
  msg="$@"
  timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  echo "[$timestamp][$level][$prefix]" $msg
  log_file=/var/log/cloudserver-${prefix}.log
  echo "[$timestamp][$level][$prefix]" $msg >> $log_file
}

info() {
  log "INFO" "POSTINSTALL" $@
}
warn() {
  log "WARN" "POSTINSTALL" $@
}
error() {
  log "ERROR" "POSTINSTALL" $@
  exit 100
}


check_os_arch() {
  case $OS_ARCH in
    i*86|x86_64|aarch64|mips64)
      info "CPU架构[$OS_ARCH]"
      ;;
    *)
      error "不支持[$OS_ARCH]类型的操作系统"
      ;;
  esac
}

detect_distro() {
  if [ -r /etc/os-release ]; then
      RELEASE_ID=$(grep '^ID=' /etc/os-release  | cut -f2 -d'=')
      RELEASE_ID_LIKE=$(grep '^ID_LIKE=' /etc/os-release  | cut -f2 -d'=')
  fi
  case $RELEASE_ID in
      ubuntu|debian|linuxmint)
          OS_RELEASE_GENERIC=DEBIAN
          ;;
      fedora|rhel|neokylin)
          OS_RELEASE_GENERIC=REDHAT
          ;;
      opensuse|suse)
          OS_RELEASE_GENERIC=OPENSUSE
          ;;
      *)
          if `echo $RELEASE_ID_LIKE | grep ubuntu >/dev/null` || `echo $RELEASE_ID_LIKE | grep debian >/dev/null`; then
              OS_RELEASE_GENERIC=DEBIAN
          elif `echo $RELEASE_ID_LIKE | grep fedora >/dev/null` || `echo $RELEASE_ID_LIKE | grep rhel >/dev/null`; then
              OS_RELEASE_GENERIC=REDHAT
          elif `echo $RELEASE_ID_LIKE | grep opensuse >/dev/null` || `echo $RELEASE_ID_LIKE | grep suse >/dev/null`; then
              OS_RELEASE_GENERIC=OPENSUSE
          else
              OS_RELEASE_GENERIC=UNKNOWN
          fi
          ;;
  esac
}

check_os_release() {
  if [ -z $OS_RELEASE_GENERIC ];then
    detect_distro
  fi

  case $OS_RELEASE_GENERIC in
    DEBIAN|REDHAT|OPENSUSE)
      info "操作系统发行系列[$OS_RELEASE_GENERIC]"
      ;;
    *)
      error "不支持的操作系统发行版本[$OS_RELEASE_GENERIC]"
      ;;
  esac
}

command_exists() {
  if [ -e /dev/null ];then
    type "$1" > /dev/null 2>&1
  else
    type "$1"
  fi
}

get_arch_postfix() {
  name=$1
  arch_name
  case $OS_ARCH in
    i*86)
      arch_name="${name}"
      ;;
    x86_64)
      arch_name="${name}64"
      ;;
    aarch64)
      arch_name="${name}-aarch64"
      ;;
    mips64)
      arch_name="${name}-mips64"
      ;;
  esac
  echo $arch_name
}

install_runtime() {
  RUNTIME_LIB=/opt/cloudserver/installer/cloudserver-runtime.tar.gz
  if [ -f $RUNTIME_LIB ];then
    info "安装运行时库"
    tar -xzvf $RUNTIME_LIB -C /
  fi
  mkdir -p /opt/cloudserver/{tmp,log}
  grep cloudserver.alot.pw /etc/hosts>/dev/null||echo 127.0.0.1 cloudserver.alot.pw>>/etc/hosts
}

install_service() {
  info "安装服务"
  systemctl daemon-reload > /dev/null 2>&1
  if [ ! -e /opt/cloudserver/app/cloud/conf/config.json ]; then
    cp -avf /opt/cloudserver/app/cloud/conf/config.json.prod /opt/cloudserver/app/cloud/conf/config.json
  fi
  systemctl enable cloudserver-solr cloudserver-mysql cloudserver-redis cloudserver-nginx cloudserver-office cloudserver
  systemctl start cloudserver-solr cloudserver-mysql cloudserver-redis cloudserver-nginx cloudserver-office cloudserver
}

uninstall_service() {
  info "systemd卸载服务"
  systemctl stop cloudserver cloudserver-mysql cloudserver-redis cloudserver-nginx  cloudserver-office cloudserver-solr
  systemctl disable cloudserver  cloudserver-mysql cloudserver-redis cloudserver-nginx  cloudserver-office cloudserver-solr
  systemctl daemon-reload > /dev/null 2>&1
}

stop_process() {
  name=$1
  killall $name -9 2>/dev/null
}

init_mysql() {
    DEFAUTL_PASS=$1
    pushd /opt/cloudserver/mysql
    # creating mysql user if he isn't already there
    if ! getent passwd mysql >/dev/null; then
        # Adding system user: mysql.
        adduser \
          --system \
          --group \
          --no-create-home \
          --home /opt/cloudserver/mysql \
          --shell /usr/sbin/nologin \
          mysql  >/dev/null || \
        adduser \
          --system \
          --user-group \
          --no-create-home \
          --home /opt/cloudserver/mysql \
          --shell /usr/sbin/nologin \
          mysql  >/dev/null
    fi
    if [ ! -e ./data/mysql/db.frm ]; then
      mkdir -p data
      chown -R mysql:mysql data
      ./scripts/mysql_install_db --defaults-file=../etc/mysql/my.cnf --user root
      ./bin/mysqld_safe  --defaults-file=../etc/mysql/my.cnf &

      i=0
      while [[ $i -lt 40 ]]
      do
        sleep 3
        if echo exit|./bin/mysql -u root --password= 2>/dev/null; then
          break
        fi
        echo 等待mysql启动
        ps -ef|grep -v grep|grep /opt/cloudserver/mysql/bin/mysqld 2>/dev/null >/dev/null || (echo 重启mysql ; ./bin/mysqld_safe  --defaults-file=../etc/mysql/my.cnf &)
        i=$(( $i + 1 ))
      done

      ./bin/mysql -sfu root --password= << EOF
UPDATE mysql.user SET Password=PASSWORD('$DEFAUTL_PASS') WHERE User='root';
--DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1', '$(hostname)');
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY '$DEFAUTL_PASS' with GRANT OPTION;
DROP DATABASE IF EXISTS test;
FLUSH PRIVILEGES;
SET GLOBAL max_connections = 500;
show master status;
EOF
      ./bin/mysqladmin -u root -p$DEFAUTL_PASS shutdown
    fi
    popd
}


install_check_process() {
  info "停止产品相关进程"
}

install_command() {
  info "安装工具快捷方式"
  ln -sf /opt/cloudserver/bin/cloudserver-startall /usr/bin/cloudserver-startall
  ln -sf /opt/cloudserver/bin/cloudserver-stopall /usr/bin/cloudserver-stopall
  ln -sf /opt/cloudserver/bin/cloudserver-envs /usr/bin/cloudserver-envs
}
init_redis() {
    info "初始化redis"
    sysctl vm.overcommit_memory=1||echo sysctl vm.overcommit_memory=1
    mkdir -p /opt/cloudserver/redis/{log,data,run}
}
init_nginx() {
    info "初始化nginx"
    mkdir -p /opt/cloudserver/openresty/nginx/logs
    mkdir -p /opt/cloudserver/openresty/nginx/conf/os
    getent group nobody || echo "user  nobody nogroup;" > /opt/cloudserver/openresty/nginx/conf/os/nogroup.conf
    chown -R nobody /opt/cloudserver/openresty/nginx/*temp||echo no temp
    type openssl 2>/dev/null >/dev/null && openssl dhparam -out /opt/cloudserver/etc/nginx/dhparams.pem 2048
    type openssl 2>/dev/null >/dev/null || cp -avf /opt/cloudserver/etc/nginx/dhparams.pem.opt /opt/cloudserver/etc/nginx/dhparams.pem
}
init_solr() {
    if [ ! -e /opt/cloudserver/app/solr/server/solr ]; then
        cp -avf /opt/cloudserver/app/solr/server/solr.template  /opt/cloudserver/app/solr/server/solr > /dev/null
    fi
}
init_office() {
    # creating lool user if he isn't already there
    if ! getent passwd lool >/dev/null; then
    adduser \
      --system \
      --group \
      --no-create-home \
      --home /opt/lool \
      --shell /usr/sbin/nologin \
      lool  >/dev/null
    fi
    if [  -e /opt/libreoffice/program/fc-cache ]; then
      /opt/libreoffice/program/fc-cache  -v -s
    else
      fc-cache  -v -s
    fi
    grep FT_Get_Var_Design_Coordinates $(ldd /opt/libreoffice/program/libcairo.so.2 |grep libfreetype|awk '{print $3}') >/dev/null || ln -s ../libs/libfreetype.so.6 /opt/libreoffice/program/

    type ssh-keygen 2>/dev/null >/dev/null && ln -sf loolwsd-generate-proof-key.opt /usr/bin/loolwsd-generate-proof-key
    type ssh-keygen 2>/dev/null >/dev/null || (cp -avf /etc/loolwsd/proof_key.opt /etc/loolwsd/proof_key && chown lool:lool /etc/loolwsd/proof_key)
    /usr/bin/prepare-lool.sh
}

upgrade_actions() {
init_office
if [ ! -e /opt/cloudserver/app/cloud/conf/config.json ]; then
    cp -avf /opt/cloudserver/app/cloud/conf/config.json.prod /opt/cloudserver/app/cloud/conf/config.json
fi
chown -R nobody /opt/cloudserver/openresty/nginx/*temp||echo no temp
systemctl daemon-reload
systemctl start cloudserver-mysql cloudserver-redis cloudserver-nginx cloudserver-office
systemctl restart cloudserver
}
