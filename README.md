[![Deploy to github pages](https://github.com/tgve/app/actions/workflows/build-deploy.yml/badge.svg)](https://github.com/tgve/app/actions/workflows/build-deploy.yml)
[![npm version](https://badge.fury.io/js/@tgve%2Ftgvejs.svg)](https://badge.fury.io/js/@tgve%2Ftgvejs)

This repo both hosts a deployed instance of [TGVE](https://github.com/tgve/tgvejs) on GitHub Pages, and acts as a template that you can use to deploy your own instance.

## Deployed latest version

The latest release is deployed at https://tgve.github.io/app. You can pass your own geospatial data URL as `defaultURL=url` parameter as follows:

```sh
https://tgve.github.io/app?defaultURL=https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson
```

You should see something like:

<img width="90%" src="https://user-images.githubusercontent.com/408568/145040206-7eb1b342-0898-45f6-afa7-5978ddd87dc5.png" alt="customise remote instnace" />


Likewise, you can embed it in an `iframe` as follows (this document is restricted to certain HTML elements, excluding `iframe`):
```html
<iframe srce="https://tgve.github.io/app" />
```

See the [example notebook](Python/jupyter-tgve.ipynb) for how to embed the application into a Jupyter notebook.

## Hosting your own instance

With this template repository, it is easy to host your own instance of the Turing Geo-visualization Engine (TGVE), via GitHub Pages. To achieve this, follow these three steps:

1. Create repo from this template
> <img width="100%" style="border:1px solid" alt="Use this template button in green" src="https://user-images.githubusercontent.com/408568/109291248-a8ba4b80-7820-11eb-9054-5b8fb6f38f82.png">
You should now have a copy (not fork) of the repo at `https://github.com/USER_OR_ORG/YOUR_REPO_NAME`. The actions may not start running at this stage. In the next step we will make sure this happens.

2. Edit `REACT_APP_DEFAULT_URL` in [`build-deploy.yml`](.github/workflows/build-deploy.yml) with the URL of your dataset. To pass separate data and geography URLs, use `REACT_APP_GEOGRAPHY_URL`, `REACT_APP_GEOGRAPHY_COLUMN` and `REACT_APP_COLUMN`, as described [here](https://github.com/tgve/tgvejs). Check out [`src/App.js`](src/App.js) to see how you can pass these variables to the TGVE React component.

3. The GitHub Actions defined in `.github/workflows` are responsible for building and deploying the app. Once the first build is complete, it will create a separate branch called `gh-pages`. Enable deployment to GitHub Pages by set `gh-pages` as the branch and `root` as the directory in your repo's GitHub Pages settings:
> <img width="100%" style="border:1px solid" alt="Setup github pages" src="https://user-images.githubusercontent.com/408568/109220743-39f1d980-77b1-11eb-9bd0-4b5e183854d5.png">

You should now have an instance at `https://USER_OR_ORG.github.io/YOUR_REPO_NAME`. Note that publishing to GitHub Pages may take some time.

What did we do? The repo now has a branch called `gh-pages` which GitHub uses to serve the app; the app will pull data from the link added in step (2). The following screenshot shows a repo with owner “layik” and repository name “eAtlas”:

<img width="100%" alt="guide-shot" src="https://user-images.githubusercontent.com/408568/108049506-44d59d00-7040-11eb-9f4e-0a083829bfa5.png">

The example data file includes point data with geography defined in the columns. TGVE is able to extract the points from the CSV file using the [`csv2geojson`](https://github.com/mapbox/csv2geojson) package from Mapbox. You can set your own Mapbox API key by providing `MAPBOX_KEY` as a GitHub secret; see `REACT_APP_MAPBOX_ACCESS_TOKEN` in [`build-deploy.yml`](.github/workflows/build-deploy.yml).

## Local hosting

To run locally, ensure `yarn` is installed. Then:
1. Clone this repository
2. Run `yarn`
3. Run `yarn start`

Then visit `http://localhost:3000` to see the running application.

## Serving the app from R or Python

See the following `README`s for documentation.

- [Python (using Flask)](../Python/)
- [R (using Plumber)](../R/)

## Technical notes

* `react-scripts` locked to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).
