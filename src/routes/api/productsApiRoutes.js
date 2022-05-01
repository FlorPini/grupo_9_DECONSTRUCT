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
            check('product_name').notEmpty().withMessage('Dato Obligatorio'),
            check('category_id').notEmpty().withMessage('Seleccionar una opción').bail()
            //.isNumeric().withMessage('Dato Obligatorio')
            ,
            check('type_id').notEmpty().withMessage('Seleccionar una opción').bail()
            .isNumeric().withMessage('Dato Obligatorio'),
            check('description').notEmpty().withMessage('Dato Obligatorio'),
            check('duration')
                    .notEmpty().withMessage('Agregar la duración del curso').bail()
                    .isNumeric().withMessage('Dato Obligatorio'),
            check('price')
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
                                            
router.get('/', productsApiController.list )

router.get('/:id', productsApiController.show)

router.post('/',upload.single("productImage"), validateUpdateForm , productsApiController.store)

router.delete('/:id', productsApiController.erase)

router.put('/:id',upload.single("productImage"), validateUpdateForm , productsApiController.update)

router.get('/search', productsApiController.search )



module.exports = router;