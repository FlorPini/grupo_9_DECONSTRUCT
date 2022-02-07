const express = require ("express");
const router = express.Router ();
let productosController = require ('../Controllers/productosController.js')


router.get('/', productosController.index )

module.exports = router;