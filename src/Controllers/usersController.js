const express = require ("express");
const path = require ("path");
const app = express ();
const fs = require("fs");
const {validationResult} = require ('express-validator');
const jsonTable= require("../database2/jsonTable");
const usersModel = jsonTable ("users")
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const db = require("../database/models");

let usersController = {
    index: (req, res) => {
        return res.render('./users/login');
    },

    register: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            db.User.findOne(
                { where: { email : req.body.email} })
                    .then(function(email){
                        let existingUser = email
                        if(existingUser == undefined){
                            db.User.findOne(
                                { where: { nick_name : req.body.nickName} })
                                    .then(function(nickName){
                                        let existingNick = nickName
                                        if(existingNick == undefined){
                                            db.User.create({
                                                name: req.body.name, 
                                                last_name: req.body.lastName,
                                                nick_name: req.body.nickName,
                                                email : req.body.email,   // tomamos el body del formulario enviado
                                                password: bcryptjs.hashSync(req.body.pswd, 10),  //al valor que viene en pswd lo reemplazamos por el mismo valor encriptado,
                                                image: req.file.filename,  
                                            });   
                                            res.redirect('/')  
                                        } else {
                                            return res.render('./users/login',{ 
                                                errors: {nickName: {msg:'Este Alias esta siendo utilizado'}
                                                },
                                                old: req.body
                                                });
                                            }    
                                        })          
                        } else {
                            return res.render('./users/login',{ 
                                errors: {email: {msg:'Este usuario ya existe'}
                                },
                                old: req.body
                                });
                            }    
                        })   
        } else {
            res.render('./users/login', { errors: errors.mapped(), old: req.body}); //le enviamos a la vista de creacion de producto un array con los errores
        }           
    },

    login: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            db.User.findOne(
                { where: { email : req.body.emailLogin}})
                .then(function(user){
                    let userToLogin= user
                    if(userToLogin){
                        if( bcryptjs.compareSync(req.body.pswdLogin, userToLogin.password)){
                            delete userToLogin.pswd                  
                            req.session.userLogged = userToLogin;
                            if(req.body.rememberMe){
                                res.cookie('userEmail', req.body.emailLogin, { maxAge : 100000*60*2})
                            }
                            res.redirect('./profile')     
                        } else {
                            return res.render('./users/login', { 
                                errors: {
                                    emailLogin: {
                                    msg : 'Credenciales invalidas'
                                }
                                },
                                old: req.body
                            });
                        }
                    }
                })
        } else {
            res.render('./users/login', { errors: errors.mapped(), old: req.body}); //le enviamos a la vista de creacion de producto un array con los errores
        }
    },

    profile: (req, res) => {
        db.User.findByPk(req.session.userLogged.id)
        .then(function(user){
            return res.render('./users/userProfile' , {
                user : user
           });
        })  
    },

    logout: (req, res) => {
       res.clearCookie('userEmail');
       req.session.destroy();   
       res.redirect('/');
        
    },

    edit: (req, res)=> {
        db.User.findByPk(req.session.userLogged.id)
        .then(function(user){
            return res.render('./users/userEdit' , {
                old : user
           });
        }) 
    },

    update:(req,res)=> {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            if(req.file){
                db.User.update({
                name: req.body.name, 
                last_name: req.body.lastName,
                nick_name: req.body.nickName,
                email : req.body.email,   
              //  password: bcryptjs.hashSync(req.body.pswd, 10),  //al valor que viene en pswd lo reemplazamos por el mismo valor encriptado,
                image: req.file.filename,   
            },{
                where:{
                    id:req.session.userLogged.id
                }
            })
                res.redirect("/users" )
            }else{
                db.User.update({
                name: req.body.name, 
                last_name: req.body.lastName,
                nick_name: req.body.nickName,
                email : req.body.email,  
                password: bcryptjs.hashSync(req.body.pswd, 10),  
                },{
                where:{
                    id:req.session.userLogged.id
                }
                })
                res.redirect("/users" )
            }
        }else{
            
             res.render('./users/userEdit', {errors: errors.mapped(), old: req.body});
             }
            
            

    }
};

module.exports = usersController;
 