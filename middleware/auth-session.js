var session = require('express-session');

const authorize =(req,res,next) => {
    //console.log(req.session.usnid);
    if(req.session.usnid){
        next();
    }else{
        res.redirect('/login')
    }    
    
}

module.exports = authorize;