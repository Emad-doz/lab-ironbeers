const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers',(req, res) => {
    punkAPI.getBeers()
    .then(beersFromApi => {
      res.render('beers.hbs', { beersFromApi });
      console.log('Beers from the database: ', beersFromApi);
    })
    .catch(err => console.error(err));
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeer => {
      res.render('random-beers.hbs', { randomBeer });
    })
    .catch(err => console.error(err));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
