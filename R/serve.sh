#!/bin/bash
# (run from containing directory)
set -xe

pushd ..
# REACT_APP_MAPBOX_ACCESS_TOKEN required but app should run
docker build -f Dockerfile.R -t tgve-plumber .
docker run -d -p 8000:8000 --name tgve-plumber tgve-plumber

popd

# use your favourite document server (nginx for example) to proxy requests.
# visit `http://localhost:8000` to see the app.
