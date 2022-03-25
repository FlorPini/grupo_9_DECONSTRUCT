const express = require ("express");
const path = require ("path");
const app = express ();
const fs = require("fs");
const {validationResult} = require ('express-validator');
const jsonTable= require("../database/jsonTable");
const usersModel = jsonTable ("users")
const session = require('express-session');

let usersController = {
    index: (req, res) => {
        return res.render('./users/login');
    },

    register: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
                let user = req.body;
                userId = usersModel.create(user);
               // res.redirect('/users/' + userId);
                res.redirect('/')
                } else {
                res.render('./users/login', { errors: errors.mapped(), old: req.body}); //le enviamos a la vista de creacion de producto un array con los errores
                }
    },

    login: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
                let users = usersModel.readFile(); //en users cargamos todos los usuarios que tenemos como un array
                let user = req.body;   //leemos los datos del formulario enviado
                for (let i=0 ; i< users.length; i++){   //pasamos por todo este array para ver si alguno coincide con el enviado por el usuario a logearse
                    if( users[i].email == req.body.emailLogin){
                        if( bcrypt.compareSync(req.body.pswdLogin, users[i].pswd)){ //comparamos las contraseñas 
                          let userToLogin = users[i];  //si alguna coincide mostramos el usuario
                          break;
                    }
                   }
                 }
                 if (userToLogin == undefined){
                     return res.render('login' , {errors: [
                         {msg: 'Credenciales invalidas'}
                     ]});
                 }
                  req.session.loggedUser = userToLogin;
                  res.redirect()
                } else {
                res.render('./users/login', { errors: errors.mapped(), old: req.body}); //le enviamos a la vista de creacion de producto un array con los errores
                }
    },
   //processLogin: (req, res) => {
      //let errors = validationResult(req);
      // if (errors.isEmpty()){

        //}else{
          //  return res.render('./users/login', {errors:errors.errors});
       // }
        
    //},
    edit: (req, res)=> {
        let idUser= req.params.idUser;
        let users = [
            {id : 1 , name : "Dario"},
            {id : 2 , name : "Javier"}
            ];
       let userToEdit = users[idUser];
       let esta = "Esta"
       res.render("./users/userEdit",{userToEdit:userToEdit});
    }
};

module.exports = usersController;
 