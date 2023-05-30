#!/bin/bash

. /etc/init.d/functions

Optional="Optional"
Mandatory="Mandatory"



function insert {
    local file=$1
    local type=$2
    local msg=$3
	local line_num=$(cat -n $file|grep -w $type|head -1|awk '{print $1}')
	local num=$[ $line_num-1 ]
	sed -i "${num}a  $msg" $file
}


function backup_cfgfile {
    local cfgfile=$1
    local bakfile=$cfgfile.bak.$(date +"%Y_%m_%d-%H_%M_%S")
    test -e $cfgfile && /bin/cp -f $cfgfile $bakfile
    echo $bakfile > /tmp/bakfile
}

function prt_msg {
    local level=$1
    local msg=$2
    printf "[%-10s] %-50s " $level "$msg"
}

function get_release {
    awk '{ print $7 }' /etc/redhat-release
}

function svc_ctl {
    local version=$(get_release)
    local op=$1
    local svcname=$2

    case $version in
        6.*)
            test -e /etc/rc.d/init.d/$svcname && \
            case $op in
                enable)
                    chkconfig $svcname on
                    ;;
                disable)
                    chkconfig $svcname off
                    ;;
                *)
                    service $svcname $op
                    ;;
            esac
            ;;
        7.*)
            test -e /usr/lib/systemd/system/$svcname.service && \
            systemctl $op $svcname
            ;;
    esac
}

#�ر�SELinux
function rhel_sec_disable_selinux {
	local cfgfile=/etc/sysconfig/selinux
	sed -i 's/SELINUX=.*/SELINUX=disabled/g' $cfgfile
        setenforce 0
}

#��ֹroot�û�Զ��SSH��¼
function rhel_sec_disable_ssh_rootlogin {
    # (ǿ��)
    # ��ֹroot�û�Զ��SSH��¼
    # �޸�/etc/ssh/sshd_config�ļ�����PermitRootLoginֵ��ΪPermitRootLogin  no������sshd����
    # ʹ��root�˻�Զ�̳��Ե�½
    # 1��rootԶ�̵�¼���ɹ�����ʾ��Not on system console����
    # 2����ͨ�û����Ե�¼�ɹ������ҿ����л���root�û���

    local level=mandatory
    local cfgfile=/etc/ssh/sshd_config
    local chkexpr="PermitRootLogin[     ]*no"

    prt_msg $Mandatory  "Checking 'PermitRootLogin no'..."
    egrep -v '#' $cfgfile | egrep -q "$chkexpr"

    if [ $? -eq 0 ];then
        printf "OK!\n"
    else
        printf "Need to change\n"
        printf "Fixing PermitRootLogin to no...\n"
        backup_cfgfile $cfgfile
        echo "PermitRootLogin no" >> $cfgfile
        svc_ctl restart sshd
    fi
}

#���õ�¼ʧ���˻���������
function rhel_sec_account_locking_policy {
    local cfgfile_auth=/etc/pam.d/system-auth-ac
    #local cfgfile_account=/etc/pam.d/common-account
    local cfgfile_sshd=/etc/pam.d/sshd

    prt_msg $Mandatory "Checking account locking policy..."
    egrep -v '#' $cfgfile_auth | egrep -q 'pam_tally2.so'
    if [ $? -eq 0 ];then
        printf "OK!\n"
    else
        printf "Need to change\n"
        printf "Fixing account locking policy...\n"
        backup_cfgfile $cfgfile_auth
        $backup_cfgfile $cfgfile_account
		insert $cfgfile_auth  auth   "auth        required      pam_tally2.so deny=5 unlock_time=600 "
    fi

	egrep -v '#' $cfgfile_sshd | egrep  'pam_tally2.so'|egrep  -q 'auth'
    if [ $? -eq 0 ];then
        printf "OK!\n"
    else
	    printf "Need to change\n"
        printf "Fixing sshd auth pam policy...\n"
	    backup_cfgfile $cfgfile_sshd
	    insert $cfgfile_sshd  auth   "auth       required     pam_tally2.so deny=5 unlock_time=600"
	fi

	egrep -v '#' $cfgfile_sshd | egrep  'pam_tally2.so'|egrep -q 'account'
    if [ $? -eq 0 ];then
        printf "OK!\n"
    else
	    printf "Need to change\n"
        printf "Fixing sshd account pam policy...\n"
	    backup_cfgfile $cfgfile_sshd
        insert $cfgfile_sshd  account "account    required     pam_tally2.so"
	fi
}

#���ÿ���ӶȲ���
function rhel_sec_passwd_complexity {
    # (ǿ��)
    # cat /etc/pam.d/system-auth���ҵ�passwordģ��ӿڵ����ò��֣��ҵ��������µ������У�
    # password  requisite  /lib/security/$ISA/pam_cracklib.so
    # 1�� �ο����ò���
    # cat /etc/pam.d/system-auth���ҵ�passwordģ��ӿڵ����ò��֣��ҵ��������µ������У�
    # password  requisite  /lib/security/$ISA/pam_cracklib.so minlen =8
    # 2���������˵��
    # ����˵�����£�
    # 1��retry=5��ȷ���û���������ʱ�������ԵĴ�����
    # 2��minlen=8��ȷ��������С����Ҫ����ʵ�ϣ���Ĭ�������£��˲�������������С����Ϊ8��
    # 3��dcredit=-1������������Ҫ���ٰ���1�������ַ���
    # 4��ucredit=-1���������������д�д�ַ�������������1����
    # 5��lcredit=-1����������������Сд�ַ�������������1����
    local cfgfile=/etc/pam.d/system-auth-ac

    prt_msg $Mandatory "Checking password complexity..."
    egrep -v '#' $cfgfile | egrep 'pam_cracklib.so' | egrep -q 'minlen'
    if [ $? -eq 0 ];then
        printf "OK!\n"
    else
        printf "Need to change\n"
        printf "Fixing password complexity...\n"
        backup_cfgfile $cfgfile
		sed -i '/pam_cracklib.so/d' $cfgfile
		insert $cfgfile  password  "password    required      pam_cracklib.so retry=5 minlen=8 dcredit=-1 ucredit=-1 lcredit=-1"
        #echo "password required pam_cracklib.so retry=5 minlen=8 dcredit=-1 ucredit=-1 lcredit=-1" >> $cfgfile
    fi
}

