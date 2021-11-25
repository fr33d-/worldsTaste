# Build Environment
FROM node:10.15.3-alpine as build-environment
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
FROM node:10.15.3-alpine as production-environment
ENV NODE_ENV production
ENV DOCKERENV true

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY packages/backend/package.json .
COPY --chown=node:node --from=build-environment /usr/src/app/build ./build
COPY --chown=node:node --from=build-environment /usr/src/app/node_modules ./node_modules

# VOLUME /app/uploads

# RUN -d -it --name backend --mount type=bind,source=/tmp,target=/usr nginx:latest
# RUN -d -it --mount type=bind,source=/uploads,target=/packages/backend/uploads nginx:latest
# RUN -d -it --mount type=bind,source=./../../packages/backend/uploads,target=/uploads nginx:latest

# RUN --mount source=/packages/backend/uploads,target=/app/uploads nginx:latest
# RUN -d --name backend -v /packages/backend/uploads:/app/uploads nginx:latest

# docker run -v /packages/backend/uploads:/app/uploads backend nginx:latest
# docker run -d -it -v /Users/fredericwollinger/dev/website-fork/packages/backend/uploads:/home/node/app/uploads website-fork_backend
# docker run -d -it --mount source=/Users/fredericwollinger/uploads,target=/app/uploads nginx:latest

# docker run -v /Users/fredericwollinger/uploads:/app/uploads
# docker run -dit --mount 'type=bind,src=/Users/fredericwollinger/uploads,dst=/app/uploads' website-fork_backend

USER node
EXPOSE 4000

CMD [ "yarn", "start" ]

