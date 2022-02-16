FROM rstudio/r-base:4.0-focal

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    # required for plumber
    libsodium-dev \ 
    libssl-dev \
    libudunits2-dev \
    netcdf-bin

# RUN apt-get install -y r-cran-devtools r-cran-sf r-cran-plumber

RUN R -e 'install.packages(c("plumber"), repos="http://cran.us.r-project.org")'
# RUN R -e 'devtools::install_github("ATFutures/geoplumber")'

# add node/npm
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm install --global yarn

ADD . /app

# build
WORKDIR /app
RUN yarn 
RUN yarn run build-local
RUN rm -rf node_modules

EXPOSE 8000

ENTRYPOINT ["R", "-e", "setwd('/app'); plumber::plumb('R/plumber.R')$run(host='0.0.0.0',port=8000)"]
