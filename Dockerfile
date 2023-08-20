FROM alpine:3.18

WORKDIR /var/www/backend

RUN apk add --no-cache bash git nodejs npm
