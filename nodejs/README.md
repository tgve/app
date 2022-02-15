## From NodeJS (using ExpressJS)

Similarly, to serve the application from a NodeJS process, we can use the example script in the `nodejs` folder. Remember, just like Flask and Plumber the static folder path is relative to the `process.cwd`. Therefore, to run the the application as it is:

1. Clone the repository
2. Build it `yarn && yarn run build`
3. Run the ExpressJS code: `cd nodejs && node server.js`

Visit `http://localhost:3000` to see the app.
