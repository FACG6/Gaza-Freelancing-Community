const jwt = require('jsonwebtoken')

exports.get = (request, response) => {
    response.render('login', {
      js: ['/helpers/collectData', 'login'],
      css: ['login'],
      layout: 'login_signup',
      title: 'Login | Gaza Freelancing Community',
    });
  };
  
  exports.post = (request,response)=>{
    const token = request.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,(error,decoded)=>{
            if(error){
                return res,
            }
        });
    }  
    res
  }