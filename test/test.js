const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/app');
const reBuildDB = require('../src/database/config/db_build');
const {
  addUser, addPost, addRequirment,
} = require('../src/database/queries/addData');
const {
  checkEmail,
  getProposals,
  getProposal,
} = require('./../src/database/queries/getData');

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
        t.deepEqual(result.header['set-cookie'], ['jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'], 'should return type of body object');
        t.end();
      }
    });
});

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
      mobile_number: '0599999599',
      email: 'ahmed@gmail.com',
      specalization_id: 1,
      freelancer_url: 'ww.ass.com',
      photo_url: 'www.hhhh.cs',
      password: '$2a$10$JF.SolNeqe3.Lax3pBlWROdujZ/YVzCfzwDJj/JOKskNoIHSpwzsW',
    }))
    .then((res) => {
      t.equal(res.rows[0].mobile_number, '0599999599', 'the mobile_number must be 0599999599');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});


tape('Test getProposal Query', (t) => {
  reBuildDB()
    .then(() => getProposals(1))
    .then((res) => {
      t.equal(res.rows[0].title, 'front-end develpoer', 'Should Return front-end develpoer');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});

tape('Test getProposal Query', (t) => {
  reBuildDB()
    .then(() => getProposals(30))
    .then((res) => {
      t.equal(res.rows[0], undefined, 'Should Return undefined');
      t.end();
    })
    .catch((errr) => {
      t.error(errr);
      t.end();
    });
});


tape('Test Proposal route', (t) => {
  supertest(router)
    .get('/proposal/1')
    .expect(200)
    .expect('content-type', /html/)
    .end((error, result) => {
      if (error) {
        t.error(error);
        t.end();
      }
      t.equal(typeof result.body, 'object', 'Should return type of body object');
      t.end();
    });
});

tape('Test Proposal route', (t) => {
  supertest(router)
    .get('/propposal/1')
    .expect(404)
    .expect('content-type', /html/)
    .end((err, result) => {
      if (err) {
        t.error(err);
        t.end();
      } else {
        t.equal(typeof result.body, 'object', 'Should return Page Not Found');
        t.end();
      }
    });
});

tape('Test getProposal query', (t) => {
  const proposal = {
    firstname: 'fatma',
    specalization_id: 1,
    lastname: 'siam',
    email: 'f.siam@gmail.com',
    freelancer_url: 'https://mm.mm.mmmmm',
    photo_url: 'https://mm.mm.mmmmm',
    mobile_number: '0599999999',
    name: 'web develpoer',
    title: 'front-end develpoer',
    description: 'we need a front-end developer to working at project',
    contact_me: 'f.siam@gmail.com',
  };
  reBuildDB()
    .then(() => getProposal(1))
    .then((result) => {
      t.deepEqual(result.rows[0], proposal, 'the first row should be not empty');
      t.end();
    })
    .catch((error) => {
      t.error(error);
      t.end();
    });
});


tape('testing Login Post Route For valid user ', (t) => {
  const userInfo = {
    email: 'f.siam@gmail.com',
    password: 'Asdf1234',
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/login')
      .send(userInfo)
      .expect(200)
      .end((err, res) => {
        if (err) {
          t.error(err);
          t.end();
        }
        t.equal(typeof res.body, 'object', ' Return typeof object ');
        t.equal(JSON.parse(res.text).success, 'Login Success', ' Return Success Message');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
  });
});

tape('testing Login Post Route For Invalid Eamil ', (t) => {
  const userInfo = {
    email: 'ff.siam@gmail.com',
    password: 'Asdf1234',
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/login')
      .send(userInfo)
      .expect(400)
      .end((err, res) => {
        if (err) {
          t.error(err);
          t.end();
        }
        t.equal((JSON.parse(res.text).error), 'Check Email ', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
  });
});


tape('testing Login Post Route For Error Password ', (t) => {
  const userInfo = {
    email: 'f.siam@gmail.com',
    password: 'Asdf123412',
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/login')
      .send(userInfo)
      .expect(400)
      .end((err, res) => {
        if (err) {
          t.error(err);
          t.end();
        }
        t.equal(JSON.parse(res.text).Error, 'No result', ' Return Error messeage');
        t.equal(JSON.parse(res.text).error, 'Check Password', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
  });
});

tape('test search \'get\' route ', (t) => {
  const userInfo = {
    inputvalue: 'front',
  };
  reBuildDB().then(() => {
    supertest(router)
      .get('/search')
      .post(userInfo)
      .expect(200)
      .end((err, res) => {
        if (err) {
          t.error(err);
          t.end();
        }
        t.equal(JSON.parse(res.text).title, 'front-end', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
  });
});
tape('test search \'get\' route For invalid value', (t) => {
  const userInfo = {
    inputvalue: 'Enter',
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/search')
      .send(userInfo)
      .expect(200)
      .end((err, res) => {
        if (err) {
          t.error(err);
          t.end();
        }
        t.equal(JSON.parse(res.text).Error, 'No result', ' Return Error messeage');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
  });
});


tape('test post create', (t) => {
  const prop = {
    title: 'web',
    decsription: 'desssc',
    specaliza_id: 1,
    requirments: ['111111', '22222'],
  };
  reBuildDB().then(() => {
    supertest(router)
      .post('/create-post')
      .send(prop)
      .end((err, res) => {
        if (err) {
          t.error(err);
          t.end();
        }
        t.equal(typeof res.body, 'object', 'return object');
        t.end();
      });
  }).catch((err) => {
    t.error(err);
    t.end();
  });
});
tape.onFinish(() => {
  process.exit(0);
});
