#!/usr/bin/env sh

set -e

echo "Hello World"

pnpm install

pnpm --filter "@atrijum/atelje-client" run start &

pnpm --filter "@atrijum/atelje-server" run start:dev