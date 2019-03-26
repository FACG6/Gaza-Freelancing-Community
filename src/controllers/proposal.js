const getProposal = require('./../database/queries/getData');

exports.get = (request, response) => {
  const specId = request.url.split('/')[2];
  getProposal.getProposal(specId).then((result) => {
    const proposal = result.rows[0];
    const requierment = result.rows[0];
    response.render('proposal', {
      proposal,
      requierment,
      layout: 'main',
      css: ['proposal'],
      title: 'Proposal',
    });
  })
    .catch(() => response.status(400).send({ Error: 'Bad Request' }));
};
