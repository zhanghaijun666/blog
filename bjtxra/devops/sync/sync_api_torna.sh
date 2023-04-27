#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="api.devops.tr"
RSYNC_HOST_PATH="/opt/torna"

source  ./sync.sh