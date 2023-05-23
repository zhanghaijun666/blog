#!/bin/bash
set -e

fpm -s dir -t $PACKAGE -f --prefix=/ \
  --after-install /scripts/install-after.sh \
  --after-upgrade /scripts/upgrade-after.sh \
  --before-remove /scripts/remove-before.sh \
  --after-remove /scripts/remove-after.sh \
  --config-files /etc \
  --config-files /opt/cloudserver/etc  \
  --config-files /opt/cloudserver/openresty/nginx/conf \
  --config-files /opt/cloudserver/app/cloud/conf \
  -n $NAME -v $VERSION -a $PACKAGE_ARCH \
  --iteration $BUILD_NUMBER \
  --license private \
  --vendor "$URL" \
  --maintainer "$URL" \
  --description "$DESC" \
  --url "$URL"  $EXTRA_ARGS $DEPS \
  $(ls -d {usr,etc,opt} 2>/dev/null)
