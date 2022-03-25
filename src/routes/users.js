const express = require("express");
const router = express.Router();
const multer = require ("multer");
const {check} = require ('express-validator');
const path= require("path");
const usersController = require("../Controllers/usersController");

const validateLogin =[                   //validaciones
        check('emailLogin').notEmpty().withMessage('Dato Obligatorio').bail()
                .isEmail().withMessage('No es una direccion valida'),
        check('pswdLogin').notEmpty().withMessage('Dato Obligatorio').bail()
                .isLength({min: 8}).withMessage('Ingrese una contraseña valida')
]

const validateRegister =[                   //validaciones
        check('name').notEmpty().withMessage('Agregar Nombre'),
        check('lastName').notEmpty().withMessage('Agregar Apellido'),
        check('email').notEmpty().withMessage('Agregar Dirección').bail()
                .isEmail().withMessage('No es una direccion valida'),
        check('pswd').notEmpty().withMessage('Definir Contraseña')
                .isLength({min: 8}).withMessage('Ingrese una contraseña valida'),
        check('confirmPswd').notEmpty().withMessage('Definir Contraseña').bail()
                    .custom((value, { req }) => {   
                    let confirmPswd = req.body.confirmPswd;
                    let pswd = req.body.pswd;
                        if (pswd!=confirmPswd){
                               throw new Error('Las contraseñas no coinciden');
                       }
                       return true;
                       })
                        
               
]

router.get('/', usersController.index);

router.post('/register',  validateRegister, usersController.register);

router.post("/login", validateLogin ,usersController.login);

//para editar un usuario primero debemos ver el formulario para editar
//entonces creamos la ruta con el metodo get para que nos muestre los datos
//del usuario del idUser
router.get("/edit/:idUser", usersController.edit)


router.put("/edit",function (req,res){
    res.send("Fui por PUT")
})

module.exports = router;
