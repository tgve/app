## Serving the app via Python (using Flask)

Flask is a Python based web application framework. The `tgve.py` scripts provided in this folder show how to a Flask app with the React (TGVE) application as the root application.

In order to run this repository as a Flask app you need to:

1. build the front-end: 
`git clone https://github.com/tgve/app && cde app && yarn && yarn run tgver` notice here we run a little script to edit the React `homepage` in `package.json` when we build the app.
2. setup Python requirements (Flask only for this basic setup): please install `virtualenv`. Then `virtualenv venv && source venv/bin/activate`. Then we can install the only requirement: `pip install -r requirements.txt`
3. setup development/production host/port bindings. Runnig the `tgve.py` script `python3 tgve.py` will bind your application to `localhost:5000`.

You should be able to browse to something like this (notice the famous Flask port 5000):

<img src="https://user-images.githubusercontent.com/408568/133886684-e9266d1b-79ab-43e5-8606-84dc8b26da2a.png" width="60%" />

The [Dockerfile](../Dockerfile.Python) shows how to set up and run the app via Flask. The script [serve.sh](./serve.sh) starts the app in a Docker container.

See the [TGVE docs](../../tgvejs/) for how to pass data endpoints to TGVE.
