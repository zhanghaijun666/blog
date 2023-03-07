#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="api.devops.tr"
RSYNC_HOST_PATH="/opt/confluence"
RSYNC_PARAMETER="--exclude=logs --exclude=data/backups"

source  ./sync.sh
