require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ib_headlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, err => {
  if (err) throw err;
});

app.use(express.static(path.join(__dirname, 'client/build'))); // configure express to serve the React static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./api/routes')(app);

app.listen(PORT, function() {
  console.log('app listening on port: ' + PORT);
});