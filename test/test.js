const supertest = require('supertest');
const tape = require('tape');
const router = require('../src/app');

tape('Test logout router', (t) => {
  supertest(router)
    .get('/logout')
    .expect(302)
    .expect('content-type', 'text/plain; charset=utf-8')
    .end((err, result) => {
      if (err) {
        t.error(err);
        t.end();
      } else {
        t.equal(typeof result.body, 'object', 'should return type of body object');
        t.end();
      }
    });
});

tape('Test logout router', (t) => {
  supertest(router)
    .get('/logouft')
    .expect(404)
    .expect('content-type', /html/)
    .end((err, result) => {
      if (err) {
        t.error(err);
        t.end();
      } else {
        t.equal(typeof result.body, 'object', 'should return page not found');
        t.end();
      }
    });
});
