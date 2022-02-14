[![Deploy to github pages](https://github.com/tgve/app/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/tgve/app/actions/workflows/gh-pages.yml)
[![npm version](https://badge.fury.io/js/@tgve%2Ftgvejs.svg)](https://badge.fury.io/js/@tgve%2Ftgvejs)

This repo both hosts a deployed instance of [TGVE](https://github.com/tgve/tgvejs) on GitHub Pages, and acts as a template that you can use to deploy your own instance.

## Deployed latest version

The latest release is deployed at https://tgve.github.io/app. You can pass your own geospatial data URL as `defaultURL=url` parameter as follows:

```sh
https://tgve.github.io/app?defaultURL=https://raw.githubusercontent.com/tgve/app/main/casualties_100.geojson
```

You should see something like:

<img width="90%" src="https://user-images.githubusercontent.com/408568/145040206-7eb1b342-0898-45f6-afa7-5978ddd87dc5.png" alt="customise remote instnace" />


Likewise, you can embed it in an `iframe` as follows (this document is restricted to certain HTML elements, excluding `iframe`):
```html
<iframe srce="https://tgve.github.io/app" />
```
## Hosting your own instance

This is a template repository which makes it easy to host your own instance of the Turing Geo-visualization Engine (TGVE) on your fork's GitHub Pages. To achieve this, follow these three steps:

1. Create repo from this template
> <img width="100%" style="border:1px solid" alt="Use this template button in green" src="https://user-images.githubusercontent.com/408568/109291248-a8ba4b80-7820-11eb-9054-5b8fb6f38f82.png">
You should now have an instance at `https://github.com/USER_OR_ORG/FORK_REPO_NAME`

2. Edit `REACT_APP_DEFAULT_URL` in [`gh-pages.yml`](https://github.com/tgve/app/blob/main/.github/workflows/gh-pages.yml) with URL of your dataset. To pass separate data and geography URLs, use `REACT_APP_GEOGRAPHY_URL`, `REACT_APP_GEOGRAPHY_COLUMN` and `REACT_APP_COLUMN` as described [here](https://github.com/tgve/tgvejs). Check out [`src/App.js`](src/App.js) to see how you can pass these variables to the TGVE React component.

3. The actions defined in `.github/workflows` will be executed by GitHub. Once a first build is complete, it will create a separate branch called `gh-pages`. Enable deployment to GitHub Pages by assigning branch `gh-pages` and `root` as the directory in your fork's GitHub Pages settings:
> <img width="100%" style="border:1px solid" alt="Setup github pages" src="https://user-images.githubusercontent.com/408568/109220743-39f1d980-77b1-11eb-9bd0-4b5e183854d5.png">

You should now have an instance at `https://USER_OR_ORG.github.io/FORK_REPO_NAME`. Note that publishing to GitHub Pages may take some time.

What did we do? The repo now has a branch called `gh-pages` which GitHub uses to serve the app, which will pull data from the link added in step (2). The following screenshot shows a repo with owner “layik” and repository name “eAtlas”:

<img width="100%" alt="guide-shot" src="https://user-images.githubusercontent.com/408568/108049506-44d59d00-7040-11eb-9f4e-0a083829bfa5.png">

In step (2) the template includes point data with geography defined in the columns. TGVE is able to parse the CSV file and pull out the points from the file using [`csv2geojson`](https://github.com/mapbox/csv2geojson) package by Mapbox. You can also define your own Mapbox API key as does this template repo in your github secrets section.

## Local hosting

Tu run locally, ensure `yarn` is installed. Then:
1. Clone this repository
2. Run `yarn`
3. Run `yarn start`

Then visit `http://localhost:3000` to see the running application.

## Technical notes

* `react-scripts` locked to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).
