#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="repo.devops.tr"
RSYNC_HOST_PATH="/opt/nexus"

source  ./sync.sh