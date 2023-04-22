#!/bin/bash
## 批量创建用户
## 执行脚本，并在脚本后面添加用户名

USER_LIST=$@
USER_FILE=./user.info
for USER in $USER_LIST;do
	if ! id $USER &>/dev/null;then
		PASS=$(echo $RANDOM |md5sum |cut -c 1-8)
		useradd $USER
		echo $PASS | passwd --stdin $USER $>/dev/null
		echo "$USER $PASS" >> $USER_FILE
		echo "$USER USER create successful"
	else
		echo "$USER USER already exists!"
	fi
done
