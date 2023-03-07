#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="repo.devops.tr"
BACKUP_ORIGIN="/backup/cache/nexus"

source ./backup.sh