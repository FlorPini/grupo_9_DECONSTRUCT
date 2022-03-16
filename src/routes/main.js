const express = require("express");
const router = express.Router();
const multer = require ("multer");
let mainController = require("../Controllers/mainController");

router.get("/", mainController.index);

router.get("/register", mainController.register);

router.get("/login", mainController.login);

//para editar un usuario primero debemos ver el formulario para editar
//entonces creamos la ruta con el metodo get para que nos muestre los datos
//del usuario del idUser
router.get("/edit/:idUser", mainController.edit )

router.put("/edit",function (req,res){
    res.send("Fui por PUT")
})

module.exports = router;
