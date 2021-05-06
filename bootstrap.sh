#!/bin/bash

echo "bootstrapping..."

env
ls -l
yarn --production
node server.js