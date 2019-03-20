const supertest = require('supertest');
const test = require('tape');
const router = require('../src/controllers');

test('Test Login route ', (t) => {
  supertest(router)
    .get('/login')
    .expect(200)
    .expect('content-type', /html/)
    .end((error, res) => {
      if (error) {
        t.error(error);
      }
      console.log(res);
    //   t.equal(typeof res.body, 'object', 'should return type of body object');
      t.end();
    });
});
