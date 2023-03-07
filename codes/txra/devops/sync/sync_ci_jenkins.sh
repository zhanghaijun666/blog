#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="ci.devops.tr"
RSYNC_HOST_PATH="/opt/jenkins"

source  ./sync.sh