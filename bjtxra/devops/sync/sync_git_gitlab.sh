#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="git.devops.tr"
RSYNC_HOST_PATH="/opt/gitlab"
RSYNC_PARAMETER="-exclude=gitlab/logs"

source  ./sync.sh