const express = require('express');
const expressHandlebars = require('express-handlebars');
const fortune = require('./lib/fortune');

const app = express();

//configura o view engine Handlebars
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render(__dirname + '/views/layouts/' + 'home');
});

app.get('/about', (req, res) => {
  res.render(__dirname + '/views/layouts/' + 'about', {fortune: fortune.getFortune()});
});

app.use(express.static(__dirname + '/public'));

// página 404 personalizada

app.use((req, res) => {
  res.status(404);
  res.render(__dirname + '/views/layouts/' + '404');
});

// página 500 personalizada

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500);
  res.render(__dirname + '/views/layouts/' + '500');
});

app.listen(port, () => console.log(
  `Express started on http://localhost:${port};`
  + ` Press Ctrl-C to terminate.`
));

