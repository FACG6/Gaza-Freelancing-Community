exports.get = (req, res) => {
  res.render('profile', {
    title: 'profile',
    css: ['profile'],
    layout: 'profile',
  });
};
