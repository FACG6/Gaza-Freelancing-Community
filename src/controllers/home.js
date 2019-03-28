const getData = require('./../database/queries/getData');

exports.get = (req, res) => {
  getData.getProposals(1).then(({ rows: result }) => {
    if (result[0]) {
      res.render('home', {
        proposals: result,
        js: ['home'],
        layout: 'main',
        css: ['home'],
        title: 'home',
      });
    } else {
      res.status(400).send({ Error: 'Bad Request' });
    }
  }).catch(() => {
    res.status(400).send({ Error: 'Bad Request' });
  });
};
