#!/bin/bash


DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_NAME=nrs_platform


psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f schema.sql


psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f seed.sql
