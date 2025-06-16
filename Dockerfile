FROM node:20-slim

ARG NODE_ENV=prod
ENV NODE_ENV ${NODE_ENV}
RUN echo ${NODE_ENV}

WORKDIR /opt/app
COPY . .
RUN yarn lint && yarn build

CMD ["node_modules/.bin/next", "start"]