var express = require('express');
var app = express();
const port = 3000

//see the docs 
// https://expressjs.com/en/starter/static-files.html
app.use(express.static('../build')); //Serve static files in root

app.get('/api/hi', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`TGVE app listening at http://localhost:${port}`)
})