const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/app');
const reBuildDB = require('../src/database/config/db_build');

tape('test signup \'GET\' route ', (t) => {
  supertest(router)
    .get('/signup')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
        t.end();
      } else {
        t.equal(typeof res.body, 'object', 'should return type of body object');
        t.end();
      }
    });
});
tape('test signup \'GET\' route ', (t) => {
  supertest(router)
    .get('/signup1')
    .expect(404)
    .expect('content-type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      }
      t.equal(typeof res.body, 'object', 'should return type of body object');
      t.end();
    });
});

tape('test signup \'POST\' route ', (t) => {
  const userInfo = {
    firstSection: {
      firstname: 'Fatma',
      lastname: 'siam',
      mobile_number: '0599559999',
      email: 'ffs.siam@gmail.com',
    },
    secondSection: {
      specalization_id: 1,
      freelancer_url: 'https://github.com/fatma',
      photo_url: 'https://www.iconspng.com/image/36709/face-avatar-man-male-handsome-3.jpg',
    },
    thirdSection: {
      password: 'Aa123%fgfg',
    },
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/signup')
      .send(userInfo)
      .expect(201)
      .end((err, res) => {
        if (err) {
          t.error(err);
        }
        t.equal(typeof res, 'object', 'should return  object');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
  });
});

tape('test signup \'POST\' route ', (t) => {
  const userInfo = {
    firstSection: {
      firstname: 'Fatma',
      lastname: 'siam',
      mobile_number: '0599999999',
      email: 'ff.siam@gmail.com',
    },
    secondSection: {
      specalization_id: 1,
      freelancer_url: 'https://github.com/fatma',
      photo_url: 'https://www.iconspng.com/image/36709/face-avatar-man-male-handsome-3.jpg',
    },
    thirdSection: {
      password: 'Aa123%fgfg',
    },
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/signup')
      .send(userInfo)
      .expect(400)
      .end((err, res) => {
        if (err) {
          t.error(err);
        }
        t.equal(JSON.parse(res.text).Error, ' This Mobile :  0599999999 is already register', 'should return  the mobile valid');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
  });
});

tape('test signup \'POST\' route ', (t) => {
  const userInfo = {
    firstSection: {
      firstname: 'Fatma',
      lastname: 'siam',
      mobile_number: '0599339999',
      email: 'f.siam@gmail.com',
    },
    secondSection: {
      specalization_id: 1,
      freelancer_url: 'https://github.com/fatma',
      photo_url: 'https://www.iconspng.com/image/36709/face-avatar-man-male-handsome-3.jpg',
    },
    thirdSection: {
      password: 'Aa123%fgfg',
    },
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/signup')
      .send(userInfo)
      .expect(400)
      .end((err, res) => {
        if (err) {
          t.error(err);
        }
        t.equal(JSON.parse(res.text).Error, ' This Email :  f.siam@gmail.com is already register', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
  });
});


tape('test signup \'POST\' route ', (t) => {
  const userInfo = {
    firstSection: {
      firstname: 'Fatma',
      lastname: 'siam',
      mobile_number: '0599999999',
      email: 'ff.siam@gmail.com',
    },
    secondSection: {
      specalization_id: 1,
      freelancer_url: 'https://github.com/fatma',
      photo_url: 'https://www.iconspng.com/image/36709/face-avatar-man-male-handsome-3.jpg',
    },
    thirdSection: {
      password: 'Aa123%fgfg',
    },
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/signup')
      .send(userInfo)
      .expect(400)
      .end((err, res) => {
        if (err) {
          t.error(err);
        }
        t.equal(JSON.parse(res.text).Error, ' This Mobile :  0599999999 is already register', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
  });
});

tape.onFinish(() => {
  process.exit(0);
});
