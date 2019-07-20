require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

console.log('mlab: ' + process.env.MONGOLAB_URI);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client/build'))); // configure express to serve the React static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./api/routes')(app);

app.listen(PORT, function() {
  console.log('app listening on port: ' + PORT);
});