#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="git.devops.tr"
BACKUP_ORIGIN="/backup/cache/gitlab"


source ./backup.sh