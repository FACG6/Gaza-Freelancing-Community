const { specialization } = require('../database/queries/getData');

exports.post = (req, res) => {
  const sectionId = req.body.optionId;
  specialization(sectionId).then((special) => {
    res.status(200).send(JSON.stringify({ special }));
  }).catch(() => {
    res.status(400).send(JSON.stringify({ Error: 'Bad Request ...' }));
  });
};
