/* eslint-disable no-undef */
const handlers = require('./lib/handlers');
const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();

//configura o view engine Handlebars
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', handlers.home);

app.get('/about', handlers.about);

app.use(express.static(__dirname + '/public'));

// página 404 personalizada

app.use(handlers.notFound);

// página 500 personalizada

app.use(handlers.serverError);

if(require.main === module) {
  app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; Press Ctrl-C to terminate.`));
}else{
  module.exports = app;
}
