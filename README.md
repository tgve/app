# eatlas-template
## Use
The aim of this repo is to host your own instance of Turing Geovisualization Engine on github pages. 

This should be three simple steps:

1. Create repo from this template
<img width="100%" style="border:1px solid" alt="Use this template button in green" src="https://user-images.githubusercontent.com/408568/109291248-a8ba4b80-7820-11eb-9054-5b8fb6f38f82.png">

2. Edit the data URL in gh-pages.yml with [URL](https://github.com/layik/eatlas-template/blob/main/.github/workflows/gh-pages.yml#L34) of your dataset. So replace `https://raw.githubusercontent.com/layik/eatlas-data/main/casualties.csv` with your data URL. This is where we pass `REACT_APP_DEFAULT_URL` or `defaultURL` variable to eAtlas.

3. Once first actions build is finished, a `gh-actions` is built, enable gh-pages by assigning branch `gh-pages` and `root` as the directorry as shown below:
<img width="100%" style="border:1px solid" alt="Setup github pages" src="https://user-images.githubusercontent.com/408568/109220743-39f1d980-77b1-11eb-9bd0-4b5e183854d5.png">


You should now have an instance at `https://OWNER.github.io/REPO_NAME`

In step (2) the tempate includes point data with geography defined in the columns. eAtlas is able to parse the CSV file and pull out the points from the file using [`csv2geojson`](https://github.com/mapbox/csv2geojson) package by Mapbox. You can also define your own Mapbox API key as does this template repo in your github secrets section.

## Separate geography source

Many people do not have ready to consume (`GeoJSON`) data or CSS of point data. From version `1.1.0-beta.0` release (still in beta) eAtlas can take georaphy data source separately. To do this eAtlas expects a CSV and geography (must be GeoJSON). Other formats as data source is currently not supported. To pass the data and geography URLs to eAtlas, follow the same three steps above, except in (2):

Replace `https://raw.githubusercontent.com/layik/eatlas-data/main/casualties.csv` with your data URL which does not have geography. Additionally, add two or or more environmental varibles. That is, the `.github/workflows/gh-pages.yml would look like:

```yml
...
  REACT_APP_DEFAULT_URL: https://yourdata.url/data.csv 
  REACT_APP_GEOGRAPHY_URL: https://geography.url/geo.json
  REACT_APP_GEOGRAPHY_COLUMN_NAME: COLUMN_NAME
  REACT_APP_COLUMN_NAME: ANOTHER_COLUMN_NAME
...
```

Checkout the `src/App.js` file to see how you can pass these variables to the React eAtlas component. Check out the [eAtlas](https://github.com/layik/eAtlas) repo guide notes for more about these variables.

## Notes

* Template uses the beta release of of eatlas. This will be updated as `eatlas` package grows.

* Pending aove, more settings will be coming to this repo such as disabling the sidebar and customsing the default visualiztions.
  

## Tech notes

* Current version locks mapbox (via `react-map-gl` & `plotly`) to 1.10.x to avoid license issues.

* This template is a "clean" [CRA](https://github.com/facebook/create-react-app) app with eatlas as the only component.

* All actios use `yarn` just because CRA usses yarn by default.

* Locked react-scripts version to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).

