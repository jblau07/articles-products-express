//modules
const express = require('express');
const handlebars = require('express-handlebars');
const articles = require('./routes/articles');
const products = require('./routes/products')

//constants
const PORT = process.env.PORT || 8080;
const bodyParse = require('body-parser');
const methodOverride = require('method-override');

const app = express();
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParse.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use('/articles', articles);
app.use('/products', products);

app.listen(8080, (err) => {
  if (err) { throw err; }
  console.log(`Server's up on port: ${PORT}`)
});
