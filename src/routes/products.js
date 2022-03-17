const express = require ("express");
const router = express.Router ();
const multer = require("multer");
const path= require("path");

let productsController = require ('../Controllers/productsController')

//para poder subir archivos
const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        let folder = path.join(__dirname,"../../public/productImages");
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

router.post('/create', upload.single("productImage"), productsController.store) //procesamiento del formulario de creacion

router.get('/edit', productsController.edit)  //formulario de edicion

router.get('/:id', productsController.show)  //detalle del producto

module.exports = router;