#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="jira.devops.tr"
BACKUP_ORIGIN="/backup/cache/jira"


source ./backup.sh