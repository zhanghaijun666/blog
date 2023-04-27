#! /bin/sh
set -e


LOG() {
  touch /backup/logs/rsync-$(date '+%Y-%m').log
  echo -e "$(date '+%Y/%m/%d %H:%M:%S')" "$1" >> /backup/logs/rsync-$(date '+%Y-%m').log
}

cd `dirname $0`

RSYNC_HOST=${RSYNC_HOST:-"backup.devops.tr"}
RSYNC_HOST_PATH=${RSYNC_HOST_PATH:-"/opt/dnsmasq"}
RSYNC_PATH=${RSYNC_PATH:-"/backup/cache"}
RSYNC_LOG_PATH=${RSYNC_LOG_PATH:-"/backup/logs/$(date +%Y-%m-%d)"}
RSYNC_PARAMETER=${RSYNC_PARAMETER:-""}

# echo $RSYNC_HOST_PATH | awk -F "/" '{print $NF}'
LOG_NAME=$(basename $RSYNC_HOST_PATH)
LOG_FILE=$RSYNC_LOG_PATH/$RSYNC_HOST-$LOG_NAME-$(date +%Y-%m-%d-%H%M).log

## 前置条件
command -v rsync >/dev/null 2>&1 || { echo >&2 "I require rsync but it's not installed.  Aborting."; sleep 5; exit 1; }

if [ $RSYNC_HOST ]; then
  RES=`ssh root@$RSYNC_HOST -o PreferredAuthentications=publickey -o StrictHostKeyChecking=no "date" |wc -l`
  if [ $RES -eq 1 ] ; then
    mkdir -p $RSYNC_PATH
    mkdir -p $RSYNC_LOG_PATH

    LOG "====== sync start => $RSYNC_HOST => ${LOG_NAME} ======"
    rsync -avzP --delete -e 'ssh -p 22' root@$RSYNC_HOST:$RSYNC_HOST_PATH  $RSYNC_PARAMETER  --log-file=${LOG_FILE} $RSYNC_PATH
    LOG "====== sync end => $RSYNC_HOST => ${LOG_NAME} ======"
  else
    echo "======  No ssh security configuration ....... $RSYNC_HOST ======"
    echo -e "please execute \e[92m ssh-copy-id -i root@$RSYNC_HOST \033[0m"
    exit 1;
  fi
fi
