#!/bin/bash

set -a
source ../.env
set +a

export PGPASSWORD=$POSTGRES_PASSWORD

echo "Running schema.sql..."
psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB -f schema.sql

echo "Running seed.sql..."
psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB -f seed.sql
