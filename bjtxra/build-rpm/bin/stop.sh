#!/bin/bash
set -e
basedir=$(dirname $0)/..

CHECK_PID=$(ps auxww|grep java|grep com.bjtxra.cloudserver.CloudCollaborator|awk '{print $2}')
if [ "$CHECK_PID" != "" ]; then
    echo -e "Stop process $CHECK_PID."
    kill -9 $CHECK_PID
    echo "Killed process $CHECK_PID"
    sleep 1
fi

CHECK_PID=$(ps auxww|grep java|grep com.bjtxra.cloudserver.CloudCollaborator|awk '{print $2}')
if [ "$CHECK_PID" != "" ]; then
    echo "ERROR: Failed to kill previous process $CHECK_PID ... script fails."
    exit 1
fi

$basedir/solr/bin/solr stop 