const fortune = require('./fortune');
exports.home = (req, res) => res.render('../views/layouts/' + 'home');
exports.about = (req, res) => res.render('../views/layouts/' + 'about', {fortune: fortune.getFortune()});
exports.notFound = (req, res) => res.render('../views/layouts/' + '404');
// eslint-disable-next-line no-unused-vars
exports.serverError = (err, req, res, next) => res.render('../views/layouts/' + '500');

