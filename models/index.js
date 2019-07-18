const connection = require('../connection');

// exports all models from one file so the api only needs to import from "./models"
module.exports = {
  Article: require('./article'),
  Note: require('./note')
}