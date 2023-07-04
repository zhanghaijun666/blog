
#!/bin/bash
# 设置静态IP地址的脚本
# 修改接口和连接名为ens160
interface=ens160
connection=ens160
# 修改IP地址、子网掩码、网关和DNS
ipaddr=192.168.1.181
netmask=255.255.255.0
gateway=192.168.1.1
dns=8.8.8.8
# 使用nmcli命令修改网络配置
sudo nmcli con modify "$connection" ifname "$interface" ipv4.method manual ipv4.addresses "$ipaddr"/24 gw4 "$gateway"
sudo nmcli con modify "$connection" ipv4.dns "$dns"
# 重启连接
sudo nmcli con down "$connection"
sudo nmcli con up "$connection"
# 显示结果
echo "静态IP地址已设置为：$ipaddr"
echo "子网掩码已设置为：$netmask"
echo "网关已设置为：$gateway"
echo "DNS已设置为：$dns"
