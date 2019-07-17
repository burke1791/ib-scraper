const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ib_headlines";

const connection = mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports = connection;