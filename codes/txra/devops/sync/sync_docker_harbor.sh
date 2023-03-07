#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="docker.devops.tr"
RSYNC_HOST_PATH="/opt/harbor"

source  ./sync.sh