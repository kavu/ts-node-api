# Builder
FROM node:17.7.1-alpine3.15 AS build

USER node

WORKDIR /app
COPY --chown=node:node . /app

RUN yarn install --immutable --immutable-cache --check-cache --frozen-lockfile \
  && yarn build \
  && yarn cache clean --all

# Runner
FROM node:17.7.1-alpine3.15 AS run

USER node

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build --chown=node:node /app /app

CMD "yarn" "start:prod"
