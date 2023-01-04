FROM node:lts-alpine

ARG NODE_ENV=prod
ENV NODE_ENV ${NODE_ENV}
RUN echo ${NODE_ENV}

WORKDIR /opt/app
COPY . .
RUN --mount=type=bind,source=./.yarn,target=/root/.yarn,rw YARN_CACHE_FOLDER=/root/.yarn yarn install --frozen-lockfile
RUN yarn build

CMD ["node_modules/.bin/next", "start"]