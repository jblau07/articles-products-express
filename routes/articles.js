const express = require('express');
const handlebars = require('express-handlebars');
const router = express.Router();
const db = require('../db/products')
const helpers = require('../helper')

router.get('/', (req, res) => {
  res.send('<h1>bar</h1>')
});

module.exports = router;