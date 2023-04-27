#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="api.devops.tr"
BACKUP_ORIGIN="/backup/cache/torna"

source ./backup.sh