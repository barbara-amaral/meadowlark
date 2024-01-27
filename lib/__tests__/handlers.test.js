const handlers = require('../handlers');

test('home page renders', () => {
  const req = {}; //objeto vazio de req
  const res = { render: jest.fn() }; // método de renderização na resposta
  handlers.home(req, res); // chamando handlers.home
  // asserções
  expect(res.render.mock.calls.length).toBe(1); // foi chamada apenas uma vez?
  //primeiro índice da array especifica a chamada e o segundo especifica o argumento
  expect(res.render.mock.calls[0][0]).toBe('../views/layouts/home'); // foi chamada com a home em seu primeiro argumento?
});

test('about page renders with fortune', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.about(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('../views/layouts/about');
  // espera a chamada do método render conter um objeto fortune com uma string que contenha pelo menos um caractere
  expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({fortune: expect.stringMatching(/\W/)},));
});

test('404 handler renders', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('../views/layouts/404');
});

test('500 handler renders', () => {
  const err = new Error('some error');
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('../views/layouts/500');
});