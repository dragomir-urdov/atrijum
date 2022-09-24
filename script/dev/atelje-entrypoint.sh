#!/usr/bin/env sh

set -e

pnpm install

pnpm --filter "@atrijum/atelje-client" run start &

pnpm --filter "@atrijum/atelje-server" run start:dev