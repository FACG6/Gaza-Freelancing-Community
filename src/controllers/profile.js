const { getProposalbyUserId } = require('../database/queries/getData');

exports.get = (req, res) => {
  getProposalbyUserId(1)
    .then(({ rows: proposal }) => {
      res.render('profile', {
        layout: 'profile',
        title: 'profile', 
        css: ['profile'],
        proposal: proposal[0],
      });
    })
    .catch(() => {
      res.status(400).send('Bad Request ');
    });
};
