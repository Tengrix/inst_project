#!/bin/bash

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
  UPDATE=`git rev-list HEAD...origin/master --count`
fi

if [ "$UPDATE" -gt 0 ]; then

  if [ "$PROJECT_EXIST" = true ]; then
    echo "---== Found {$UPDATE} updates ==---"
    git pull origin
  fi

  echo "---== Install dependencies ==---"
  npm i

  echo "---== Apply migrations ==---"
  npx prisma migrate deploy && npx prisma db push

else
  echo "---== Project has already been updated ==---"
fi

echo "---== Run server ==---"
npm run start:dev
