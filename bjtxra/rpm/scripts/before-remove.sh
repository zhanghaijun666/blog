#!/bin/bash
if [ "$CLOUDSERVER_DEBUG" = "DEBUG" ]; then
  set -x
fi
rm -rf /opt/lool