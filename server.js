require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client/build'))); // configure express to serve the React static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
  console.log('app listening on port: ' + PORT);
});