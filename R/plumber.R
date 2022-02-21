#' plumber 1.1.0

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
