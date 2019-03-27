const { getPropsalsbyValue } = require('../database/queries/getData');

exports.search = (req, res) => {
  const { inputvalue } = { ...req.body };
  const { specalization_id: specId } = { ...req.auth };
  getPropsalsbyValue(specId, inputvalue)
    .then(({ rows: proposal }) => {
      if (proposal[0]) {
        res.status(200).send({ success: 'The result ', result: proposal });
        res.redirect('/', { proposals: proposal });
      } else {
        res.status(400).send({ Error: 'No result' });
      }
    })
    .catch(() => res.status(400).send({ Error: 'Bad Request' }));
};
