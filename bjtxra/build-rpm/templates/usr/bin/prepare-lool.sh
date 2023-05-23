#!/bin/bash
set -e
export LC_CTYPE=en_US.UTF-8

setcap cap_fowner,cap_mknod,cap_sys_chroot=ep /usr/bin/loolforkit
rm -rf /opt/lool
mkdir -p /opt/lool/child-roots
grep lool: /etc/passwd>/dev/null||useradd --system --home-dir /opt/lool lool
mkdir -p /var/cache/loolwsd && chown lool /var/cache/loolwsd
rm -rf /var/cache/loolwsd/*
chown lool /opt/lool
chown lool /opt/lool/child-roots
if which sudo >/dev/null 2>/dev/null; then
  sudo -u lool loolwsd-systemplate-setup /opt/lool/systemplate /opt/libreoffice >/dev/null 2>&1
else
  su lool --shell=/bin/sh -c "loolwsd-systemplate-setup /opt/lool/systemplate /opt/libreoffice >/dev/null 2>&1"
fi
touch /var/log/loolwsd.log
chown lool /var/log/loolwsd.log
if [ -e /usr/bin/loolwsd-generate-proof-key ]; then
    /usr/bin/loolwsd-generate-proof-key
fi
if [ ! -e /etc/loolwsd/ca-chain.cert.pem ]; then
  ln -sf /opt/cloud/etc/keys/trust.pem /etc/loolwsd/ca-chain.cert.pem
fi
if [ ! -e /etc/loolwsd/key.pem ]; then
  ln -sf /opt/cloud/etc/keys/bedrock.private.pem /etc/loolwsd/key.pem
fi
if [ ! -e /etc/loolwsd/cert.pem ]; then
  ln -sf /opt/cloud/etc/keys/bedrock.pem /etc/loolwsd/cert.pem
fi
#disable ssl with gnu sed.find ssl, !b negates the previous address (regexp) and breaks out of any processing, ending the sed commands, n prints the current line and then reads the next into the pattern space
sed -i '/ssl/!b;n;s/>true</>false</g' /etc/loolwsd/loolwsd.xml
sed -i 's#></proxy_prefix>#>true</proxy_prefix>#g' /etc/loolwsd/loolwsd.xml

# Fix lool resolv.conf problem (wizdude)
rm -rf /opt/lool/systemplate/etc/resolv.conf
ln -s /etc/resolv.conf /opt/lool/systemplate/etc/resolv.conf

# Replace trusted host
if [ ! -z "$domain" ]; then
perl -pi -e "s/localhost<\/host>/${domain}<\/host>/g" /etc/loolwsd/loolwsd.xml
fi
if [ ! -z "$username" ]; then
perl -pi -e "s/<username desc=\"The username of the admin console. Must be set.\"><\/username>/<username desc=\"The username of the admin console. Must be set.\">${username}<\/username>/" /etc/loolwsd/loolwsd.xml
fi
if [ ! -z "$password" ]; then
perl -pi -e "s/<password desc=\"The password of the admin console. Must be set.\"><\/password>/<password desc=\"The password of the admin console. Must be set.\">${password}<\/password>/g" /etc/loolwsd/loolwsd.xml
fi

# Start loolwsd
#su -c "/usr/bin/loolwsd --version --o:sys_template_path=/opt/lool/systemplate --o:lo_template_path=/opt/libreoffice --o:child_root_path=/opt/lool/child-roots --o:file_server_root_path=/usr/share/loolwsd" -s /bin/bash lool

