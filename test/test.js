const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/app');
const reBuildDB = require('../src/database/config/db_build');
const { addUser } = require('../src/database/queries/addData');
const { checkEmail } = require('./../src/database/queries/getData');

tape('Test checkEmail query function if there is email match with income email', (t) => {
  reBuildDB()
    .then(() => checkEmail('aa.gmail.com'))
    .then((result) => {
      t.equal(result.rows[0], undefined, 'the first row should be empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
      t.end();
    });
});

tape('test add user for mobile number', (t) => {
  reBuildDB()
    .then(() => addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: '12345',
      email: 'ahmed@gmail.com',
      specalization_id: 1,
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].mobile_number, '12345', 'the mobile_number must be 1234512345');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

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
        t.end();
      } else {
        t.equal(typeof res.body, 'object', 'should return type of body object');
        t.end();
      }
    });
});


tape('test signup \'POST\' route ', (t) => {
  const userInfo = {
    firstSection: {
      firstname: 'Fatma',
      lastname: 'siam',
      mobile_number: '0529999999',
      email: 'ffs.siam@gmail.com',
    },
    secondSection: {
      specalization_id: 1,
      freelancer_url: 'https://github.com/fatma',
      photo_url: 'https://www.iconspng.com/image/36709/face-avatar-man-male-handsome-3.jpg',
    },
    thirdSection: { password: 'Aa123%fgfg' },
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/signup')
      .send(userInfo)
      .expect(201)
      .end((err, res) => {
        if (err) t.error(err);
        else t.equal(typeof res.body, 'object', 'should return  object');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
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
          t.end();
        }
        t.equal(JSON.parse(res.text).Error, 'Already Used', 'should return  the mobile valid');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
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
          t.end();
        }
        t.equal(JSON.parse(res.text).Error, 'Already Used', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
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
          t.end();
        }
        t.equal(JSON.parse(res.text).Error, 'Already Used', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
  });
});


tape('Test checkEmail query function if there is no email match with income email', (t) => {
  reBuildDB()
    .then(() => checkEmail('f.siam@gmail.com'))
    .then((result) => {
      t.equal(result.rows[0].email, 'f.siam@gmail.com', 'the first row should be not empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
      t.end();
    });
});

tape('test add user for firstname', (t) => {
  reBuildDB()
    .then(() => addUser({
      firstname: 'Ahmed',
      lastname: 'Alami',
      mobile_number: '12345454',
      email: 'ahmmmmed@gmail.com',
      specalization_id: 1,
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].firstname, 'Ahmed', 'must be Ahmed');
      t.end();
    }).catch((err) => {
      t.error(err);
      t.end();
    });
});

tape('test add user for lastname', (t) => {
  reBuildDB()
    .then(() => addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: '1234567891',
      email: 'ahmed@gmail.com',
      specalization_id: 1,
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].lastname, 'Elalmi', 'must be Elalmi');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('test add user for mobile number', (t) => {
  reBuildDB()
    .then(() => addUser({
      firstname: 'Ahmed',
      lastname: 'Elalmi',
      mobile_number: '12345',
      email: 'ahmed@gmail.com',
      specalization_id: 1,
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].mobile_number, '12345', 'the mobile_number must be 1234512345');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape.onFinish(() => {
  process.exit(0);
});
