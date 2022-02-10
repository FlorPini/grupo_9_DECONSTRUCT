const express = require ("express");
const router = express.Router ();
let shoppingController = require ('../Controllers/shoppingController')


router.get('/', shoppingController.index )

module.exports = router;