exports.get = (req, res) => {
  res.render('signup' , { layout:'login_signup', title : 'signup ' , 
  js:['collectData', 'signup'], css: ['signup']})
}