const express = require ("express");
const path = require ("path");
const app = express ();

let productosController = {
    index: function (req, res) {
        res.sendFile(path.resolve(__dirname, "../views/product.html"));
    }
};

module.exports = productosController;