const getData = require('./../database/queries/getData');

exports.get = (req, res) => {
  getData.getProposals(1).then((result) => {
    res.render('home', {
      proposals: result.rows,
      js: ['home'],
      layout: 'main',
      css: ['home'],
      title: 'home',
    });
  });
};
