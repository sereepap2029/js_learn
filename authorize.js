const authorize =(req,res,next) => {
    console.log('authorization request received');
    next();
}

module.exports = authorize;