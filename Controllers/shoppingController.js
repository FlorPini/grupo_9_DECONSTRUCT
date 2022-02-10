const express = require ("express");
const path = require ("path");
const app = express ();

let shoppingController = {
    index: (req, res) => {
        return res.render('shopping-cart');
    }
};

module.exports = shoppingController;