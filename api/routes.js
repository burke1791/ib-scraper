const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

module.exports = function (app) {
  app.get('/api/scrape', (req, res, next) => {
    console.log('get articles hit');
    let url = 'https://illiniboard.com';
    axios.get(url).then(response => {
      var $ = cheerio.load(response.data);

      $('.hp_secondary_article').each(function (i, element) {
        var result = {};

        result.title = $(this).find('h4 a').text();
        result.link = url + $(this).find('h4 a').attr('href');
        result.summary = $(this).children('p').text();

        // console.log(result);
        insertIfNotDuplicate(result);
      });

      $('.hp_article_list_element').each(function (i, element) {
        var result = {};

        result.title = $(this).find('h4').text();
        result.link = url + $(this).find('h4 a').attr('href');
        result.summary = $(this).find('p').text();

        // console.log(result);
        insertIfNotDuplicate(result);
      })

      res.status(200).json({
        message: 'scrape complete'
      });
    });
  });

  app.get('/api/articles', (req, res, next) => {
    // get all articles from mongodb
    db.Article.find({}).then(articles => {
      res.json(articles);
    }).catch(error => {
      res.json(error);
    });
  });

  app.get('/api/articles/:id', (req, res, next) => {
    // get a single article by its id
  });

  app.post('/api/articles/:id', (req, res, next) => {
    // post the user's note to the article by its id
  });
}

const insertIfNotDuplicate = (article) => {
  db.Article.find({ title: article.title }).then(dbArticle => {
    console.log(dbArticle);
    if (dbArticle.length) {
      console.log('supposedly already exists - don\'t duplicate');
    } else {
      console.log('article doesn\'t already exists - insert into db');
      db.Article.create(article).then(insertedArticle => {
        console.log(insertedArticle);
      });
    }
  }).catch(error => {
    console.log(error);
  });
}