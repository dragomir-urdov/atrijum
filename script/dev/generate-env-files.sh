#!/usr/bin/env sh

set -e

echo "Generated:"
for example_env in .env/*.example.env
do
    env=${example_env/example/"development"}
    if [ ! -f $env ]
    then
      cp "$example_env" "$env"
      echo "$env"
    fi
done
