const jsonTable= require("../database2/jsonTable");
const usersModel = jsonTable ("users")


function userLoggedMiddleware(req, res, next){
    
    res.locals.isLogged = false;   //enviamos a la variable local isLogged, el valor falso, esto al estar en una meddleware que traviesa toda la aplicacion va a llegar a todas las vistas
    
    //en el controlador mandamos a las cookies el valor del email del usuario que se loggeo, y que tildo recordarme
    //luego con ese email buscamos en la base de datos, si lo encuentra le carga los datos del usuario a userFromCookies
    let userFromCookie = usersModel.findByField('email' , req.cookies.userEmail);  
    
    if (userFromCookie) {                        //si existe un usuario que coincida, vamos a cargar sus datos en session, para que puedan ser usados por todo el sitio
		req.session.userLogged = userFromCookie;
	}

    if(req.session.userLogged){                 //si el usuario esta logeado 
        res.locals.isLogged=true;               //le enviamos el valor true de la variable isLogged a todas las vistas 
        res.locals.userLogged = req.session.userLogged; //enviamos a todas las vistas los datos del usuario logeado
    }
    

    next();
}

module.exports = userLoggedMiddleware;