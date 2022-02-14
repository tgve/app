# Serving your own data

## From Python (using Flask)
The two `tgve*.py` scripts provided in this repository is the bare examples of running a Flask app with the React (TGVE) application as the root application.

If you have your Python virtual environment setup with Flask installed + NodeJS with either npm or yarn setup, then:

1. Clone the repository
2. Run `yarn && yarn run build`
3. Run `python tgve.py`

Should be enough to get the application running/served by Python (Flask).
Visit `http://localhost:5000` to see the app.

### What is Flask?

Flask is a Python based web application "micro" framework and R's `plumber` is inspired by it. From the v2 [docs](https://flask.palletsprojects.com/en/2.0.x/foreword/):

> “Micro” does not mean that your whole web application has to fit into a single Python file (although it certainly can), nor does it mean that Flask is lacking in functionality.

So TGVE must also be able to run within a flask app.

### Using the template repository (Create React App)

What we are going to do is simply get the `build` output of the [`app`](https://github.com/tgve/app) repository to be served by Flask. In the next section we will see how we can pass variables to TGVE from Python and also briefly outline how we need to rebuild front-end. Please refer to the TGVE docs or Create React App for more. You also need to be familiar with working with Flask but we take that as given as you are reading this entry. For now [this](https://stackoverflow.com/a/45634550) simple Python script slightly modified should be enough:

```python
# tgve.py
import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='path_to_template_repo/build/') # find that trailing slash needed

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
```
Quick explanation of the Python script is that first route ("/") serves what is inside the `static_folder` path. The second route (`/<path:path>`) checks the provided path against the static folder, if it exists it would serve it (such as a js file in our case) if not it would fallback to static folder's `index.html` file.

So, what is our static directory? That would be the output of a standard build command of a Create React App's react-scripts library. Again, please consult the [README](https://github.com/tgve/app) on this but in short, if you have node and npm package manager [setup](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), then:

1. Clone the template repository
2. Run yarn and
3. Run yarn run build

Then under your clones path you would have a build directory. That is our static directory. Just add that path to the above Python code.

We just need to run `python tgve.py` assuming you saved the script in `tgve.py` file and you have your environment setup for Python. You should see something like this (notice the famous Flask port 5000):
<img src="https://user-images.githubusercontent.com/408568/133886684-e9266d1b-79ab-43e5-8606-84dc8b26da2a.png" width="100%" />

### Serving data to TGVE
Just like any other web application, we can setup our data end-points and let TGVE know about it and deploy the application in a Python environment. Let's say we like to serve a simple GeoJSON file of United Kingdom's Upper Tier Local Authority geographies in a file named `las.geojson`, so long as we can serve this as JSON, TGVE should be able to parse it ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) permitting).

#### Rebuild TGVE
If we rebuild our app with our Flask as the "origin" then we should not hit CORS as by default Flask has CORS turned on, and it seems enabling CORS requires some work.

Before we go any further, the `app` package.json file has an entry which is specifically set for GitHub pages and we need to remove it. Remove the linke:

```json
  //}, also remove the preceding comma after the curly braces
  "homepage": "https://tgve.github.io/app"
```

Now we are ready to rebuild the application, let us rebuild TGVE with (see the repository's README for more):
```js
cd path_to_template_repo # your local clone
yarn # get the deps
REACT_APP_DEFAULT_URL=http://localhost:5000/las.geojson yarn build
```
This means, we are passing our local development environment with the data we want TGVE to consume. If we were to say host our app on GitHub pages and like to enable CORS on Flask, then we DO need to change our `tgve.py` file above. Install this flask [module](https://flask-cors.readthedocs.io/en/latest/):

```sh
pip install -U flask-cors
```
and amend the above script to:
```py
 import os
 from flask import Flask, send_from_directory
 from flask_cors import CORS, cross_origin

 app = Flask(__name__, static_folder='path_to_template_repo/build/')
 cors = CORS(app)
 app.config['CORS_HEADERS'] = 'Content-Type'

 # Serve React App
 @app.route('/', defaults={'path': ''})
 @app.route('/<path:path>')
 @cross_origin()
 def serve(path):
     if path != "" and os.path.exists(app.static_folder + '/' + path):
         return send_from_directory(app.static_folder, path)
     else:
         return send_from_directory(app.static_folder, 'index.html')


 if __name__ == '__main__':
     app.run(use_reloader=True, port=5000, threaded=True)
```

```sh
REACT_APP_DEFAULT_URL=http://localhost:5000/las.geojson yarn run build`
```
Now, the underlying TGVE instance would be looking at the above URL to fetch data.
<img width=50% src="https://user-images.githubusercontent.com/408568/133994277-6f10f933-b990-4695-896e-2c2406277056.png" width="100%"/>

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
