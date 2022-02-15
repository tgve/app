# Serving your own data

## From Python (using Flask)

See the [Python folder](Python/) for documentation.

## From R (using Geoplumber)
The structure of this application is now a "geoplumber" app, so you can use the package to drive this project.

If you just like to run the app in R, all you need is the simple `run.R` script and you should have the `R/plumber.R` API up and running serving the `build` folder of the front-end.

Therefore, just clone the repo and run `Rscript run.R`.
Visit `http://localhost:8000` to see the app.

## From NodeJS (using ExpressJS)

Similarly, to serve the application from a NodeJS process, we can use the example script in the `nodejs` folder. Remember, just like Flask and Plumber the static folder path is relative to the `process.cwd`. Therefore, to run the the application as it is:

1. Clone the repository
2. Build it `yarn && yarn run build`
3. Run the ExpressJS code: `cd nodejs && node server.js`

Visit `http://localhost:3000` to see the app.

## Running in Docker container

``` sh
# Dockerfile manages your npm/React build steps
# REACT_APP_MAPBOX_ACCESS_TOKEN is required but app should run
docker build -t tgve .
# then bind plumber's default 8000 port to any of your choice
docker run -d -p 8000:8001 --name tgve tgve
```

Use your favourite document server (nginx for example) to proxy requests.
