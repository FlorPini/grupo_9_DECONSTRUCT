const express = require ("express");
const router = express.Router ();
const multer = require("multer");
const { path } = require("express/lib/application");
let productosController = require ('../Controllers/productosController')

//para poder subir archivos
const multerDiskStorage = multer.diskStorage({
    destination:(req , file , callback)=>{
        let folder = path.join(__dirname,"../../public/productImages");
    callback(null.folder)},

    //esto le asigna un nombre al archivo que adjunta el usuario, con date.now se
    //genera la hora y fecha con milisegundos por lo que se asegura que ese numero
    //va a ser unico, y con path.extname le asignamos la extension del archivo original
    filename: (req, file, callback)=>{
           let imageName = "Product-" + Date.now() + path.extname(file.originalname);
        callback(null.imageName)
    }
})

//con esto aclaramos que queremos usar la configuracion guardad en multerDiskStorage
const upload = multer ({ storage : multerDiskStorage});
//para indicar que queremos subir el archivo .single("productImage") donde prodcutImage
//debe coincidir con el atributo name del input del formulario y single es porque vamos 
//subir un solo archivo

     //router.post('/create', upload.single("productImage"), productosController.store)
router.post('/create', productosController.store)   //procesamiento del formulario de creacion
    
router.get('/', productosController.index ) //Detalle de un producto

router.get('/create', productosController.create) //formulario de creacion

router.get('/edit', productosController.edit)  //formulario de edicion

router.get('/:id', productosController.show)  //detalle del producto

module.exports = router;