#!/bin/bash
set -e

function fun_lock() {
	local lock=1
	set -o noclobber
	if (echo "$$" >"$1" 2>/dev/null); then
		lock=0
		set +u
		local foo=''
		[ ""x == "$2"x ] || foo="$2 $1;"
		trap "$foo ret=$?; rm -f $1; exit ${ret};" INT TERM EXIT
		set -u
	fi
	set +o noclobber
	return ${lock}
}

function fun_unlock() {
	trap '' INT TERM EXIT
	rm -f "$1"
}

###############################################################################################################################
#cd $(dirname `/usr/sbin/lsof -p $$ | gawk '$4 =="255r"{print $NF}'`) #进入当前脚本所在目录，需要系统装有lsof命令
lock_file=/tmp/monitor_server.lock # 定义操作锁文件路径
time=$(date "+%Y-%m-%d %H:%M:%S")

#获取操作锁
fun_lock $lock_file 2>/dev/null
[ $? -ne 0 ] && echo -e "\033[1;31m注意: 操作锁未解除，不能执行脚本！！！\033[0m" && exit 1

sleep 10
# 释放操作锁
fun_unlock $lock_file
