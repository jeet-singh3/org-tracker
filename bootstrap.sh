#!/bin/bash

echo "bootstrapping..."

env

ls -l

yarn --production

node migrate.js

touch /opt/apache-tomcat-aclogs/app.log

node server.js >> /opt/apache-tomcat-aclogs/app.log 2>&1