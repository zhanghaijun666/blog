#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="docker.devops.tr"
BACKUP_ORIGIN="/backup/cache/harbor"

source ./backup.sh