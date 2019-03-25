const getProposal = require('./../database/queries/getData');

// console.log('ppppppppppp', getProposal.getProposal);

exports.get = (request, response) => {
  // console.log(4444444444444, request.url.split('/')[2]);
  const specId = request.url.split('/')[2];
  getProposal.getProposal(specId).then((result) => {
    console.log('kkkkkkkkkk', result.rows[0]);
    const proposal = result.rows[0];
    response.render('proposal', {
      proposal,
      layout: 'main',
      css: ['proposal'],
      title: 'Proposal',
    });
  })
    .catch(err => console.log('jjjjjjjjjjjjjjjjjj', err));
};
