#!/bin/bash
basedir=$(dirname $0)/..
pushd $basedir/cloud
basedir=$PWD
if [ ! -e /etc/nginx/dhparams.pem ]; then
    openssl dhparam -out /etc/nginx/dhparams.pem 2048
fi
sed -i "s/# server_tokens off/server_tokens off/g" /etc/nginx/nginx.conf

sed "s_/opt/cloud/_$basedir/_g" etc/nginx.conf > /etc/nginx/conf.d/bedrock.conf
/bin/cp -avf etc/nginx-filters.conf /etc/nginx/nginx-filters.conf

touch /etc/nginx/passwords
echo "bedrock:$(openssl passwd -crypt 'letmein')" >> /etc/nginx/passwords

service nginx restart
popd #$basedir/cloud
