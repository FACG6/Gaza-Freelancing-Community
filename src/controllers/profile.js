exports.get = (req, res) => {
  res.render('profile', {
    layout: 'profile',
    title: 'profile', // passing user name
    css: ['profile'],
  });
};
