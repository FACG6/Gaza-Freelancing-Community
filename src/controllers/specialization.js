const { getSpecalize } = require('../database/queries/getData');

module.exports = (req, res) => {
  const { categoryId } = req.body;
  getSpecalize(categoryId)
  .then((speclize) =>  res.status(200).send({ speclize }))
  .catch(() => res.status(400).send({ Error: 'Bad Request ...' }));
};
