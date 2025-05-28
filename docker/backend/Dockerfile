# Build Environment
FROM node:20.19.2 as build-environment
ENV NODE_ENV development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY packages/backend/package.json yarn.lock ./
COPY packages/tsconfig.settings.json ./..
RUN yarn
COPY packages/backend/ .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline

# Production Environment
FROM node:20.19.2 as production-environment
ENV NODE_ENV production
ENV DOCKERENV true

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY packages/backend/package.json .
COPY --chown=node:node --from=build-environment /usr/src/app/build ./build
COPY --chown=node:node --from=build-environment /usr/src/app/node_modules ./node_modules

USER node
EXPOSE 4000

CMD [ "yarn", "start" ]
