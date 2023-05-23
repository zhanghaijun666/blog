#!/bin/bash

#@File    :   mianmi.sh
#@Time    :   2022/08/20 17:45:53
#@Author  :   Li Ruilong
#@Version :   1.0
#@Desc    :   None
#@Contact :   1224965096@qq.com


/usr/bin/expect <<-EOF
spawn ssh-keygen
expect "(/root/.ssh/id_rsa)" {send "\r"}
expect {
       "(empty for no passphrase)" {send "\r"}
       "already" {send "y\r"}
       }

expect {
       "again" {send "\r"}
       "(empty for no passphrase)" {send "\r"}
       }

expect {
       "again" {send "\r"}
       "#" {send "\r"}
       }
expect "#"
expect eof
EOF

for IP in $( cat host_list )
do

if [ -n IP ];then

/usr/bin/expect <<-EOF
spawn ssh-copy-id root@$IP

expect {
       "*yes/no*"   { send "yes\r"}
       "*password*" { send "redhat\r" }
       }
expect {
       "*password" { send "redhat\r"}
       "#"         { send "\r"}
       }
expect "#"
expect eof
EOF
fi

done
