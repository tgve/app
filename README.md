# eatlas-template
Template Repo

## Using this template repo
The aim of this repo is to host your own instance of Turing Geovisualization Engine on github pages.

This should be three simple steps:

1. Create repo from this template
<img width="100%" style="border:1px solid" alt="Screenshot 2021-02-25 at 21 36 10" src="https://user-images.githubusercontent.com/408568/109221954-82a99280-77b1-11eb-97c1-7272781d6136.png">

2. Edit the data URL in gh-pages.yml with [URL](https://github.com/layik/eatlas-template/blob/main/.github/workflows/gh-pages.yml#L34) of your dataset. So replace `https://raw.githubusercontent.com/layik/eatlas-data/main/casualties.csv` with your data URL.
3. Once first actions build is finished, a `gh-actions` is built, enable gh-pages by assigning branch `gh-pages` and `root` as the directorry as shown below:
<img width="100%" style="border:1px solid" alt="Screenshot 2021-02-25 at 21 34 03" src="https://user-images.githubusercontent.com/408568/109220743-39f1d980-77b1-11eb-9bd0-4b5e183854d5.png">


You should now have an instance at `https://OWNER.github.io/REPO_NAME`

## Notes

* Template uses the beta release of of eatlas. This will be updated as `eatlas` package grows.

* Pending aove, more settings will be coming to this repo such as disabling the sidebar and customsing the default visualiztions.
  

## Tech notes

* Current version locks mapbox (via `react-map-gl` & `plotly`) to 1.10.x to avoid license issues.

* This template is a "clean" [CRA](https://github.com/facebook/create-react-app) app with eatlas as the only component.

* All actios use `yarn` just because CRA usses yarn by default.

* Locked react-scripts version to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).

