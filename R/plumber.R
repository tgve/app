#' plumber 1.1.0

# CORSE can be enabled in plumber like following
#' for disabling it for any endpoint we want in future
#' https://www.rplumber.io/docs/security.html#cross-origin-resource-sharing-cors
#' @filter cors
# cors <- function(res) {
#   res$setHeader("Access-Control-Allow-Origin", "*")
#   plumber::forward()
# }
# TODO: option to remove above CORS

#'
#' @param msg The message to echo
#' @get /api/helloworld
#' @get /api/helloworld/
function(msg="nothing given"){
  list(msg = paste0("The message is: '", msg, "'"))
}

#' Tell plumber where our public facing directory is to SERVE.
#' No need to map / to the build or public index.html. This will do.
#' plumber1.0 working directory is current file's parent.
#'
#' @assets ../build /
list()
