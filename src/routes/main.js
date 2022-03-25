const express = require("express");
const router = express.Router();
const multer = require ("multer");
const {check} = require ('express-validator');
const mainController = require("../Controllers/mainController");

const validateLogin =[                   //validaciones
            check('email').notEmpty().withMessage('Dato Obligatorio').bail()
                    .isEmail().withMessage('No es una direccion valida'),
            check('pswd').notEmpty().withMessage('Dato Obligatorio').bail()
                    .isLength({min: 8}).withMessage('Ingrese una contraseña valida')
]

router.get("/", mainController.index);


module.exports = router;
