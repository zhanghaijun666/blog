#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="ci.devops.tr"
RSYNC_HOST_PATH="/opt/jenkins-data"
RSYNC_PARAMETER="--exclude=workspace --exclude=caches --exclude=docker --exclude=builds --exclude=logs"

source  ./sync.sh