#���ÿ�����������
function rhel_sec_pass_max_days {
    # (ǿ��)
    # ��rootȨ���˻���¼ϵͳ
    # cat /etc/login.defs�ļ�,�鿴PASS_MAX_DAYS��PASS_MIN_DAYS��ֵ�Ƿ�������÷����е�Ҫ��
    # # cat /etc/login.defs�ļ���ָ����������У�
    # u PASS_MAX_DAYS��������������ʹ�����ޣ�
    # u PASS_MIN_DAYS����������������ʹ�����ޣ�
    # �����������:
    # vi /etc/login.defs�ļ����޸�PASS_MAX_DAYSֵΪС�ڵ���180��
    # vi /etc/login.defs�ļ����޸�PASS_MIN_DAYSֵΪ���ڵ���2

    local cfgfile=/etc/login.defs

    prt_msg $Mandatory "Setting password max days..."
    sed -i -e 's|PASS_MAX_DAYS.*|PASS_MAX_DAYS 180|g' \
        -e 's|PASS_MIN_DAYS.*|PASS_MIN_DAYS 2|g' $cfgfile
    printf "OK!\n"
}

#ɾ���������޹��˺�
function rhel_sec_lock_nologin {
    # (ǿ��)
    # �鿴�����û���
    # # cat /etc/password���鿴��Щ�˻���shell����Ϊnologin��
    # �����û���
    # l�޸�/etc/password�ļ�������Ҫ�������û���shell����Ϊnologin��
    # l��ͨ��#passwd �Cl username�����˻���
    # ֻ�о߱������û�Ȩ�޵�ʹ���߷���ʹ��#passwd �Cl username�����û�,��#passwd �Cd username������ԭ������ʧЧ����¼�����������롣
    # �������˵����
    # һ������£���Ҫ�������û���lp,nuucp,hpdb,www,demon
    # ʹ��# cat /etc/password����鿴�����˻���shell��ΪnologinΪ����

    local cfgfile=/etc/passwd
    prt_msg $Mandatory "Locking account of /sbin/nologin..."
    for account in $(egrep '/sbin/nologin' /etc/passwd | cut -f 1 -d ':');do
        passwd -l $account 2>&1 > /dev/null
    done
    printf "OK!\n"
}

#��ֹroot�û�Զ��telnet��¼
function rhel_sec_disable_root_telnet {
    # (ǿ��)
    # ��root��¼ϵͳ,����������
    # #vi /etc/xinetd.d/telnet
    # ��disable = no ��Ϊ
    # disable = yes
    # �鿴telnet����״̬��# ps�Celf|grep telnetd��������telnetd����Ϊ���ϡ�
    local cfgfile=/etc/xinetd.d/telnet

    prt_msg $Mandatory "Checking telnet for root login..."
    if [ ! -e $cfgfile ];then
        printf "OK!\n"
        return 0
    fi

    lsof -Pn -i4TCP:23 -s TCP:LISTEN 2>&1 > /dev/null
    if [ $? -eq 0 ];then
        printf "OK!\n"
    else
        printf "Need to change\n"
        Printf "Fixing to disable root login telnet...\n"
        sed -i -e 's|disable *=.*|disable = yes|g' $cfgfile
        svc_ctl restart xinetd
    fi
}

#����SSH��¼����
function rhel_sec_ssh_policy {
    local cfgfile=/etc/ssh/sshd_config
    backup_cfgfile $cfgfile

    /bin/cp -af $cfgfile $cfgfile.tmp
    awk '
        /^Protocol/           { $2 = "2" };
        /^X11Forwarding/            { $2 = "yes" };
        /^IgnoreRhosts/       { $2 = "yes" };
        /^RhostsAuthentication/       { $2 = "no" };
        /^RhostsRSAAuthentication/ { $2 = "no" };
        /(^#|^)PermitRootLogin/      {
              $1 = "PermitRootLogin";
              $2 = "no" };
        /^PermitEmptyPasswords/      { $2 = "no" };
        /^#Banner/          {
              $1 = "Banner";
              $2 = "/etc/issue" }
        { print }' $cfgfile.tmp > $cfgfile

    rm -f $cfgfile.tmp
    svc_ctl restart sshd
}

#���õ�¼��ʱ����
function rhel_sec_login_timeout {
    local cfgfile=/etc/profile
    prt_msg $Mandatory "Checking shell login timeout..."
    egrep -v '#' $cfgfile | egrep -q "TMOUT="
    if [ $? -eq 0 ];then
        printf "OK!\n"
        sed -i -e 's|TMOUT=.*|export TMOUT=300|g' $cfgfile
    else
        printf "Need to change\n"
        printf "Fixing shell login timeout..."
        backup_cfgfile $cfgfile
        echo "export TMOUT=300" >> $cfgfile
        printf "Done\n"
    fi
}

rhel_sec_disable_selinux
rhel_sec_disable_ssh_rootlogin
rhel_sec_account_locking_policy
rhel_sec_passwd_complexity
rhel_sec_login_timeout
