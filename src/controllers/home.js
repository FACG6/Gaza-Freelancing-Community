exports.get =(req,res)=>{
    res.render('home',{
        js:['helpers/Home','home'],
        layout:'main',
    })
}