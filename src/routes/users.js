const express = require("express");
const router = express.Router();
const multer = require ("multer");
const path= require("path");
const {check} = require ('express-validator');

const usersController = require("../Controllers/usersController");
const guestMiddleware = require("../middleWares/guestMiddleware");
const authMiddleware = require("../middleWares/authMiddleware");


const validateRegister =[                   //validaciones
        check('name').notEmpty().withMessage('Agregar Nombre'),
        check('lastName').notEmpty().withMessage('Agregar Apellido'),
        check('nickName').notEmpty().withMessage('Agregar Alias'),
        check('email').notEmpty().withMessage('Agregar Dirección').bail()
                .isEmail().withMessage('No es una direccion valida'),
        check('pswd').notEmpty().withMessage('Definir Contraseña')
                .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
        check('confirmPswd').notEmpty().withMessage('Definir Contraseña').bail()
                .custom((value, { req }) => {   
                let confirmPswd = req.body.confirmPswd;
                let pswd = req.body.pswd;
                if (pswd!=confirmPswd){
                        throw new Error('Las contraseñas no coinciden');
                }
                       return true;
                }), 
        check('userImage').custom((value, { req }) => {  //para validar archivos
                let file = req.file;
                        let acceptedExtension = ['.jpg' , '.png' , '.gif', '.jpeg'] //para validar si el formato en el que vienene esta entre estos
                        
                        if (!file) {
                             throw new Error('Agregar una imagen');
                        } else {
                             let fileExtension = path.extname(file.originalname)
                             if (!acceptedExtension.includes(fileExtension)){
                                 throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtension.join(', ')}`);
                             }
                       }
                        return true;
                 })             
];
const validateUpdate =[                   //validaciones
        check('name').notEmpty().withMessage('Agregar Nombre'),
        check('lastName').notEmpty().withMessage('Agregar Apellido'),
        check('nickName').notEmpty().withMessage('Agregar Alias'),
        check('email').notEmpty().withMessage('Agregar Dirección').bail()
                .isEmail().withMessage('No es una direccion valida'),
        check('Pswd')
                .custom((value, { req }) => {   
                if(req.body.pswd && req.body.confirmPswd){
                let confirmPswd = req.body.confirmPswd;
                let pswd = req.body.pswd;
                if (pswd!=confirmPswd){
                        throw new Error('Las contraseñas no coinciden');
                }
                       return true;
                }}
                ),              
];

const validateLogin =[                   //validaciones
        check('emailLogin').notEmpty().withMessage('Completar Email').bail()
                .isEmail().withMessage('No es una direccion valida'),
        check('pswdLogin').notEmpty().withMessage('Completar Contraseña').bail()
                .isLength({min: 8}).withMessage('Ingrese una contraseña valida')
];

const storage = multer.diskStorage({
        destination:(req , file , cb)=>{
            let folder = path.join(__dirname,"../../public/images/usersImages");
        cb(null , folder)},
    
        //esto le asigna un nombre al archivo que adjunta el usuario, con date.now se
        //genera la hora y fecha con milisegundos por lo que se asegura que ese numero
        //va a ser unico, y con path.extname le asignamos la extension del archivo original
        filename: (req, file, cb)=>{
               let imageName = "User-" + Date.now() + path.extname(file.originalname);
            cb(null , imageName)
        }
    })

                                                
const upload = multer ({ storage : storage}); //con esto aclaramos que queremos usar la configuracion guardad en multerDiskStorage

router.get("/",function (req,res){
        res.redirect('/users/register')
    })

router.get('/register', guestMiddleware, usersController.index);

router.post('/register',  upload.single("userImage"), validateRegister,  usersController.register);

router.post("/login",  validateLogin ,  usersController.login);

router.get("/edit", usersController.edit);

router.post("/edit", upload.single("userImage"), validateUpdate, usersController.update);

router.get("/profile", authMiddleware , usersController.profile);

router.get("/logout",  usersController.logout);


module.exports = router;
