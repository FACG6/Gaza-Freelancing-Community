const { getProposal, getRequirement } = require('./../database/queries/getData');

exports.get = (request, response) => {
  const propId = request.url.split('/')[2];
  getProposal(propId)
    .then((result) => {
      const proposalId = result.rows[0].prop_id;
      if (proposalId) {
        getRequirement(proposalId)
          .then((res) => {
            const allProposal = {
              requirments: res.rows,
              proposal: result.rows[0],
            };
            return allProposal;
          })
          .then((propDesc) => {
            response.render('proposal', {
              requirment: propDesc.requirments,
              prop: propDesc.proposal,
              layout: 'main',
              css: ['proposal'],
              title: 'Proposal',
            });
          });
      }
    })
    .catch(() => {
      response.status(400).send({ Error: 'Bad Request' });
    });
};
