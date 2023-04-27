#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="ci.devops.tr"
BACKUP_ORIGIN="/backup/cache/jenkins-data"


source ./backup.sh