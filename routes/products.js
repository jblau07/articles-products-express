const express = require('express');
const handlebars = require('express-handlebars');
const router = express.Router();
const db = require('../db/products')
const helpers = require('../helper')

router.get('/new', (req, res) => {
  return res.render('new');
})

.get('/:id/edit', (req, res) => {
    let id = req.params.id;
    let elemIndex = db.findItem(id);
    res.render('partials/edit', elemIndex)
  })

  .get('/:id', (req, res) => {
    let id = req.params.id;
    let elemIndex = db.findItem(id);
    console.log(elemIndex);
    res.render('partials/products', elemIndex);
  })

  .get('/', (req, res) => {
    return res.render('index', {
      db: db.getAll()
    })
  })
  .post('/', (req, res) => {
    let body = req.body

    const data = {
      name: body.name,
      price: Number(body.price),
      inventory: Number(body.inventory)
    }
    const val = helpers.validateProduct(data);

    if (val === true) {
      db.createProduct(data);
      res.redirect('/products')
    } else {
      // res.send(val);
      res.redirect('/products/new')
    }
  })

  .put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    const valPut = helpers.validatePut(body);

    if (valPut === true) {
      let editItem = helpers.edit(id, body);
      if (editItem === true) {
        res.redirect(`/products/${id}`)
      } else {
        res.redirect(`/products/${id}/edit`)
      }
    } else {
      res.redirect(`/products/${id}/edit`)
    }
  })

module.exports = router;