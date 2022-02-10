const express = require ("express");
const path = require ("path");
const app = express ();

let productosController = {
    index: (req, res) => {
        return res.render('product');
    }
};

module.exports = productosController;