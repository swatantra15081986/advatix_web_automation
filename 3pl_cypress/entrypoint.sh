#!/bin/sh
set -e

# check if there was a command passed
# required by Jenkins Docker plugin: https://github.com/docker-library/official-images#consistency
if [ "$1" ]; then
    # execute it
    exec "$@"
fi

# else run my script
exec cypress run cypress run --browser=chrome --env configFile=demo