const express = require ("express");
const router = express.Router ();
const multer = require("multer");
const path= require("path");
const {check} = require ('express-validator');  //con la herramienta desustructuracion llamamos solo la funcion body de express-validator

let productsController = require ('../Controllers/productsController')

const validateCreateForm =[                   //validaciones
            check('productName').notEmpty().withMessage('Dato Obligatorio'),
            check('category').notEmpty().withMessage('Dato Obligatorio'),
            check('productDescription').notEmpty().withMessage('Dato Obligatorio'),
            check('duration')
                    .notEmpty().withMessage('Agregar la duración del curso').bail()
                    .isNumeric().withMessage('Dato Obligatorio'),
            check('productPrice')
                    .notEmpty().withMessage('Dato Obligatorio').bail()
                    .isNumeric().withMessage('Dato Obligatorio'),
            check('productImage').custom((value, { req }) => {  //para validar archivos
                   let file = req.file;
                   let acceptedExtension = ['.jpg' , '.png' , '.gif' , '.jpeg'] //para validar si el formato en el que vienene esta entre estos
                   
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

]
//para poder subir archivos
const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        let folder = path.join(__dirname,"../../public/images/productImages");
    cb(null , folder)},

    //esto le asigna un nombre al archivo que adjunta el usuario, con date.now se
    //genera la hora y fecha con milisegundos por lo que se asegura que ese numero
    //va a ser unico, y con path.extname le asignamos la extension del archivo original
    filename: (req, file, cb)=>{
           let imageName = "Product-" + Date.now() + path.extname(file.originalname);
        cb(null , imageName)
    }
})

                                            //con esto aclaramos que queremos usar la configuracion guardad en multerDiskStorage
const upload = multer ({ storage : storage});
                                             //para indicar que queremos subir el archivo .single("productImage") donde prodcutImage
                                             //debe coincidir con el atributo name del input del formulario y single es porque vamos 
                                             //subir un solo archivo
    
router.get('/', productsController.index ) //Detalle de un producto

router.get('/create', productsController.create) //formulario de creacion

router.post('/create', upload.single("productImage"), validateCreateForm , productsController.store) //procesamiento del formulario de creacion

router.get('/edit', productsController.edit)  //formulario de edicion

router.get('/:id', productsController.show)  //detalle del producto

module.exports = router;