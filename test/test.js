<<<<<<< HEAD
const test = require('tape');

test('asd', (t) => {
  t.equal(1, 1, 'dfgd');
  t.end();
=======
const supertest = require('supertest');
const test = require('tape');
const router = require('../src/app');

test('Test Login route ', (t) => {
  supertest(router)
    .get('/login')
    .expect(200)
    .expect('content-type', /html/)
    .end((error, res) => {
      if (error) {
        t.error(error);
      }
      t.equal(typeof res.body, 'object', 'should return type of body object');
      t.end();
    });
>>>>>>> 644b1eb7243d1a2ed5288f56e1d4ead81e0be7ef
});
