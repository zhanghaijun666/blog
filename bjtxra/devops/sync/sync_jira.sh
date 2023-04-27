#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="jira.devops.tr"
RSYNC_HOST_PATH="/opt/jira"
RSYNC_PARAMETER="--exclude=log --exclude=data/export --exclude=data/tmp"

source  ./sync.sh