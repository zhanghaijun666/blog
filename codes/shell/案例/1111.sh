#!/bin/bash

# 操作系统信息
os_info=$(cat /etc/os-release)
echo "操作系统信息:"
echo "$os_info"
echo

# CPU信息
cpu_info=$(lscpu)
echo "CPU信息:"
echo "$cpu_info"
echo

# 内存信息
mem_info=$(free -h)
echo "内存信息:"
echo "$mem_info"
echo

# 磁盘信息
disk_info=$(df -h)
echo "磁盘信息:"
echo "$disk_info" | awk '{print "文件系统:", $1, "\t容量:", $2, "\t已用:", $3, "\t可用:", $4, "\t使用率:", $5, "\t挂载点:", $6}'
