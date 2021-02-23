# eatlas-template
Template Repo

## Using this template repo
TODO: bring section of eAtlas notes related to this repo here.

## Notes

* This template is a "clean" [CRA](https://github.com/facebook/create-react-app) app with eatlas as the only component.

* All actios use `yarn` just because CRA usses yarn by default.

* Currently uses the alpha release of `.211` of eatlas which is pending an update.
  * Both ReactBootstrap and Awesome fonts have been added to the `public/index.html` file as `.211` does not come bundled with it. This will change with upstream changes
  * eAtlas v.0.0.211 cannot parse geo-csv from `defaultURL`, will change with versions above.
* Locked react-scripts version to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).

