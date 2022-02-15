## Serving the app via Python (using Flask)

Flask is a Python based web application framework. The two `tgve*.py` scripts provided in this folder show how to a Flask app with the React (TGVE) application as the root application.

The [Dockerfile](../Dockerfile.Python) shows how to set up and run the app via Flask. The script [serve.sh](./serve.sh) starts the app in a Docker container.

You should be able to browse to something like this (notice the famous Flask port 5000):

<img src="https://user-images.githubusercontent.com/408568/133886684-e9266d1b-79ab-43e5-8606-84dc8b26da2a.png" width="60%" />

See the [TGVE docs](../../tgvejs/) for how to pass data endpoints to TGVE. See [here](./cross-origin.md) for [cross-origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) restrictions.
