#!/bin/bash

until nc -z -v -w30 db 5432; do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Database is up, running prisma db push"
npx prisma migrate deploy
npx prisma db push

node dist/main