FROM node:lts-alpine

ARG NODE_ENV=prod
ENV NODE_ENV ${APP_ENV}
RUN echo ${APP_ENV}

WORKDIR /opt/app
COPY . .
RUN yarn install
RUN yarn build

CMD ["node_modules/.bin/next", "start"]