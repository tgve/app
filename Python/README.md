## Serving the app via Python (using Flask)

Flask is a Python based web application framework. The two `tgve*.py` scripts provided in this folder show how to a Flask app with the React (TGVE) application as the root application.

The [Dockerfile](../Dockerfile.Python) shows how to set up and run the app via Flask. The script [serve.sh](./serve.sh) starts the app in a Docker container.

### Using the template repository (Create React App)

What we are going to do is simply get the `build` output of the [`app`](https://github.com/tgve/app) repository to be served by Flask. In the next section we will see how we can pass variables to TGVE from Python and also briefly outline how we need to rebuild front-end. Please refer to the TGVE docs or Create React App for more.

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

