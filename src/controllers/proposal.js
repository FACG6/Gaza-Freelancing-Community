const { getProposal, getRequirement } = require('./../database/queries/getData');

exports.get = (request, response, next) => {
  const propId = request.url.split('/')[2];
  getProposal(propId)
    .then((result) => {
      const requiermentId = result.rows[0].prop_id;
      getRequirement(requiermentId)
        .then((res) => {
          const allProposal = {
            allRrequiermen: res.rows,
            proposal: result.rows[0],
          };
          return allProposal;
        })
        .then((proposalInfo) => {
          response.render('proposal', {
            requirment: proposalInfo.allRrequiermen,
            prop: proposalInfo.proposal,
            layout: 'main',
            css: ['proposal'],
            title: 'Proposal',
          });
        })
        .catch(() => response.status(400).send({ Error: 'Bad Request' }));
    })
    .catch(() => {
      response.status(400).send({ Error: 'Bad Request' });
      next();
    });
};
