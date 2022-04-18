


function cookieAuthMiddleware (req , res , next ){
   next();
   if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined){
    
      let users = usersModel.readFile(); //en users cargamos todos los usuarios que tenemos como un array
      for (let i=0 ; i< users.length; i++){   //pasamos por todo este array para ver si alguno coincide con el enviado por el usuario a logearse
         if( users[i].email == req.cookies.rememberMe){
               var userToLogin = users[i];  //si alguna coincide mostramos el usuario
               break;
            }
         }        
      }
   }