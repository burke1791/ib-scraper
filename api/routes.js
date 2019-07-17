const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models');

module.exports = function(app) {
  app.get('/api/scrape', (req, res, next) => {
    axios.get('https://illiniboard.com/').then(response => {
      var $ = cheerio.load(response.data);

      // parse articles
    });
  });

  app.get('/api/articles', (req, res, next) => {
    // get all articles from mongodb
  });

  app.get('/api/articles/:id', (req, res, next) => {
    // get a single article by its id
  });

  app.post('/api/articles/:id', (req, res, next) => {
    // post the user's note to the article by its id
  });
}