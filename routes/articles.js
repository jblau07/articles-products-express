const express = require('express');
const knex = require('../db/knex.js');
const handlebars = require('express-handlebars');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>bar</h1>')
});

module.exports = router;