#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="sso.devops.tr"
BACKUP_ORIGIN="/backup/cache/cas"

source ./backup.sh