#! /bin/bash
#color notes
NC='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
cyan='\033[0;36m'
yellow='\033[0;33m'
#Sectioning .........
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"
echo "Server details:"
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"

#fetching basic specs from the server(user,ip,os)
user=$(whoami)
echo -e "${cyan}User:${NC} $user"
hostname=$(hostname)
echo -e "${cyan}hostname:${NC} $hostname"
ip=$(hostname -I)
echo -e "${cyan}IP address:${NC} $ip"
os=$(cat /etc/os-release | grep 'NAME\|VERSION' | grep -v 'VERSION_ID' | grep -v 'PRETTY_NAME' | grep NAME)
echo -e "${cyan}OS:${NC} $os"

#Sectioning.....
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"
echo "Service status:"
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"
sleep 1

#checking tomcat status
echo -e "${yellow}1) Tomcat${NC}"
#grepping tomcat status from ps aux
pp=$(ps aux | grep tomcat | grep "[D]java.util")
if [[ $pp =~ "-Xms512M" ]]; then
	echo -e "   Status: ${GREEN}UP${NC}"

else
	echo -e "   Status: ${RED}DOWN${NC}"
fi
echo ""
#function to check apache is running or not!
function apache() {
	echo -e "${yellow}2) Apache-httpd${NC}"
	#grepping apache status from ps aux
	httpd=$(ps aux | grep httpd | grep apache)
	if [[ $httpd =~ "apache" ]]; then
		echo -e "   Status: ${GREEN}UP${NC}"
	else
		echo -e "   Status: ${RED}DOWN${NC}"
	fi
}

#function to check elastic is running or not
function elastic() {
	echo -e "${yellow}3) Elasticsearch${NC}"
	#grepping elasticsearch status from ps aux
	elastic=$(ps aux | grep elasticsearch)
	if [[ $elastic =~ "elastic+" ]]; then
		echo -e "   Status: ${GREEN}UP${NC}"
	else
		echo -e "    Status: ${RED}DOWN${NC}"
	fi
	#function to check mysql is running or not
}
function mysql() {
	echo -e "${yellow}4) Mysql${NC}"
	#grepping mysql status from ps aux
	mysql=$(ps aux | grep mysqld)
	if [[ $mysql =~ "mysqld" ]]; then
		echo -e "   Status: ${GREEN}UP${NC}"
	else
		echo -e "   Status: ${RED}DOWN${NC}"
	fi
}

function docker() {
	echo -e "${yellow}5) Docker${NC}"
	#grepping docker status from ps aux
	docker=$(systemctl status docker | grep dead)
	if [[ $docker =~ "dead" ]]; then
		echo -e "   Status: ${GREEN}UP${NC}"
	else
		echo -e "   Status: ${RED}DOWN${NC}"
	fi
}

#calling functions
apache
echo ""
elastic
echo ""
mysql
echo ""
docker
echo ""
#Sectioning............
#Fetching mem and cpu informations
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"
echo "Memory Details:"
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"
sleep 1
#view mem info
free -h
#get uptime details
uptime=$(uptime | awk '{print $3,$4}' | cut -f1 -d,)
echo -e "${cyan}System Uptime:${NC} :$uptime"
#Fetching the load average
loadaverage=$(top -n 1 -b | grep "load average:" | awk '{print $10 $11 $12}')
echo -e "${cyan}Load average:${NC}: $loadaverage"
echo -e "${cyan}The top 10 services with high resource usage are listed below.${NC}"
#Get top services with high resource utilization
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head

#sectioning...........
#Fetching server space details!
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"
echo "Server space Details:"
echo -e "${YELLOW}---------------------------------------------------------------------------------------------------------------${NC}"
#View disk space details
df -h

echo "----------------------------------------------------------------------------------------------------------------"
