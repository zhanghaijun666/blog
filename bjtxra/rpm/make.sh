#!/bin/bash
#!/bin/bash
#version time : 2021/04/09
company=
domain=
#domain=demo.alot.pw
smtp_host=smtp.exmail.qq.com
smtp_user=dev@bjtxra.com
from_user=dev@bjtxra.com
smtp_password='Bedrock123!@#'
admin_email=monitor@alot.pw
version=4.0
subVersion=0

solr_port=8985
app_port=6060
ftp_port=6021

target="pan.bjtxra.com"
#updates failed for some reason
yum-config-manager --disable updates
yum install -y which iproute wget unzip>/dev/null
primaryIP=$((ip addr||ifconfig) |grep -v 255.0.0.0|grep -v 255.255.0.0|grep -v docker| sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p' | head -1)
netdataIP=$primaryIP
ddns_key=

OFFICEVERSION=7-0-0

STATUS=$(dirname $(readlink -nf $0))/.install-status
APP=$(dirname $(readlink -nf $0))/app
set -e # Automatically abort if any simple command fails
if ! test -d $STATUS; then
mkdir $STATUS
fi
if ! test -d $APP; then
mkdir $APP
fi
files=$(dirname $(readlink -nf $0))/files
if ! test -d $files; then
mkdir -p $files
fi
modules=(app mysql zookeeper activemq solr office nginx docker redis misc fail2ban netdata java firewall yumcache postfix haproxy)
for var in ${modules[@]}; do
    declare "install$var=0"
done
for var in app solr; do
    declare "install$var=1"
done
downloadPrefix=
varreached=0

function usage(){
  echo $0 "dev|test|prod [--branch|-b branch] [--domain|-d domain] [--company|-c company] [--downloadurl|--url|-u download-prefix] [--version|-v version] [--sub-version|-sv sub-version] [--target|-t target] [--ddns-key|-k ddns-key] [--silient|-s] [none] [all] [modules]" >&2
  echo modules: >&2
  for var in ${modules[@]}; do
      echo "    $var:    install $var" >&2
      echo "    -$var:   not install $var" >&2
  done
  echo example: >&2
  echo "    $0 dev all" >&2
  echo "    $0 test nginx redis app" >&2
  echo "    $0 prod -netdata -redis -mysql" >&2
  echo "Prefix:" >&2
  echo "   http://repo.devops.tr/repository/cloud/releases" >&2
  echo "    http://repo.devops.tr/repository/cloud/releases" >&2
}
if [ -z $1 ]; then
  usage
  exit 1
fi
favor=$1
shift
if [ $favor = "dev" -o $favor = "test" -o $favor = "prod" ]; then
    echo $favor
elif [[ $favor == dev-* ]] || [[ $favor == test-* ]] || [[ $favor == prod-* ]] || [[ $favor == branches/* ]]; then
    #custimize for some customer
    echo $favor
else
    usage
    exit 1
fi
favorprefix=
if [ ! $favor = "dev" ]; then
    favorprefix="$favor/"
fi
installdocker=0
silient=0
while [ ! -z $1 ]; do
        case $1 in
                --help|-h|help)
                usage
                exit 1
                ;;
                --downloadurl|--url|-u)
                shift || break
                downloadPrefix=$1
                ;;
                --branch|-b)
                shift || break
                BRANCH=$1
                ;;
                --sub-version|-sv)
                shift || break
                subVersion=$1
                ;;
                --version|-v)
                shift || break
                version=$1
                ;;
                --target|-t)
                shift || break
                target=$1
                ;;
                --domain|-d)
                shift || break
                domain=$1
                ;;
                --company|-c)
                shift || break
                company=$1
                ;;
                --ddns-key|-k)
                shift || break
                ddns_key=$1
                ;;
                --silient|-s)
                silient=1
                ;;
                none)
                    for var in ${modules[@]}; do
                        declare "install$var=0"
                    done
                ;;
                all)
                    for var in ${modules[@]}; do
                        if [ ! $var = "docker" ]; then
                            declare "install$var=1"
			fi
                    done
                ;;
                *)
                    name=$1
                    value=1
                    start=${name:0:1}
                    if [ $start = "-" ]; then
                        name=${name:1}
                        value=0
                    fi
                    varfound=0
                    for var in ${modules[@]}; do
                        if [ x$var = x$name ]; then
                            varfound=1
                        fi
                    done
                    if [ $varfound -eq 0 ]; then
                        echo not known $name >&2
                        exit 1
                    fi
                    if [ $varreached -eq 0 -a ! $value -eq 0 ]; then
                        for var in ${modules[@]}; do
                            declare "install$var=0"
                        done
                    fi
                    varreached=1
                    declare "install$name=$value"
                ;;
        esac
        shift || break
done
if [ -z "$company" ]; then
  if [ $silient -eq 1 -a ! -z "$COMPANY_NAME" ]; then
    company=$COMPANY_NAME
  else
    read -p "input company:" company
  fi
fi
if [ -z "$company" ]; then
  usage
  exit 1
fi
if [ -z "$domain" ]; then
  if [ $silient -eq 1 -a ! -z "$domain" ]; then
    domain=$DOMAIN
  else
    read -p "input domain:" domain
  fi
fi
if [ -z "$domain" ]; then
  usage
  exit 1
fi
export company domain
if [ ! $(uname -m) = "x86_64" ]; then
    installdocker=0
    installyumcache=0
fi
echo -n Installing:
for var in ${modules[@]}; do
    varname="install$var"
    if [ ${!varname} -eq 1 ]; then
        echo -n " $var"
    fi
done
echo " "
folder=${favorprefix}Server-$version
if [ ! -z $BRANCH ] ; then
folder=branches/$BRANCH/$folder
downloadPrefix=${downloadPrefix:-"http://repo.devops.tr/repository/cloud/releases"}
elif [[ $favor == branches/* ]] ; then
downloadPrefix=${downloadPrefix:-"http://repo.devops.tr/repository/cloud/releases"}
elif [ -z $downloadPrefix ] ; then
downloadPrefix=${downloadPrefix:-"http://repo.devops.tr/repository/cloud/releases"}
downloadSpeed=`curl --connect-timeout 2 -o /dev/null -s -w "%{speed_download}" $downloadPrefix/$folder/install-centos6.sh||echo 0`

function checkSpeed(){
  host=$1
  prefix=$2
  speed=$3
  if ping -W2 -c1 $host >/dev/null; then
    newSpeed=`curl --connect-timeout 2 -o /dev/null -s -w "%{speed_download}" $prefix/$folder/install-centos6.sh||echo 0`
    if [ ${newSpeed%.*} -gt ${speed%.*} ]; then
        downloadSpeed=$newSpeed
        downloadPrefix=$prefix
    fi
  fi
}

checkSpeed repo.devops.tr http://repo.devops.tr/repository/cloud/releases $downloadSpeed
fi
domain_regex=$domain

centos=7
if [ "$(rpm -q --queryformat '%{VERSION}' centos-release)" = "6" ]; then
    centos=6
fi

#file,header, url1,url2
download() {
    file=$1
    header=$2
    url=$3
    recheck=$4
    filename=$(basename $file)
    echo download $file from $url
    if [ -e $files/$filename ]; then
        if [ "$recheck" = "true" ]; then
            (set -x; curl -o "$files/$filename" -z "$files/$filename" --header "$header" "$url")
        fi
        /bin/cp -avf $files/$filename $file
    else
     shift
     shift
     shift
    
     (wget --no-cookies --no-check-certificate --header "$header" "$downloadPrefix/files/$filename" -O $files/$filename.download || wget --no-cookies --no-check-certificate --header "$header" "$url" -O $files/$filename.download) \
      && /bin/mv $files/$filename.download $files/$filename && /bin/cp -avf $files/$filename $file
    fi
}

#file,header, url1,url2
gitclone() {
    folder=$1
    url=$2
    filename=$(basename $folder).tar.gz
    pushd $(dirname $folder)
    if [ -e $files/$filename ]; then
        tar  xvf $files/$filename && cd $(basename $folder) && git checkout -f
    else
        git clone $url --depth=1 || cd $(basename $folder) && git checkout -f && git pull
    fi
    popd
}
function start(){
  systemctl start $1 || service $1 start
}
function restart(){
  systemctl restart $1 || service $1 restart
}
if [ ! x$container = "xdocker" ]; then
if ! $(cat /proc/1/cgroup|grep docker >/dev/null) ; then
#redirect all log to $STATUS/install.log
exec 3>&1 4>&2 1> >(tee -a $STATUS/install.log >&3) 2> >(tee -a $STATUS/install.log >&4)
fi
fi

mkdir -p $APP/cloud
if [ $installyumcache -eq 1 ]; then
if ! test -f $STATUS/yumcache; then
sed -i "s/keepcache=0/keepcache=1/g" /etc/yum.conf 
if [ -e $files/yum-$(rpm -q --queryformat '%{VERSION}' centos-release).tar.gz ]; then
    pushd /var/cache
    tar xvfz $files/yum-$(rpm -q --queryformat '%{VERSION}' centos-release).tar.gz
    popd
fi
touch $STATUS/yumcache
fi
fi
if ! test -f $STATUS/entropy; then
yum install -y epel-release
yum install -y rng-tools haveged
chkconfig haveged on || systemctl enable haveged || echo enable or failed
chkconfig rngd on || systemctl rngd haveged || echo enable or failed
start rngd || echo started or failed
start haveged || echo started or failed
touch $STATUS/entropy
fi

if [ $installfirewall -eq 1 ]; then
if ! test -f $STATUS/iptables; then
if [ $centos = '6' ]; then
modprobe ip_conntrack_ftp
#iptables -I INPUT 1 -p tcp -m state --state NEW -m tcp --dport 6060 -j ACCEPT
iptables -I INPUT 1 -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
iptables -I INPUT 2 -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
iptables -I INPUT 3 -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT

#Allow FTP connections on port 21 incoming and outgoing
iptables -I INPUT 4  -p tcp -m tcp --dport 21 -m conntrack --ctstate ESTABLISHED,NEW -j ACCEPT -m comment --comment "Allow ftp connections on port 21"
iptables -I OUTPUT 1 -p tcp -m tcp --dport 21 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT -m comment --comment "Allow ftp connections on port 21"
#Allow FTP port 20 for active connections incoming and outgoing
iptables -I INPUT 5  -p tcp -m tcp --dport 20 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT -m comment --comment "Allow ftp connections on port 20"
iptables -I OUTPUT 2 -p tcp -m tcp --dport 20 -m conntrack --ctstate ESTABLISHED -j ACCEPT -m comment --comment "Allow ftp connections on port 20"
#Finally allow FTP passive inbound traffic
iptables -I INPUT 6  -p tcp -m tcp --dport 20100:20499 -j ACCEPT -m comment --comment "Allow passive inbound connections"
iptables -I OUTPUT 3 -p tcp -m tcp --sport 1024: --dport 20100:20499 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT -m comment --comment "Allow passive inbound connections"
iptables -I INPUT 7 -i docker0 -p tcp -m state --state NEW -m tcp --dport 16060 -j ACCEPT

service iptables save
elif [ $centos = '7' ]; then
#yum install -y NetworkManager

#centos 7

/usr/sbin/modprobe ip_nat_ftp || echo not proved
/usr/sbin/modprobe ip_conntrack_ftp || echo not proved
echo ip_nat_ftp > /etc/modules-load.d/iptables-ftp.conf
echo ip_conntrack_ftp >> /etc/modules-load.d/iptables-ftp.conf

yum install -y firewalld fail2ban-firewalld
chkconfig firewalld on
start firewalld && firewall-cmd --list-all >/dev/null && (
firewall-cmd --zone=public --add-service=high-availability
firewall-cmd --zone=public --add-port=22/tcp --permanent
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --zone=public --add-port=21/tcp --permanent
firewall-cmd --zone=public --add-port=20100-20499/udp --permanent
firewall-cmd --zone=public --add-port=20100-20499/tcp --permanent
firewall-cmd --permanent --add-service=ftp
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="172.17.0.0/16" port protocol="tcp" port="16060" accept'
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="172.17.0.0/16" port protocol="tcp" port="3306" accept'
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="172.17.0.0/16" port protocol="tcp" port="2181" accept'
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="172.17.0.0/16" port protocol="tcp" port="2888" accept'
firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="172.17.0.0/16" port protocol="tcp" port="3888" accept'
#rsync
firewall-cmd --zone=public --add-port=873/tcp --permanent
firewall-cmd --zone=public --add-port=873/udp --permanent
#drbd
firewall-cmd --zone=public --add-port=7789/tcp --permanent
firewall-cmd --zone=public --add-port=7789/udp --permanent
#nfs
firewall-cmd --permanent --add-service=nfs
firewall-cmd --permanent --add-service=mountd
firewall-cmd --permanent --add-service=rpc-bind
firewall-cmd --reload
)
fi

touch $STATUS/iptables
fi
fi #$installfirewall

if [ $installmisc -eq 1 ]; then
if ! test -f $STATUS/ntpdate; then
yum install -y ntpdate
ntpdate 0.asia.pool.ntp.org 0.rhel.pool.ntp.org 1.rhel.pool.ntp.org || echo Not able to update time with ntpdate
chkconfig ntpdate on
echo 0.asia.pool.ntp.org >> /etc/ntp/step-tickers
echo 2.asia.pool.ntp.org >> /etc/ntp/step-tickers
echo 3.asia.pool.ntp.org >> /etc/ntp/step-tickers
touch $STATUS/ntpdate
fi

if ! test -f $STATUS/msfonts; then
download msttcorefonts-2.5-1.noarch.rpm "" https://pan.bjtxra.com/releases/files/msttcorefonts-2.5-1.noarch.rpm
rpm -Uvh $files/msttcorefonts-2.5-1.noarch.rpm || rpm -q msttcorefonts
touch $STATUS/msfonts
fi

fi #$installmisc

if [ $installredis -eq 1 ]; then
if ! test -f $STATUS/redis; then
if [ $centos = '6' ]; then
#centos6
#
rpm -Uvh https://mirrors.tuna.tsinghua.edu.cn/epel/6/x86_64/epel-release-6-8.noarch.rpm|| echo installed
#rpm -Uvh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm|| echo installed
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm || echo installed
yum -y --enablerepo=remi,remi-test install redis
elif [ $centos = '7' ]; then
#centos7
#rpm -Uvh https://mirrors.tuna.tsinghua.edu.cn/epel/7/x86_64/e/epel-release-7-9.noarch.rpm|| echo installed
#rpm -Uvh https://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-9.noarch.rpm|| echo installed
#rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm || echo installed
if [ $(uname -m) = "x86_64" ]; then
yum -y install epel-release
fi
yum -y install redis
fi

#install redis
if [ -e /usr/lib/systemd/system/redis.service ]; then
    sed -i "/RuntimeDirectory=redis/a Restart=always" /usr/lib/systemd/system/redis.service
    systemctl daemon-reload
fi
chkconfig --add redis || echo not needed
chkconfig --level 345 redis on
restart redis

touch $STATUS/redis
fi
fi #$installredis

if [ $installmisc -eq 1 ]; then
if ! test -f $STATUS/package1; then
#used in bellow or later
yum install -y wget unzip lsof rsync epel-release net-tools openssh-clients p7zip smartmontools postfix cyrus-sasl-plain openssl sudo python-setuptools
#used in preview files
yum install -y ImageMagick
#chinese fonts
yum install -y wqy-microhei-fonts wqy-zenhei-fonts wqy-zenhei-fonts-common
yum install -y cjkuni-fonts-common bitmap-fangsongti-fonts cjkuni-ukai-fonts cjkuni-uming-fonts

download bin-tools-$(uname -m).tar.gz "" $downloadPrefix/files/bin-tools-$(uname -m).tar.gz
pushd /
tar xvf $files/bin-tools-$(uname -m).tar.gz
popd

(wget -O install-update.sh $downloadPrefix/$folder/install-update.sh && chmod +x install-update.sh) || echo install-update.sh not updated

touch $STATUS/package1
fi

if ! test -f $STATUS/certbot; then
download certbot-auto "" https://dl.eff.org/certbot-auto
cp -avf $files/certbot-auto /usr/bin
#wget https://dl.eff.org/certbot-auto -O certbot-auto
chmod a+x /usr/bin/certbot-auto
echo certbot-auto

touch $STATUS/certbot
fi
if [ $installpostfix -eq 1 ]; then
if ! test -f $STATUS/postfix-relay; then
sed -i "s/inet_protocols = all/inet_protocols = ipv4/g" /etc/postfix/main.cf
cat  >>  /etc/postfix/main.cf <<EOF
relayhost = [$smtp_host]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options =
smtp_use_tls = yes
smtp_tls_CApath = /etc/ssl/certs
sender_canonical_classes = envelope_sender, header_sender
sender_canonical_maps =  regexp:/etc/postfix/sender_canonical_maps
smtp_header_checks = regexp:/etc/postfix/header_checks
EOF
cat  >>  /etc/postfix/sasl_passwd <<EOF
[$smtp_host]:587 $smtp_user:$smtp_password
EOF
chmod 600 /etc/postfix/sasl_passwd
postmap /etc/postfix/sasl_passwd

cat >> /etc/postfix/sender_canonical_maps <<EOF
/.+/    $from_user
EOF
postmap /etc/postfix/sender_canonical_maps

cat >> /etc/postfix/header_checks <<EOF
/From:.*/ REPLACE From: $from_user
EOF

cat >> /etc/aliases <<EOF
root:           $admin_email
EOF

restart postfix
touch $STATUS/postfix-relay
fi
fi #installpostfix

if ! test -f $STATUS/smartmontools; then
restart smartd
chkconfig smartd on || systemctl enable smartd
touch $STATUS/smartmontools
fi

if ! test -f $STATUS/mcelog; then
if [ "$(uname -m)" != "aarch64" ]; then
#linux hardware fault management
yum install -y mcelog
start mcelogd || start mcelog
chkconfig mcelogd on  || systemctl enable mcelog
restart smartd
fi
touch $STATUS/mcelog
fi

if ! test -f $STATUS/selinux; then
yum install -y policycoreutils-python
semanage port -a -t http_port_t -p tcp 16060 || echo installed
semanage port -a -t http_port_t -p tcp 6060 || echo installed
semanage port -a -t http_port_t -p tcp 8443 || echo installed

echo vm.overcommit_memory=1 >>  /etc/sysctl.conf
echo fs.file-max=200000 >>  /etc/sysctl.conf
sysctl vm.overcommit_memory=1
sysctl -w fs.file-max=200000

cat >> /etc/security/limits.conf <<EOF
mysql             soft    nofile           240000
mysql             hard    nofile           320000
*             soft    nofile           240000
*             hard    nofile           320000
EOF

touch $STATUS/selinux
fi
fi # misc

if [ $installmysql -eq 1 ]; then
if ! test -f $STATUS/mysql; then
mysqlservice=mysqld
if [ $centos = '6' ]; then
#install mysql
mysqlservice=mysqld
yum -y install mysql-server
chkconfig --add mysqld || echo not needed
elif [ $centos = '7' ]; then
#centos7
mysqlservice=mariadb
yum -y install mariadb-server
fi
chkconfig $mysqlservice on || systemctl enable $mysqlservice

mysqlip="127.0.0.1"
mysqlserver_id=1
mysqlserver_count=1

mysqlcnf=/etc/my.cnf

for txt in "max_binlog_size=100M" "auto_increment_offset=$mysqlserver_id" "auto_increment_increment=$mysqlserver_count" log-slave-updates "relay-log=mysqld-relay-bin" "binlog-ignore-db=mysql" "binlog-ignore-db=information_schema" "binlog-ignore-db=performance_schema" "#binlog-do-db=clouddb" "read-only=0" "log-bin=mysql-bin" "server-id=$mysqlserver_id"; do
sed -i "/\[mysqld\]/a $txt" $mysqlcnf
done

cat >> /etc/my.cnf.d/bedrock.cnf <<EOF
[client]
default-character-set=utf8mb4
[mysql]
default-character-set=utf8mb4
[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect = 'SET NAMES utf8mb4'
character-set-client-handshake = false
max_connections = 20480
EOF

start $mysqlservice
mysql -sfu root << EOF
UPDATE mysql.user SET Password=PASSWORD('123456') WHERE User='root';
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY '123456' with GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'server1' IDENTIFIED BY '123456' with GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'server2' IDENTIFIED BY '123456' with GRANT OPTION;
GRANT SELECT on mysql.* TO 'netdata'@'localhost';
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
SET GLOBAL max_connections = 5000;
show master status;
EOF

#enable more host
#GRANT ALL PRIVILEGES ON *.* TO 'root'@'host' IDENTIFIED BY '123456' with GRANT OPTION;

#commands to enable slave
#change server id in /etc/my.conf
#change auto_increment_increment and auto_increment_offset in /etc/my.conf
#firewall-cmd --permanent --zone=public --add-rich-rule='rule family="ipv4" source address="192.168.32.0/24" port protocol="tcp" port="3306" accept'
#firewall-cmd --reload
#stop slave;
#show master status;
#find the log file and pos from another server
#change master to master_host='192.168.32.11',master_user='root',master_password='123456',master_log_file='mysql-bin.000004',master_log_pos=76528;
#start slave;
#show slave status;

mkdir -p /etc/systemd/system/mariadb.service.d
cat <<EOF >/etc/systemd/system/mariadb.service.d/limits.conf
[Service]
LimitNOFILE=65000
EOF
systemctl daemon-reload

#/usr/bin/mysql_secure_installation
restart $mysqlservice

cat >> ~/.my.cnf <<EOF
[client]
user=root
password=123456
default-character-set=utf8mb4
EOF
chmod 600 ~/.my.cnf
touch $STATUS/mysql
fi
fi # mysql

if [ $installjava -eq 1 ]; then
if ! test -f $STATUS/jdk; then
#install jdk
export JDK8_VERSION=181
cd $APP
if [ $(uname -m) = "x86_64" ]; then
if  ! test -f $STATUS/jdk-download || ! test -f jdk-8u$JDK8_VERSION-linux-x64.tar.gz ; then 
download jdk-8u$JDK8_VERSION-linux-x64.tar.gz "Cookie: oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u181-b13/96a7b8442fe848ef90c96a2fad6ed6d1/jdk-8u181-linux-x64.tar.gz"
#wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u$JDK8_VERSION-b13/jdk-8u$JDK8_VERSION-linux-x64.tar.gz" -O jdk-8u$JDK8_VERSION-linux-x64.tar.gz
touch $STATUS/jdk-download
fi

cd /opt
tar xvzf $files/jdk-8u$JDK8_VERSION-linux-x64.tar.gz
cd /opt/jdk1.8.0_$JDK8_VERSION/
for tool in java jar javac keytool jrunscript javah javap jstat; do
alternatives --install /usr/bin/$tool $tool /opt/jdk1.8.0_$JDK8_VERSION/bin/$tool 2
alternatives --set $tool /opt/jdk1.8.0_$JDK8_VERSION/bin/$tool
done
#alternatives --config java
else
yum install -y java-1.8.0-openjdk java-1.8.0-openjdk-devel
cd /usr/lib/jvm/java/
fi
java -version
#java ssl security:Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files
#need for sending email on smtp.exmail.qq.com
download jce_policy-8.zip "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip"
#wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip" -O jce_policy-8.zip
unzip -o jce_policy-8.zip
mkdir -p jre/lib/security/backup || echo
mv jre/lib/security/*.jar jre/lib/security/backup/ ||echo
cp -avf UnlimitedJCEPolicyJDK8/*.jar jre/lib/security/
cd $APP


touch $STATUS/jdk
fi
fi #java

if [ $installmisc -eq 1 ]; then
if ! test -f $STATUS/servers; then
#install server
echo 127.0.0.1 server1 >> /etc/hosts
echo 127.0.0.1 server2 >> /etc/hosts
echo 127.0.0.1 $(hostname) >> /etc/hosts
touch $STATUS/servers
fi
fi #misc

cd $APP

if [ $installoffice -eq 1 ]; then
if  ! test -f $STATUS/libreoffice ; then
    #generate zh_CN.UTF-8 and en_US.UTF-8
    localedef --quiet -i en_US -f UTF-8 en_US.UTF-8
    localedef --quiet -i zh_CN -f UTF-8 zh_CN.UTF-8
    yum install -y harfbuzz libXext libXrender libXrandr libSM harfbuzz libcap expat libpng12 libXinerama fontconfig freetype libxcb cpio findutils poco-util poco-net poco-crypto poco-xml poco-foundation poco-json poco-netssl
    download officeonline-$(uname -m)-$OFFICEVERSION.7z "" $downloadPrefix/files/officeonline-$(uname -m)-$OFFICEVERSION.7z
    download msfonts.7z "" $downloadPrefix/files/msfonts.7z
    download officefonts.7z "" $downloadPrefix/files/officefonts.7z
    pushd /
    7za x -y $files/officeonline-$(uname -m)-$OFFICEVERSION.7z
    popd
    pushd /usr/share/fonts
    7za x -y $files/msfonts.7z
    7za x -y $files/officefonts.7z
    if [  -e $APP/libreoffice/program/fc-cache ]; then
      $APP/libreoffice/program/fc-cache  -v -s
    else
      fc-cache  -v -s
    fi
    popd
    if [ $installdocker -eq 0 ]; then
        /usr/bin/prepare-lool.sh
        systemctl daemon-reload
        systemctl enable loolwsd
        systemctl restart loolwsd
    fi
    touch $STATUS/libreoffice
fi
fi

if [ $installapp -eq 1 ]; then
if  ! test -f $STATUS/cloud-download || ! test -f CloudServer-$version.zip ; then 
download CloudServer-$version.zip "" $downloadPrefix/$folder/CloudServer-$version.zip true
#wget $downloadPrefix/CloudServer-$version.zip -O CloudServer-$version.zip
download www-$version.zip "" $downloadPrefix/$folder/www-$version.zip true
#wget $downloadPrefix/www-$version.zip -O www-$version.zip
touch $STATUS/cloud-download
fi

if ! test -f $STATUS/cloud-install; then
mkdir -p $APP/cloud || echo
echo $favor>$APP/cloud/favor.txt
cd $APP/cloud/
unzip -o ../CloudServer-$version.zip 
unzip -o ../www-$version.zip 
if [ ! -e /usr/bin/bro ]; then
cp -avf bin/bro /usr/bin/
fi
if [ -e $files/www-files ]; then
    /bin/cp -avf $files/www-files/* www/
fi
arch=$(uname -m)
libmark=$arch
if [ $arch = x86_64 ]; then
    libmark="x86-64|x86_64|amd64"
fi
mkdir -p lib/$arch
pushd lib/$arch
    for f in ../*.jar ; do
        unzip -l $f|grep \\.so$|grep -E $libmark|awk '{print $4}'|grep -i linux |xargs -r unzip -o -j $f
    done
popd

time timeout 4m ./bin/tuning.sh || echo timeout, please retry $PWD/bin/tuning.sh
cd $APP/cloud/etc/keys
./sign-server2.sh bedrock
touch $STATUS/cloud-install
fi
fi #app

if [ $installnetdata -eq 1 ]; then
if ! test -f $STATUS/sensors-install;  then
yum install -y lm_sensors
yes "" | sensors-detect
touch $STATUS/sensors-install
fi

if ! test -f $STATUS/netdata-install;  then
semanage port -a -t http_port_t -p tcp 19999 || echo installed
pushd $STATUS
yum install -y autoconf automake curl gcc git libmnl-devel libuuid-devel lm_sensors make MySQL-python nc pkgconfig python python-psycopg2 PyYAML zlib-devel
# download it - the directory 'netdata' will be created
gitclone $STATUS/netdata https://github.com/firehol/netdata.git
#git clone https://github.com/firehol/netdata.git --depth=1 || cd netdata && git checkout -f && git pull && cd ..
cd netdata
# run script with root privileges to build, install, start netdata
echo y |./netdata-installer.sh
#ln -s /root/netdata/netdata-updater.sh /etc/cron.daily/netdata-updater.sh

sed -i "/\[global\]/a bind socket to IP = 127.0.0.1" /etc/netdata/netdata.conf
sed -i "/\[global\]/a access log = none" /etc/netdata/netdata.conf

sed -i "/\[registry\]/a registry to announce = https://bedrock:letmein@$netdataIP/netdata" /etc/netdata/netdata.conf
if [ $netdataIP = $primaryIP ]; then
    sed -i "/\[registry\]/a enabled = yes" /etc/netdata/netdata.conf
fi

killall netdata || echo killed
#send meail only on critical issues
sed -i 's/DEFAULT_RECIPIENT_EMAIL="root"/DEFAULT_RECIPIENT_EMAIL="root|critical"/g' /etc/netdata/health_alarm_notify.conf

# disable some alarm for sm-* disks which may used by docker
echo > /etc/netdata/health.d/dm-disk.conf
for num in 0 $(seq 100); do
cat >> /etc/netdata/health.d/dm-disk.conf <<EOF
# disable some alarm for sm-* disks which may used by docker
   alarm: disk_space_usage
      on: disk_space.dm-$num
    calc: \$used * 100 / (\$avail + \$used)
   units: %
   every: 1m
   delay: up 1m down 15m multiplier 1.5 max 1h
    info: current disk space usage
      to: sysadmin
    warn: 0
    crit: 0

   alarm: disk_last_collected_secs
      on: disk.dm-$num
families: *
    calc: \$now - \$last_collected_t
   units: seconds ago
   every: 10s
   delay: down 5m multiplier 1.5 max 1h
    info: number of seconds since the last successful data collection of the block device
      to: sysadmin
    warn: 0
    crit: 0

   alarm: 10min_disk_backlog
      on: disk_backlog.dm-$num
families: *
  lookup: average -10m unaligned
   units: ms
   every: 1m
   green: 2000
     red: 5000
   delay: down 15m multiplier 1.2 max 1h
    info: average of the kernel estimated disk backlog, for the last 10 minutes
      to: sysadmin
    warn: 0
    crit: 0
EOF
done
sed -i "s/(200):(1000)/(2000):(10000)/g" /etc/netdata/health.d/net.conf
sed -i "s/(1000):(2000)/(10000):(20000)/g" /etc/netdata/health.d/net.conf
sed -i "s/1000)?(1000)/10000)?(10000)/g" /etc/netdata/health.d/net.conf
sed -i "s/>= 0.1/>= 5/g" /etc/netdata/health.d/net.conf
sed -i 's/>= 2$/>= 40/g' /etc/netdata/health.d/net.conf
#$avail == -1 for fs like cephfs
sed -i "s/\$avail + \$used/((\$avail != -1) ? (\$avail) : (\$used*99)) + \$used/g" /etc/netdata/health.d/disks.conf
restart netdata


popd
touch $STATUS/netdata-install
fi

fi #netdata

if [ $installnginx -eq 1 ]; then
if ! test -f $STATUS/nginx; then
if [ $centos = '7' ]; then
which lsb_release>/dev/null || yum search "LSB Core module support"|grep "$(uname -m)"|cut -f1 -d:|xargs yum install -y
OPENSSL=openssl-1.0.2l
NGINX=nginx-1.15.4-1
FANCYINDEX=0.4.2
if [ ! -e /root/rpmbuild/RPMS/x86_64/$NGINX.el$centos*.ngx.x86_64.rpm ]; then
yum -y groupinstall 'Development Tools' --skip-broken
yum -y install wget openssl-devel libxml2-devel libxslt-devel gd-devel perl-ExtUtils-Embed GeoIP-devel pcre-devel glibc-n32-devel

#lua
yum -y install lua-devel lua-static
download ngx_devel_kit-v0.3.0.tar.gz "" https://github.com/simplresty/ngx_devel_kit/archive/v0.3.0.tar.gz
download lua-nginx-module-v0.10.13.tar.gz "" https://github.com/openresty/lua-nginx-module/archive/v0.10.13.tar.gz
mkdir -p $APP/lib/ngx_devel_kit-v0.3.0
mkdir -p $APP/lib/lua-nginx-module-v0.10.13
tar -zxf $files/ngx_devel_kit-v0.3.0.tar.gz -C $APP/lib/ngx_devel_kit-v0.3.0 --strip-components=1
tar -zxf $files/lua-nginx-module-v0.10.13.tar.gz -C $APP/lib/lua-nginx-module-v0.10.13 --strip-components=1

#page speed
#download pagespeed-ngx-v1.13.35.2-stable.tar.gz "" https://github.com/apache/incubator-pagespeed-ngx/archive/v1.13.35.2-stable.tar.gz
#download pagespeed-psol-v1.13.35.2-stable.tar.gz "" https://dl.google.com/dl/page-speed/psol/1.13.35.2-x64.tar.gz
#mkdir -p $APP/lib/pagespeed-ngx-v1.13.35.2-stable
#tar -zxf $files/pagespeed-ngx-v1.13.35.2-stable.tar.gz -C $APP/lib/pagespeed-ngx-v1.13.35.2-stable --strip-components=1
#tar -zxf $files/pagespeed-psol-v1.13.35.2-stable.tar.gz -C $APP/lib/pagespeed-ngx-v1.13.35.2-stable
# --add-module=$APP/lib/pagespeed-ngx-v1.13.35.2-stable


mkdir -p $APP/lib
#rpm -ivh http://nginx.org/packages/mainline/centos/$centos/SRPMS/$NGINX.el$centos.ngx.src.rpm
osver=$centos
if [ $centos = 7 ]; then
osver=7_4
fi
download $NGINX.el$centos.ngx.src.rpm "" http://nginx.org/packages/mainline/centos/$centos/SRPMS/$NGINX.el$osver.ngx.src.rpm
rpm -ivh $files/$NGINX.el$centos.ngx.src.rpm
#wget https://github.com/aperezdc/ngx-fancyindex/archive/v$FANCYINDEX.tar.gz -O $APP/lib/v$FANCYINDEX.tar.gz
download ngx-fancyindex-$FANCYINDEX.tar.gz "" https://github.com/aperezdc/ngx-fancyindex/archive/v$FANCYINDEX.tar.gz
tar -zxvf $files/ngx-fancyindex-$FANCYINDEX.tar.gz -C $APP/lib
#download modsecurity-2.9.2.tar.gz "" https://www.modsecurity.org/tarball/2.9.2/modsecurity-2.9.2.tar.gz
#tar -zxvf $files/modsecurity-2.9.2.tar.gz -C $APP/lib
if [ $(uname -m) = "x86_64" ]; then
#wget https://www.openssl.org/source/$OPENSSL.tar.gz -O $APP/lib/$OPENSSL.tar.gz
download $OPENSSL.tar.gz "" https://www.openssl.org/source/$OPENSSL.tar.gz

tar -zxvf $files/$OPENSSL.tar.gz -C $APP/lib
sed -i "s|--with-http_ssl_module|--with-http_ssl_module --with-openssl=$APP/lib/$OPENSSL --with-openssl-opt=shared --add-module=$APP/lib/ngx-fancyindex-$FANCYINDEX --add-module=$APP/lib/ngx_devel_kit-v0.3.0 --add-module=$APP/lib/lua-nginx-module-v0.10.13|g" /root/rpmbuild/SPECS/nginx.spec
else
yum install -y openssl-devel
sed -i "s|--with-http_ssl_module|--with-http_ssl_module --add-module=$APP/lib/ngx-fancyindex-$FANCYINDEX --add-module=$APP/lib/ngx_devel_kit-v0.3.0 --add-module=$APP/lib/lua-nginx-module-v0.10.13|g" /root/rpmbuild/SPECS/nginx.spec
sed -i "s|BuildRequires: redhat-lsb-core||g" /root/rpmbuild/SPECS/nginx.spec
fi
#sed -i "s|--with-http_ssl_module|--with-http_ssl_module --add-module=/root/modsecurity-2.9.2/nginx/modsecurity|g" /root/rpmbuild/SPECS/nginx.spec
#sed -i "s|--with-http_ssl_module|--with-http_ssl_module --add-module=$APP/lib/pagespeed-ngx-v1.13.35.2-stable|g" /root/rpmbuild/SPECS/nginx.spec

rpmbuild -ba /root/rpmbuild/SPECS/nginx.spec
fi
rpm -ivh /root/rpmbuild/RPMS/$(uname -m)/$NGINX.el$centos*.*ngx.$(uname -m).rpm||rpm -q nginx
cd $APP/
#download owasp-modsecurity-crs-3.0.2.tar.gz "" https://github.com/SpiderLabs/owasp-modsecurity-crs/archive/v3.0.2.tar.gz
#tar xvf $files/owasp-modsecurity-crs-3.0.2.tar.gz
#ln -s owasp-modsecurity-crs-3.0.2 owasp-modsecurity-crs
cd $APP/cloud/

#cat > /etc/yum.repos.d/nginx.repo  <<EOF
#[nginx]
#name=nginx repo
#baseurl=http://nginx.org/packages/centos/$(rpm -q --queryformat '%{VERSION}' centos-release)/\$basearch/
#gpgcheck=0
#enabled=1
#EOF
##load balance
#yum install -y nginx || yum install -y nginx
 
else
cd $APP/cloud/
cat > /etc/yum.repos.d/nginx.repo  <<EOF
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$(rpm -q --queryformat '%{VERSION}' centos-release)/\$basearch/
gpgcheck=0
enabled=1
EOF
#load balance
yum install -y nginx || yum install -y nginx
fi
openssl dhparam -out /etc/nginx/dhparams.pem 2048
sed -i "s/# server_tokens off/server_tokens off/g" /etc/nginx/nginx.conf
sed -i "s#\"\$http_x_forwarded_for\"';#\"\$http_x_forwarded_for\" \"\$upstream_addr\" \$request_time';#g" /etc/nginx/nginx.conf
cp -avf etc/nginx.conf /etc/nginx/conf.d/bedrock.conf
cp -avf etc/nginx-filters.conf /etc/nginx/nginx-filters.conf

touch /etc/nginx/passwords
echo "bedrock:$(openssl passwd -crypt 'letmein')" >> /etc/nginx/passwords

mkdir -p /files/releases
restorecon -R /etc/nginx|| echo enforce disabled
chcon -Rt httpd_sys_content_t /files||echo enforce disabled
chcon -Rt httpd_sys_content_t $APP/cloud/clients||echo enforce disabled
setsebool -P httpd_can_network_connect on||echo enforce disabled

chkconfig --add nginx || echo not needed
chkconfig  --level 345 nginx on||systemctl enable nginx
restart nginx
touch $STATUS/nginx
fi
fi #nginx
if [ $installhaproxy -eq 1 ]; then
if ! test -f $STATUS/haproxy; then
#or
yum install -y haproxy
cd $APP/cloud/
grep 16060 /etc/haproxy/haproxy.cfg || cat etc/haproxy.local.txt >> /etc/haproxy/haproxy.cfg
#upgrade to haproxy 1.5.18
#wget http://www.haproxy.org/download/1.5/src/haproxy-1.5.18.tar.gz -O haproxy-1.5.18.tar.gz
#tar xvf haproxy-1.5.18.tar.gz
#cd haproxy-1.5.18
#make TARGET=generic USE_OPENSSL=true
#/bin/cp -avf ./haproxy /usr/sbin/
sed -i "s$APPion http-server-close/\#option http-server-close/g" /etc/haproxy/haproxy.cfg


restart haproxy
chkconfig --add haproxy || echo not needed
chkconfig --level 345 haproxy on

touch $STATUS/haproxy
fi
fi #haproxy

if [ $installzookeeper -eq 1 ]; then
if ! test -f $STATUS/zookeeper; then

#setup zookeeper
ZOO_VERSION=3.4.13
cd $APP
download zookeeper-$ZOO_VERSION.tar.gz "" https://mirrors.tuna.tsinghua.edu.cn/apache/zookeeper/zookeeper-$ZOO_VERSION/zookeeper-$ZOO_VERSION.tar.gz
#wget https://mirrors.tuna.tsinghua.edu.cn/apache/zookeeper/zookeeper-$ZOO_VERSION/zookeeper-$ZOO_VERSION.tar.gz -O zookeeper-$ZOO_VERSION.tar.gz
tar xvf zookeeper-$ZOO_VERSION.tar.gz
ln -sf zookeeper-$ZOO_VERSION zookeeper
cd zookeeper/conf
cp zoo_sample.cfg zoo.cfg
sed -i "s/\/tmp\//\/var\//g" zoo.cfg
cd ../bin
cat > zookeeper << EOF
#!/usr/bin/env bash
# chkconfig: 345 26 25
### BEGIN INIT INFO
# Provides:          zookeeper
# Required-Start:    $local_fs $network
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: zookeeper
# Description:       Zookeeper Start Stop Restart
### END INIT INFO
ZOOPIDFILE=/var/run/zookeeper_server.pid
export ZOOPIDFILE
#delete pid file if created before this server start
if [[ /proc -nt \$ZOOPIDFILE ]]; then
  /bin/rm -rf \$ZOOPIDFILE
fi

. \$(dirname \$(readlink -nf \$0))/zkServer.sh
EOF
#tail -n +2 zkServer.sh  >> zookeeper
chmod +x zookeeper
ln -sf $(pwd)/zookeeper /etc/init.d/zookeeper
chkconfig zookeeper on || systemctl enable zookeeper
restart zookeeper

touch $STATUS/zookeeper
fi
fi #zookeeper

if [ $installsolr -eq 1 ]; then
#install solr
SOLR_VERSION=${SOLR_VERSION:-8.8.2}
cd $APP
yum install -y initscripts
if  ! test -f $STATUS/solr-download || ! test -f solr-$SOLR_VERSION.tgz ; then 
#download from mirror or offical
download solr-$SOLR_VERSION.tgz  "" https://mirrors.tuna.tsinghua.edu.cn/apache/lucene/solr/$SOLR_VERSION/solr-$SOLR_VERSION.tgz || download solr-$SOLR_VERSION.tgz  "" http://archive.apache.org/dist/lucene/solr/$SOLR_VERSION/solr-$SOLR_VERSION.tgz
#wget https://mirrors.tuna.tsinghua.edu.cn/apache/lucene/solr/$SOLR_VERSION/solr-$SOLR_VERSION.tgz -O solr-$SOLR_VERSION.tgz || wget http://archive.apache.org/dist/lucene/solr/$SOLR_VERSION/solr-$SOLR_VERSION.tgz -O solr-$SOLR_VERSION.tgz
#wget $downloadPrefix/solr-$SOLR_VERSION.tgz -O solr-$SOLR_VERSION.tgz

touch $STATUS/solr-download
fi

if ! test -f $STATUS/solr; then
SLAVER=false
MASTER=true
solruser=root

solrdir="$APP/solr"
if [ ! -d "$APP/solr-$SOLR_VERSION" ]; then
  tar -xzvf $files/solr-$SOLR_VERSION.tgz -C $APP  
  pushd $APP
    ln -s solr-$SOLR_VERSION solr
    chmod a+x $solrdir/bin/
  popd
fi
sed -i "s/8983/$solr_port/g" $solrdir/bin/solr
sed -i "s/Dhost=/Djetty.host=/g" $solrdir/bin/solr
sed -i "s/Xss256k/Xss512k/g" $solrdir/bin/solr
cd $APP
sed -i 's/.*SOLR_HEAP=.*/SOLR_HEAP="2g"/' $solrdir/bin/solr.in.sh
sed -i 's/log4j.rootLogger=INFO/log4j.rootLogger=WARN/' $solrdir/server/resources/log4j.properties 2>/dev/null||sed -i 's/Root level="info"/Root level="warn"/' $solrdir/server/resources/log4j2.xml
sed -i 's/8192/32768/' $APP/solr/server/etc/jetty.xml
sed -i '/Killed\ process\ \$SOLR_PID\"/a \$(dirname \$0)/solr start -p $solr_port' $APP/solr/bin/oom_solr.sh

/bin/rm -f $APP/solr/server/solr-webapp/webapp/WEB-INF/lib/bedrock-solr*.jar
/bin/cp -avf $APP/cloud/conf/solr-etc/*.jar $APP/solr/server/solr-webapp/webapp/WEB-INF/lib
/bin/cp -avf $APP/cloud/lib/bedrock-solr*.jar $APP/solr/server/solr-webapp/webapp/WEB-INF/lib
/bin/cp -avf $APP/cloud/lib/hanlp*.jar $APP/solr/server/solr-webapp/webapp/WEB-INF/lib
/bin/cp -avf $APP/cloud/lib/mmseg4j*.jar $APP/solr/server/solr-webapp/webapp/WEB-INF/lib

$solrdir/bin/solr start -force -p $solr_port &&

su - $solruser -c "$APP/solr/bin/solr create -force -c cloudfiles -d $APP/cloud/conf/solr-etc/cloudfiles -shards 1 -replicationFactor 1" &&  cloudfilesDir="/var/solr/data/cloudfiles"

touch $STATUS/solr
fi

if ! test -f $STATUS/solr-suggest; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c cloudsuggest -d $APP/cloud/conf/solr-etc/cloudsuggest -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/cloudsuggest"
touch $STATUS/solr-suggest
fi

if ! test -f $STATUS/solr-comment; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c comments -d $APP/cloud/conf/solr-etc/comments -shards 1 -replicationFactor 1" &&  commentDir="/var/solr/data/comments"
touch $STATUS/solr-comment
fi


if ! test -f $STATUS/solr-messages; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c messages -d $APP/cloud/conf/solr-etc/messages -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/messages"
touch $STATUS/solr-messages
fi

if ! test -f $STATUS/solr-filehisories; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c filehistories -d $APP/cloud/conf/solr-etc/filehistories -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/filehistories"
if [ -d "$solrfilesDir" ]; then
#    /bin/cp -avf cloud/conf/solr-etc/cloudfiles/* $cloudfilesDir/conf
    chown -R  $solruser:$solruser $solrfilesDir
    echo " config solr filehistories ok"
else
    echo " config solrwrong"
fi 
touch $STATUS/solr-filehisories
fi
if ! test -f $STATUS/solr-cloudtimeline; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c cloudtimeline -d $APP/cloud/conf/solr-etc/cloudtimeline -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/cloudtimeline"
touch $STATUS/solr-cloudtimeline
fi
if  [ -e $APP/cloud/conf/solr-etc/cloudlog -a ! -e $STATUS/solr-cloudlog ]; then
#3.3
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c cloudlog -d $APP/cloud/conf/solr-etc/cloudlog -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/cloudlog"
touch $STATUS/solr-cloudlog
fi
if ! test -f $STATUS/solr-userlog; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c userlog -d $APP/cloud/conf/solr-etc/userlog -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/userlog"
touch $STATUS/solr-userlog
fi
if ! test -f $STATUS/solr-managerlog; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c managerlog -d $APP/cloud/conf/solr-etc/managerlog -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/managerlog"
touch $STATUS/solr-managerlog
fi
if ! test -f $STATUS/solr-serverlog; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c serverlog -d $APP/cloud/conf/solr-etc/serverlog -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/serverlog"
touch $STATUS/solr-serverlog
fi
if ! test -f $STATUS/solr-superadminlog; then
cd $APP
su - $solruser -c "$APP/solr/bin/solr create -force -c superadminlog -d $APP/cloud/conf/solr-etc/superadminlog -shards 1 -replicationFactor 1" &&  solrfilesDir="/var/solr/data/superadminlog"
touch $STATUS/solr-superadminlog
fi
fi #solr

if [ $installactivemq -eq 1 ]; then
#install apache-artemis
cd $APP
ARTEMIS_VERSION=2.8.0
ARTEMIS_FILE="apache-artemis-$ARTEMIS_VERSION-bin.tar.gz"
ARTEMIS_FOLDER="apache-artemis-$ARTEMIS_VERSION"
ARTEMIS_HOME="$APP/activemq"
ARTEMIS_USER_HOME="/var/lib/activemq"
if  ! test -f $STATUS/activemq-download || ! test -f $ARTEMIS_FILE ; then 
    download $ARTEMIS_FILE "" https://mirrors.tuna.tsinghua.edu.cn/apache/activemq/activemq-artemis/$ARTEMIS_VERSION/apache-artemis-$ARTEMIS_VERSION-bin.tar.gz || download $ARTEMIS_FILE "" https://archive.apache.org/dist/activemq/activemq-artemis/$ARTEMIS_VERSION/apache-artemis-$ARTEMIS_VERSION-bin.tar.gz
    touch $STATUS/activemq-download
fi
	
if ! test -f $STATUS/activemq; then
tar -xzf $ARTEMIS_FILE
sudo mv $ARTEMIS_FOLDER $ARTEMIS_HOME
sudo mkdir -p "$ARTEMIS_USER_HOME"

#create user if not exists
if [ ! $(getent passwd activemq) ];then
    echo create new user activemq
    sudo useradd activemq --password "activemq" --home $ARTEMIS_USER_HOME
else 
    echo user activemq already exist
fi

sudo chown -R activemq:activemq $ARTEMIS_USER_HOME
su - activemq -c "$ARTEMIS_HOME/bin/artemis create bedrockBroker --allow-anonymous --user root --role admin --password 123456"

#write activemq.service
cat > /usr/lib/systemd/system/activemq.service <<EOF
[Unit]
Description=Apache ActiveMQ Artemis
After=network.target

[Service]
User=activemq
PIDFile=$ARTEMIS_USER_HOME/bedrockBroker/data/artemis.pid
ExecStart=$ARTEMIS_USER_HOME/bedrockBroker/bin/artemis-service start
ExecStop=$ARTEMIS_USER_HOME/bedrockBroker/bin/artemis-service stop
ExecReload=$ARTEMIS_USER_HOME/bedrockBroker/bin/artemis-service restart
Restart=always

[Install]
WantedBy=multi-user.target
EOF

chkconfig activemq on || systemctl enable activemq || echo enable or failed
restart activemq || echo
touch $STATUS/activemq
fi
fi #end install apache-artemis

cd $APP
if [ $installdocker -eq 1 ]; then
if  ! test -f $STATUS/install-docker || ! (which docker>/dev/null 2>/dev/null)  ; then 
download getdocker.sh "" https://get.docker.com/
#if [ $centos = '6' ]; then
chmod +x getdocker.sh
./getdocker.sh --mirror Aliyun
#else
#yum install -y docker
#fi
touch $STATUS/install-docker
fi
start docker
chkconfig docker on || systemctl enable docker
export DOCKER_OFFICEONLINE_VERSION=5.4
startCollabora(){
if test -f $STATUS/officeinstance ; then
    docker start `cat $STATUS/officeinstance`
else
    docker run -t -d -p 0.0.0.0:9980:9980 -e "domain=$domain_regex" --restart always --cap-add MKNOD bedrock/officeonline:$DOCKER_OFFICEONLINE_VERSION
    echo $(docker ps|grep "bedrock/officeonline"|cut -f1 -d\ ) > $STATUS/officeinstance
fi
echo $STATUS/officeinstance

}

if  ! test -f $STATUS/custom-office-code  ; then 
    if test -f $files/officeonline.docker.7z ; then
        cd $files
        7za x -y officeonline.docker.7z
        docker load -i officeonline.docker
    else
        cd $APP/cloud/conf
        docker build -t bedrock/officeonline:$DOCKER_OFFICEONLINE_VERSION officeonline
    fi
    cd -
    semanage port -a -t http_port_t -p tcp 9980 || echo installed
touch $STATUS/custom-office-code
fi

if  ! test -f $STATUS/start-office-code  ; then 
startCollabora
touch $STATUS/start-office-code
fi

if ! test -f $STATUS/save-docker;  then
if ! test -f $files/officeonline.docker.7z;  then
    docker save -o $files/officeonline.docker bedrock/officeonline:$DOCKER_OFFICEONLINE_VERSION
    pushd $files
    7za a -y officeonline.docker.7z officeonline.docker
    /bin/rm -f officeonline.docker
    popd
fi
touch $STATUS/save-docker
fi
fi #docker


if [ $installfail2ban -eq 1 ]; then
if ! test -f $STATUS/fail2ban; then
yum install -y fail2ban||(
download fail2ban-0.9.4.tar.gz "" https://github.com/fail2ban/fail2ban/archive/0.9.4.tar.gz
pushd $files
tar xvf fail2ban-0.9.4.tar.gz
pushd fail2ban-0.9.4
python setup.py install
/bin/cp -avf files/fail2ban.service /usr/lib/systemd/system
sed -i "s/paths-debian/paths-fedora/g" /etc/fail2ban/jail.conf
systemctl daemon-reload
popd
popd
)

cat >> /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
[nginx-http-auth]
enabled=true

[nginx-limit-req]
enabled=true
maxretry=2000
ngx_limit_req_zones=req_limit_per_ip

[nginx-botsearch]
enabled=true
logpath=%(nginx_access_log)s
        %(nginx_error_log)s
maxretry=60

EOF

chkconfig fail2ban on || systemctl enable fail2ban
restart fail2ban

touch $STATUS/fail2ban
fi
fi #fail2ban

if [ $installapp -eq 1 ]; then
echo "Comamnd to upgrade confguration files"
echo "cd $APP/solr/server/scripts/cloud-scripts && sh ./zkcli.sh -zkhost  localhost:2181 -cmd upconfig  -collection cloudfiles -confname cloudfiles -solrhome $APP/solr -confdir $APP/cloud/conf/solr-etc/cloudfiles"
cd $APP/cloud

if ! test -f $STATUS/start; then
configfile=conf/config.json.prod
if [ -e $files/config.json ]; then
    configfile=$files/config.json
fi
/bin/cp -avf $configfile conf/config.json
if [ $installdocker -eq 0 ]; then
    wopiHost=127.0.0.1
else
    wopiHost=$((ip addr show dev docker0||ifconfig docker0) | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p' | head -1)
fi
sed -i "s/MYSERVER/$wopiHost/g" conf/config.json
sed -i "s/demo.alot.pw/$domain/g" conf/config.json
sed -i "s/\"company\": \".*\"/\"company\": \"$company\"/g" conf/config.json
sed -i "s/8985/$solr_port/g" $APP/cloud/conf/config.json
#sed -i "s/\"enableSsl\"\:\ \"false\"/\"enableSsl\"\:\ \"true\"/g" $APP/cloud/conf/config.json
sed -i "s/\"mountpoint\"\:\"\/data\"/\"mountpoint\"\:\"\"/g" $APP/cloud/conf/config.json
sed -i "s/\"ports\"\:\ \[/\"ports\"\:\ \[ \{\"port\"\:\ $app_port,\"ssl\"\:true\}/g" $APP/cloud/conf/config.json
sed -i "s/\"ftpServerPort\"\: 21/\"ftpServerPort\"\: $ftp_port/g" $APP/cloud/conf/config.json

touch $STATUS/start
#if [ -e /usr/lib/systemd/system/ ]; then
#    /bin/cp -avf etc/bedrock.service /usr/lib/systemd/system/
#    systemctl daemon-reload
#    service bedrock stop
#    systemctl enable bedrock
#    systemctl start bedrock
#    systemctl status bedrock
#else
#    ./bin/start.sh
#    chkconfig bedrock on || systemctl enable bedrock
#fi
#turn off redirect
#nohup ./bin/OCR-LangPackage-download.sh 2>&1 >$STATUS/ocr.log&
fi

if [ $installyumcache -eq 1 ]; then
if ! test -f $STATUS/build-yumcache; then
if ! test -f $files/yum-$(rpm -q --queryformat '%{VERSION}' centos-release).tar;  then
    pushd /var/cache
    tar cvf $files/yum-$(rpm -q --queryformat '%{VERSION}' centos-release).tar yum
    popd
touch $STATUS/build-yumcache
fi
fi
fi

if test -f $APP/cloud/bin/ddns.sh ; then
if [ ! -z "$ddns_key" ]; then
    $APP/cloud/bin/ddns.sh enable $domain $ddns_key
fi
fi

echo Please edit `pwd`/conf/config.json
echo Restart service: service bedrock restart
echo Log path: `pwd`/logs/server-*.log 

rm -rf $APP/*.{zip,tgz,tar.gz}
fi #app
