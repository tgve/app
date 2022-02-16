## Serving the app via R (using Plumber)

Plumber is an R web application framework.The script [serve.sh](./serve.sh) and related [Dockerfile](../Dockerfile.R) document how to serve TGVE as a Plumber app.

To run the app in R, run `run.R` and you should have the `R/plumber.R` API up and running serving the `build` folder of the front end.

See the [TGVE docs](../../tgvejs/) for how to pass data endpoints to TGVE.
