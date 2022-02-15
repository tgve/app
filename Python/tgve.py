# adapted from https://stackoverflow.com/a/45634550

import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='../build')

# serve contents of `static_folder` path
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # check provided path against static folder -- if it exists (such as .js file in our case), serve it;
    # otherwise fall back to static folder's `index.html` file
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
