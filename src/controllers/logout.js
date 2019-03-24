module.exports = (request, response) => {
  response.clearCookie('jwt');
  response.redirect('/login');
};
