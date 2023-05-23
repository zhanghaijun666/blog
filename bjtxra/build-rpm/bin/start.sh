#!/bin/bash
set -e
basedir=$(dirname $0)/..
export SOLR_HOST=127.0.0.1
$basedir/solr/bin/solr start -force
export JAVA_TOOL_OPTIONS="-Djava.library.path=$basedir/cloud/lib/$(uname -m) -Dorg.hyperic.sigar.path=$basedir/cloud/lib/$(uname -m)"
nohup $basedir/cloud/bin/run.sh > $basedir/cloud/logs/server.out 2>/dev/null &

loops=0
until curl http://localhost:16060>/dev/null 2>/dev/null
do
    slept=$((loops * 2))
    if [ $slept -lt 60 ]; then
        echo Wait until started
        sleep 2
        loops=$[$loops+1]
    else
        echo Timeouted, check log to see if it works
        exit 0
    fi
done
echo Started
