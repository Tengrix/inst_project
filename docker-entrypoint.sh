#!/usr/bin/env bash

PROJECT_GIT_URL=https://github.com/laguta-danil/instagramm-backend.git
UPDATE=0
PROJECT_EXIST=false

mkdir -p project
cd project

if [ ! -d ".git" ]; then
  echo "---== Create project ==---"
  git clone ${PROJECT_GIT_URL} .
  UPDATE=1
else
  PROJECT_EXIST=true
  echo "---== Check updates ==---"
  git fetch
  UPDATE=`git rev-list HEAD...origin/master --count`
fi

if [ $UPDATE -gt 0 ]; then

  if [ $PROJECT_EXIST = true ]; then
    echo "---== Found ${UPDATE} updates ==---"
    git pull origin
  fi

  echo "---== Install dependencies ==---"
  yarn install

  echo "---== Apply migrations ==---"
  yarn run prisma migrate deploy && yarn run prisma db push

else
  echo "---== Project has already been updated ==---"
fi

echo "---== Patch project ==---"

AWS=`grep endpoint src/modules/aws/aws.service.ts | wc -l`
if [ $AWS -eq 0 ]; then
  sed -i "s/region.*$/&,\n    endpoint: 'http:\/\/localstack:4566',\n    s3ForcePathStyle: true/" src/modules/aws/aws.service.ts
  echo "---== AWS patched ==---"
fi

MAILER=`grep localhost src/config/mailer.config.ts | wc -l`
if [ $MAILER -eq 0 ]; then
  sed -ri "s/(host:)(.*),$/\1 'mailer',/" src/config/mailer.config.ts
  sed -ri "s/(port:)(.*),$/\1 1025,/" src/config/mailer.config.ts
  sed -ri "s/(secure:)(.*)$/\1 false/" src/config/mailer.config.ts
fi

echo "---== Run server ==---"
yarn run start
