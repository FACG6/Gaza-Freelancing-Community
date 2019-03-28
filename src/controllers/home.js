const getData = require('./../database/queries/getData');

exports.get = (req, res) => {
  const userinfo = req.auth;
  getData.getProposals(1).then(({ rows: result }) => {
    if (result[0]) {
      res.render('home', {
        proposals: result,
        js: ['helpers/collectData', 'home'],
        layout: 'main',
        css: ['home'],
        title: 'home',
        userinfo,
      });
    } else {
      res.status(400).send({ Error: 'Bad Request' });
    }
  }).catch(() => {
    res.status(400).send({ Error: 'Bad Request' });
  });
};
