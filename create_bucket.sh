#!/usr/bin/env bash
BUCKET=`awslocal s3api list-buckets | grep 'inctagram' | wc -l`
if [ $BUCKET -eq 0 ]; then
    echo "---== Create bucket - inctagram ==---"
    awslocal s3 mb s3://inctagram
fi
