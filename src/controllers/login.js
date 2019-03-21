exports.get = (request, response) => {
  response.render('login', {
    js: ['collectData', 'login'],
    css: ['login'],
    layout: 'login_signup',
    title: 'Login | Gaza Freelancing Community',
  });
};

exports.post = (request, response) => {
  console.log('jjjjj');
  
  // console.log(request.body);
  const {email, password} = request.body;
  console.log(email);
  

};
