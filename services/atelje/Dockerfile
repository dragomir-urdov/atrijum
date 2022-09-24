# ARG NODE_IMAGE

# pnpm image
FROM node:16-alpine AS node_pnpm

RUN apk add g++ make py3-pip

RUN npm install -g pnpm@7

# FE Builder image
FROM node_pnpm AS client-builder

ENV APP_DIR=/home/node/app

USER node

RUN mkdir -p $APP_DIR
COPY pnpm-lock.yaml .pnpmfile.cjs package.json pnpm-workspace.yaml .npmrc $APP_DIR/
COPY --chown=node:node services/atelje/atelje-client $APP_DIR/services/atelje/atelje-client

WORKDIR $APP_DIR
RUN pnpm install
RUN pnpm --filter "@atrijum/atelje-client" run build

# API Builder image
FROM node_pnpm AS api-builder

ENV APP_DIR=/home/node/app

USER node

RUN mkdir -p $APP_DIR
COPY pnpm-lock.yaml .pnpmfile.cjs package.json pnpm-workspace.yaml .npmrc $APP_DIR/
COPY --chown=node:node services/atelje/atelje-server $APP_DIR/services/atelje/atelje-server

WORKDIR $APP_DIR
RUN pnpm install
RUN pnpm --filter "@atrijum/atelje-server" run build

# RUN find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
# RUN pnpm install --frozen-lockfile --prod --reporter=append-only
# RUN rm -f .npmrc

# App image
FROM node_pnpm as app

USER node

COPY --from=api-builder --chown=node:node /home/node/app /home/node/app
COPY --from=client-builder --chown=node:node /home/node/app/services/atelje/atelje-client/dist /home/node/app/services/atelje/atelje-server/dist/static

WORKDIR /home/node/app

CMD node services/atelje/atelje-server/dist/main.js