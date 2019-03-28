const { getProposalbyUserId } = require('../database/queries/getData');

exports.get = (req, res) => {
  const { id } = req.auth;
  const userinfo = req.auth;
  getProposalbyUserId(id)
    .then(({ rows: proposal }) => {
      if (proposal[0]) {
        res.render('profile', {
          layout: 'profile',
          title: 'profile',
          css: ['profile'],
          proposal,
          userinfo,
        });
      } else res.status(400).send('Bad Request ');
    })
    .catch(() => {
      res.status(400).send('Bad Request ');
    });
};
