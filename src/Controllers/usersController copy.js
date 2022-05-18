const express = require ("express");
const path = require ("path");
const app = express ();
const fs = require("fs");
const {validationResult} = require ('express-validator');
const jsonTable= require("../database2/jsonTable");
const usersModel = jsonTable ("users")
const session = require('express-session');
const bcryptjs = require('bcryptjs');

let usersController = {
    index: (req, res) => {
        return res.render('./users/login');
    },

    register: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            db.User.create({
            //  let user = {  //creamos el objeto literal user para cargarlo en el archivo general .JSON
                ...req.body,    // tomamos el body del formulario enviado
                pswd: bcryptjs.hashSync(req.body.pswd, 10),  //al valor que viene en pswd lo reemplazamos por el mismo valor encriptado,
                userImage: req.file.filename,  
                }
                delete user.confirmPswd;
            let existingUser = usersModel.findByField('email' , req.body.email)
            if(existingUser == undefined){

              let userId = usersModel.create(user);  //enviamos este nuevo objeto para ser agregado
                
                res.redirect('/')
                })
          
                } else {
                    return res.render('./users/login', { 
                        errors: {
                            email: {
                                msg : 'Este usuario ya existe'
                            }
                      },
                      oldData: req.body
                    });
                }
                } else {
                res.render('./users/login', { errors: errors.mapped(), old: req.body}); //le enviamos a la vista de creacion de producto un array con los errores
                }
            
    },

    login: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            let userToLogin=usersModel.findByField('email' ,req.body.emailLogin)
                if(userToLogin){
                    if( bcryptjs.compareSync(req.body.pswdLogin, userToLogin.pswd)){
                        delete userToLogin.pswd                  //para que no quede en session el pswd
                        req.session.userLogged = userToLogin;

                        if(req.body.rememberMe){
                            res.cookie('userEmail', req.body.emailLogin, { maxAge : 1000*60*2})
                        }
                        
                        res.redirect('/users/profile')       
                    } else {
                        return res.render('./users/login', { 
                            errors: {
                                emailLogin: {
                                    msg : 'Las credenciales invalidas'
                                }
                          },
                          oldData: req.body
                        });
                    }
                }
        } else {
            res.render('./users/login', { errors: errors.mapped(), old: req.body}); //le enviamos a la vista de creacion de producto un array con los errores
        }
    },

    profile: (req, res) => {
        return res.render('./users/userProfile' , {
             user : req.session.userLogged
        });
       
        
    },

    logout: (req, res) => {
       res.clearCookie('userEmail');
       req.session.destroy();   
       res.redirect('/');
        
    },

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
 