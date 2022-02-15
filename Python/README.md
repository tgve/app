## Serving the app via Python (using Flask)

Flask is a Python web application framework. The script [serve.sh](./serve.sh) and related [Dockerfile](../Dockerfile.Python) document how to serve TGVE as a Flask app.

**TODO** Merge following information into existing scripts:

1. build the front-end:
`git clone https://github.com/tgve/app && cde app && yarn && yarn run tgver` notice here we run a little script to edit the React `homepage` in `package.json` when we build the app.
2. setup Python requirements (Flask only for this basic setup): please install `virtualenv`. Then `virtualenv venv && source venv/bin/activate`. Then we can install the only requirement: `pip install -r requirements.txt`
3. setup development/production host/port bindings. Runnig the `tgve.py` script `python3 tgve.py` will bind your application to `localhost:5000`.

You should be able to browse to something like this (notice the famous Flask port 5000):

<img src="https://user-images.githubusercontent.com/408568/133886684-e9266d1b-79ab-43e5-8606-84dc8b26da2a.png" width="60%" />

See the [TGVE docs](../../tgvejs/) for how to pass data endpoints to TGVE.
