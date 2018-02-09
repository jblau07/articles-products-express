const express = require('express');
const knex = require('../db/knex.js');
const handlebars = require('express-handlebars');
const router = express.Router();

router.get('/new', (req, res) => {
  return res.render('new_articles');
})

router.get('/:title/edit', (req, res) => {
  let titleId = req.params.title;

  return knex('articles')
    .where('title', titleId)
    .select()
    .then(result => {
      return res.render('partials/edit_article', result[0])
    })
    .catch(err => {
      return res.redirect('/articles')
    })
})

router.get('/:title', (req, res) => {
  let titleId = encodeURI(req.params.title);
  
  return knex('articles')
  .where('urlTitle', titleId)
  .select()
  .then(result => {
    
    console.log(titleId);
      return res.render('partials/articles', result[0])
    })
    .catch(err => {
      return res.redirect('/articles')
    })
})

router.get('/', (req, res) => {
  return knex('articles')
    .select()
    .then(result => {
      return res.render('index_articles', {
        article: result
      })
    })
})
router.post('/', (req, res) => {
  let data = {
    title,
    body,
    author
  } = req.body;

  data.urlTitle = encodeURI(req.body.title);
  console.log(data.urlTitle)

  return knex('articles')
    .insert(data)
    .then(result => {
      res.redirect('/articles');
    })
    .catch(err => {
      return res.status(500).json({
        message: err.message
      });
    });
});

router.put('/:title', (req, res) => {
  let data = {
    title,
    body,
    author
  } = req.body;
  data.urlTitle = encodeURI(req.body.title);

  return knex('articles')
    .where('urlTitle', data.urlTitle)
    .update({
      title: data.title,
      body: data.body,
      author: data.author
    }, '*')
    .then(result => {
      res.redirect(`/articles/${data.urlTitle}`)
    })
    .catch(err => {
      res.redirect(`/articles/${data.urlTitle}/edit`)
    })
})

router.delete('/:title', (req, res) => {
  let titleId = encodeURI(req.params.title);
    console.log('title',titleId)

  return knex('articles')
    .where({
      urlTitle: titleId
    })
    .select()
    .then(result => {
      if (result.length) {
        return result
      } else {
        throw new Error('Article not found in database')
      }
    })
    .then(result => {
      return knex('articles')
        .delete()
        .where({
          urlTitle: titleId
        })
        .then(result => {
          return res.redirect('/articles')
        })
        .catch(err => {
          return  res.redirect(`/articles/${titleId}`)
        })
    })

})

module.exports = router;