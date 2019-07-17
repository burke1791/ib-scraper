const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

module.exports = function(app) {
  app.get('/api/scrape', (req, res, next) => {
    console.log('get articles hit');
    axios.get('https://illiniboard.com/').then(response => {
      var $ = cheerio.load(response.data);

      $('.hp_secondary_article h4').each((i, element) => {
        var result = {};

        result.title = $(this).children('a').text();

        console.log(result);
      });

      res.send(response.data);
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