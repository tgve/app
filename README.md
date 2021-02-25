# eatlas-template
Template Repo

## Using this template repo
The aim of this repo is to host your own instance of Turing Geovisualization Engine on github pages.

This should be three simple steps:

1. Create repo from this template
2. Edit the data URL in gh-pages.yml with link to your dataset
3. Once first actions finished, enable gh-pages by assigning branch `gh-pages` and `root` as the directorry.

You should now have an instance at `https://OWNER.github.io/REPO_NAME`

## Notes

* Template uses the beta release of of eatlas. This will be updated as `eatlas` package grows.

* Pending aove, more settings will be coming to this repo such as disabling the sidebar and customsing the default visualiztions.
  

## Tech notes

* Current version locks mapbox (via `react-map-gl` & `plotly`) to 1.10.x to avoid license issues.

* This template is a "clean" [CRA](https://github.com/facebook/create-react-app) app with eatlas as the only component.

* All actios use `yarn` just because CRA usses yarn by default.

* Locked react-scripts version to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).

