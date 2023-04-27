#! /bin/sh
set -e

cd `dirname $0`

RSYNC_HOST="sso.devops.tr"
RSYNC_HOST_PATH="/opt/openldap"

source  ./sync.sh