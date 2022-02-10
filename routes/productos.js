const express = require ("express");
const router = express.Router ();
let productosController = require ('../Controllers/productosController')


router.get('/', productosController.index )

module.exports = router;