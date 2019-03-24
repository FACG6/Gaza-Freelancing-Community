exports.notfound = (req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    statusCode: 404,
    ErrorMsg: 'Page not found',
    title: 'Error',
    imageUrl: 'https://cdn1.iconfinder.com/data/icons/internet-technology-and-security-2/128/77-512.png',
    css: ['error'],
  });
};

exports.serverError = (err, req, res, next) => {
  res.status(500).render('error', {
    layout: 'error',
    statusCode: 500,
    ErrorMsg: 'Internal server error',
    title: 'Error',
    imageUrl: 'https://cdn4.iconfinder.com/data/icons/seo-web-3-1/128/Vigor_internal-server-error-message-512.png',
    css: ['error'],
  });
};
