const express = require ("express");
const router = express.Router ();
let mainController = require ('../Controllers/mainController.js')


router.get('/', mainController.index )

module.exports = router;