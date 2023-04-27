#! /bin/sh
set -e

LOG() {
    touch /backup/logs/backup-$(date '+%Y-%m').log
    echo -e "$(date '+%Y/%m/%d %H:%M:%S') $1" >> /backup/logs/backup-$(date '+%Y-%m').log
}

cd `dirname $0`

RSYNC_HOST=${RSYNC_HOST:-"backup.devops.tr"}
BACKUP_ORIGIN=${BACKUP_ORIGIN:-"/backup/cache/backup"}
BACKUP_PATH=${BACKUP_PATH:-"/backup/data"}

BACKUP_NAME=${BACKUP_ORIGIN##*/}

if [ -d $BACKUP_ORIGIN ]; then
    mkdir -p /backup/logs/
    mkdir -p $BACKUP_PATH/$RSYNC_HOST/
    echo "====== backup start ======"
    LOG "====== backup start => $RSYNC_HOST => $BACKUP_NAME ======"
    tar -czvf $BACKUP_PATH/$RSYNC_HOST/$(date +%Y-%m-%d)-$BACKUP_NAME.tar.gz -C ${BACKUP_ORIGIN%/*} $BACKUP_NAME
    LOG "====== sync end => $RSYNC_HOST => $BACKUP_NAME ======"
    echo "====== backup end ======"
else
    echo "====== $BACKUP_ORIGIN does not exist ======"
    exit 1;
fi

echo "====== start === Delete files 28 days ago ======"
find $BACKUP_PATH -mtime +28 -type f -print | xargs rm -rf
echo "====== end === Delete files 28 days ago ======"