const express = require('express');
const knex = require('../db/knex.js');
const handlebars = require('express-handlebars');
const router = express.Router();
const helpers = require('../helper')

router.get('/new', (req, res) => {
    return res.render('new');
  })

  .get('/:id/edit', (req, res) => {

    let productId = req.params.id;

    return knex('products')
      .where({
        id: productId
      })
      .select()
      .then(result => {
        if (result.length) {
          return result
        } else {
          throw new Error('Product not found')
        }
      })
      .then(result => {
        console.log(result)
        res.render('partials/edit', result[0])
      })
      .catch(err => {
        return res.redirect('/products')

      })
  })

  .get('/:id', (req, res) => {
    let productId = req.params.id;

    return knex('products')
      .where({
        id: productId
      })
      .select()
      .then(result => {
        if (result.length) {
          return result
        } else {
          throw new Error('Product not found')
        }
      })
      .then(result => {
        res.render('partials/products', result[0])
      })
      .catch(err => {
        return res.redirect('/products')

      })
  })

  .get('/', (req, res) => {
    return knex('products')
      .select()
      .then(result => {
        console.log(result)
        return res.render('index', {
          product: result
        })
      })
  })

router.post('/', (req, res) => {
  let body = req.body

  const data = {
    name: body.name,
    price: Number(body.price),
    inventory: Number(body.inventory)
  }
  const val = helpers.validateProduct(data);

  if (val === true) {
    return knex('products')
      .insert(data)
      .then(result => {
        res.redirect('/products')
      })
      .catch(err => {
        res.status(400).json({
          message: 'Bad request'
        })
      })
  } else {
    res.json('error');
    // res.send(val);
    res.redirect('/products/new')
  }
})
router.put('/:id', (req, res) => {
    let data = {
      name,
      price,
      inventory
    } = req.body;
    let productId = req.params.id;

    return knex('products').where('id', productId).update({
        name: data.name,
        price: data.price,
        inventory: data.inventory,
      }, '*')
      .then(result => {
        return res.redirect(`/products/${productId}`);
      })
      .catch(err => {
        return res.redirect(`/products/${productId}/edit`);
      })
  })

  .delete('/:id', (req, res) => {
    let productId = req.params.id;

    return knex('products')
      .where({
        id: productId
      })
      .select()
      .then(result => {
        if (result.length) {
          return result;
        } else {
          throw new Error('Product not found in database')
        }
      })
      .then(result => {
        knex('products')
          .delete()
          .where({
            id: productId
          })
          .then(result => {
            res.redirect(`/products`)
          })
      })
      .catch(err => {
        res.redirect(`/products/${productId}`)
      })
  })


module.exports = router;