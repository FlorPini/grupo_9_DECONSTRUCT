const express = require ("express");
const router = express.Router ();
const multer = require("multer");
const path= require("path");
const {check} = require ('express-validator');

let productsApiController = require ('../../Controllers/api/productsApiController')

const validateCreateForm =[
            check('productName').notEmpty().withMessage('Dato Obligatorio'),
            check('category').notEmpty().withMessage('Seleccionar una opción'),
            check('type').notEmpty().withMessage('Seleccionar una opción'),
            check('productDescription').notEmpty().withMessage('Dato Obligatorio'),
            check('duration')
                    .notEmpty().withMessage('Agregar la duración del curso').bail()
                    .isNumeric().withMessage('Dato Obligatorio'),
            check('productPrice')
                    .notEmpty().withMessage('Dato Obligatorio').bail()
                    .isNumeric().withMessage('Dato Obligatorio'),
            check('productImage').custom((value, { req }) => {
                   let file = req.file;
                   let acceptedExtension = ['.jpg' , '.png' , '.gif' , '.jpeg']
                   
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
const validateUpdateForm =[
            check('productName').notEmpty().withMessage('Dato Obligatorio'),
            check('category').notEmpty().withMessage('Seleccionar una opción'),
            check('type').notEmpty().withMessage('Seleccionar una opción'),
            check('productDescription').notEmpty().withMessage('Dato Obligatorio'),
            check('duration')
                    .notEmpty().withMessage('Agregar la duración del curso').bail()
                    .isNumeric().withMessage('Dato Obligatorio'),
            check('productPrice')
                    .notEmpty().withMessage('Dato Obligatorio').bail()
                    .isNumeric().withMessage('Dato Obligatorio'),

]

const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        let folder = path.join(__dirname,"../../public/images/productImages");
    cb(null , folder)},

    filename: (req, file, cb)=>{
           let imageName = "Product-" + Date.now() + path.extname(file.originalname);
        cb(null , imageName)
    }
})

const upload = multer ({ storage : storage});
                                            
router.get('/', productsApiController.index )

router.get('/create', productsApiController.create)

router.post('/create', upload.single("productImage"), validateCreateForm , productsApiController.store)

router.get('/edit/:id', productsApiController.edit)

router.post('/edit/:id',upload.single("productImage"), validateUpdateForm , productsApiController.update)

router.post('/erase/:id', productsApiController.erase)

router.get('/:id', productsApiController.show)

module.exports = router;