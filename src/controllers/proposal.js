
exports.get = (request, response) => {
  response.render('proposal', {
    layout: 'main',
    css: ['proposal'],
    title: 'Proposal',
  });
};
