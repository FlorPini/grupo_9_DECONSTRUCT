function authMiddleware(req, res, next){
    if(!req.session.userLogged){
        return res.redirect('/users/register');
    }
    next();
}

module.exports = authMiddleware;