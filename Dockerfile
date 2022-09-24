ARG NODE_IMAGE

FROM $NODE_IMAGE

RUN apk add g++ make py3-pip

RUN npm install -g pnpm@7
