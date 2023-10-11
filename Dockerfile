FROM node:18-alpine AS builder

WORKDIR /usr/src/app

RUN apk --no-cache add --virtual .builds-deps build-base python3

COPY --chown=node:node . .

ARG BUILD_ENV=mainnet

RUN npm ci
RUN npm run build:${BUILD_ENV}

USER node

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm ci --omit=dev

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

USER node

EXPOSE 3000
CMD ["node", "dist/src/main"]
