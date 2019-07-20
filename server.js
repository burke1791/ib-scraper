require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3001;
const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/ib_headlines";

mongoose.connect(mongodbUri, { useNewUrlParser: true, useMongoClient: true }, err => {
  if (err) console.log(err);
});

var connection = mongoose.connection;

app.use(express.static(path.join(__dirname, 'client/build'))); // configure express to serve the React static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./api/routes')(app);

connection.once('open', function() {
  console.log('mongo connection established');
  app.listen(PORT, function() {
    console.log('app listening on port: ' + PORT);
  });
});