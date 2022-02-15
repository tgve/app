#!/bin/bash
# (run from containing directory)
set -xe

pushd ..
docker build -f Dockerfile.R -t tgve-plumber .
docker run -p 127.0.0.1:5000:5000 tgve-plumber
popd

# visit `http://localhost:5000` to see the app
