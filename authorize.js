const authorize =(req,res,next) => {
    var usn = req.body.username;
    var pwn = req.body.password;
    if(usn=="atom"&&pwn=="atom"){
        console.log('authorization request received');
        next();
    }else{
        res.status(403).send("Forbidden");        
    }   
    
}

module.exports = authorize;