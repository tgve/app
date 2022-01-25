# tgve/app [![Deploy to github pages](https://github.com/layik/eatlas-template/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/layik/eatlas-template/actions/workflows/gh-pages.yml) [![npm version](https://badge.fury.io/js/eatlas.svg)](https://badge.fury.io/js/eatlas)

This is a template repository which makes it easy to host your own instance of the Turing Geo-visualization Engine (TGVE) on your fork's GitHub Pages. To achieve this, follow these three steps:

1. Create repo from this template
> <img width="50%" style="border:1px solid" alt="Use this template button in green" src="https://user-images.githubusercontent.com/408568/109291248-a8ba4b80-7820-11eb-9054-5b8fb6f38f82.png">
You should now have an instance at `https://github.com/USER_OR_ORG/FORK_REPO_NAME`

2. Edit the data URL in `gh-pages.yml` with [URL](https://github.com/layik/eatlas-template/blob/main/.github/workflows/gh-pages.yml#L34) of your dataset. So replace `https://raw.githubusercontent.com/layik/eatlas-data/main/casualties.csv` with your data URL. This is where we pass `REACT_APP_DEFAULT_URL` or `defaultURL` variable to eAtlas.

3. As you fork the repo and whether you follow step (2) or not, the defined actions in `.github/workflows` will be executed by GitHub. Once a first build is done, it will create a separate branch to your `main` branch called `gh-pages`. Go ahead and enable gh-pages by assigning branch `gh-pages` and `root` as the directory as shown below from your fork's settings:
> <img width="60%" style="border:1px solid" alt="Setup github pages" src="https://user-images.githubusercontent.com/408568/109220743-39f1d980-77b1-11eb-9bd0-4b5e183854d5.png">

You should now have an instance at `https://USER_OR_ORG.github.io/FORK_REPO_NAME`. Note that publishing to GitHub Pages may take some time.

What did we do? The repo you set up has a branch called `gh-pages` which GitHub uses to serve. The GitHub Actions workflows generate a
production-ready app which pulls data from the link added in step (2). The following screenshot shows a repo with owner “layik” and repository
name “eAtlas”. Your new instance will replace these two values with appropriate information obtained from via GitHub API.

<img width="50%" alt="guide-shot" src="https://user-images.githubusercontent.com/408568/108049506-44d59d00-7040-11eb-9f4e-0a083829bfa5.png">

In step (2) the template includes point data with geography defined in the columns. eAtlas is able to parse the CSV file and pull out the points from the file using [`csv2geojson`](https://github.com/mapbox/csv2geojson) package by Mapbox. You can also define your own Mapbox API key as does this template repo in your github secrets section.

## Separate geography source

Many people do not have ready to consume (`GeoJSON`) data or CSV of point data. To support a separately-provided geography data source, eAtlas expects a CSV and geography (in GeoJSON). Other formats as data source are currently unsupported. 

To pass the data and geography URLs to the React app, follow the same three steps above, except in (2):

Replace `https://raw.githubusercontent.com/layik/eatlas-data/main/casualties.csv` with your data URL which does not have geography. Additionally, add two or or more environmental variables. That is, the `.github/workflows/gh-pages.yml` would look like:

```yml
...
  REACT_APP_DEFAULT_URL: https://yourdata.url/data.csv 
  REACT_APP_GEOGRAPHY_URL: https://geography.url/geo.json
  REACT_APP_GEOGRAPHY_COLUMN_NAME: GEO_COLUMN_NAME
  REACT_APP_COLUMN_NAME: VIS_COLUMN_NAME
...
```

Checkout the `src/App.js` file to see how you can pass these variables to the React eAtlas component. Check out the [eAtlas](https://github.com/layik/eAtlas) repo guide notes for more about these variables.

## Run locally (dev)
This is a [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) and you can run it locally. You would need NodeJS and either yarn or npm [setup](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). If you have those setup on your system then:
1. Cloning this repository
2. Running `yarn`
3. and `yarn start`

Then visit `http://localhost:3000` to see the running application.

## Notes

### Technical

* Locked react-scripts version to `3.4.4` due to a `url-loader` [issue](https://github.com/facebook/create-react-app/issues/9870).
