# eAtlas-template [![Deploy to github pages](https://github.com/layik/eatlas-template/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/layik/eatlas-template/actions/workflows/gh-pages.yml) [![npm version](https://badge.fury.io/js/eatlas.svg)](https://badge.fury.io/js/eatlas)

This is a template repository to use the Turing Geo-visualization Engine (TGVE or eAtlas) in a React app and deploying it in github pages.

## Use
The aim of this repo is to host your own instance of TGVE on your fork's github pages. 

To achieve this, follow these three steps:

1. Create repo from this template
<img width="100%" style="border:1px solid" alt="Use this template button in green" src="https://user-images.githubusercontent.com/408568/109291248-a8ba4b80-7820-11eb-9054-5b8fb6f38f82.png">
You should now have an instance at `https://github.com/USER_OR_ORG/FORK_REPO_NAME`

2. Edit the data URL in gh-pages.yml with [URL](https://github.com/layik/eatlas-template/blob/main/.github/workflows/gh-pages.yml#L34) of your dataset. So replace `https://raw.githubusercontent.com/layik/eatlas-data/main/casualties.csv` with your data URL. This is where we pass `REACT_APP_DEFAULT_URL` or `defaultURL` variable to eAtlas.

3. As you fork the repo and whether you follow step (2) or not, the defined actions in `.github/workflows` will be executed by github. Once a first build is done, it will create a separate branch to your `main` branch called `gh-pages`. Go ahead and enable gh-pages by assigning branch `gh-pages` and `root` as the directory as shown below from your fork's settings:
<img width="100%" style="border:1px solid" alt="Setup github pages" src="https://user-images.githubusercontent.com/408568/109220743-39f1d980-77b1-11eb-9bd0-4b5e183854d5.png">


You should now have an instance at `https://USER_OR_ORG.github.io/FORK_REPO_NAME`

In step (2) the template includes point data with geography defined in the columns. eAtlas is able to parse the CSV file and pull out the points from the file using [`csv2geojson`](https://github.com/mapbox/csv2geojson) package by Mapbox. You can also define your own Mapbox API key as does this template repo in your github secrets section.

## Separate geography source

Many people do not have ready to consume (`GeoJSON`) data or CSV of point data. From version `1.1.0-beta.0` release (still in beta) eAtlas can take geography data source separately. To do this eAtlas expects a CSV and geography (must be GeoJSON). Other formats as data source is currently not supported. To pass the data and geography URLs to eAtlas, follow the same three steps above, except in (2):

Replace `https://raw.githubusercontent.com/layik/eatlas-data/main/casualties.csv` with your data URL which does not have geography. Additionally, add two or or more environmental variables. That is, the `.github/workflows/gh-pages.yml` would look like:

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

### Generic notes

* Template uses the beta release of of eAtlas. This will be updated as `eatlas` package grows.

* Pending above, more settings will be coming to this repo such as disabling the sidebar, defining sidebar contents, and customizing the default visualizations.
  

### Technical

* Current version locks mapbox (via `react-map-gl` & `plotly`) to 1.10.x to avoid license issues.

* This template is a "clean" [CRA](https://github.com/facebook/create-react-app) app with eAtlas as the only component.

* All actions use `yarn` just because CRA uses yarn by default.

* Locked react-scripts version to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).

* `gh-pages.yml` runner does few things: first it replaces the default values from the fork in `package.json`. See the script for exactly how this is done.
