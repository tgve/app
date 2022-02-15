#!/bin/bash
# run from directory containing this script
set -xe

pushd ..
docker build -f Dockerfile.Python -t tgve-flask .
docker run -p 127.0.0.1:5000:5000 tgve-flask
popd
