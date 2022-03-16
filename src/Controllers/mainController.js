const express = require ("express");
const path = require ("path");
const app = express ();

let mainController = {
    index: (req, res) => {
        return res.render('home');
    },

    register: (req, res) => {
        return res.render('./users/register');
    },

    login: (req, res) => {
        return res.render('./users/login');
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

module.exports = mainController;
 