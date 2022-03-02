const express = require ("express");
const path = require ("path");
const app = express ();
const fs = require("fs")

//const jsonTable= require("../database/jsonTable");
//const productsModel = jsonTable ("products")

let productosController = {
    index: (req, res) => {
        return res.render('./products/product');
    },
    create: (req, res) => {
        return res.render('./products/create');
    },
    edit: (req, res) => {
        return res.render('./products/edit');
    },
    store: (req, res) => {
        let newItem = {
            name : req.body.productName ,
            category : req.body.category,
            type : req.body.type,
            description : req.body.productDescription,
            price :req.body.productPrice
        }
        let productJSON= JSON.stringify(newItem);
        fs.writeFileSync("./database/productos.json",productJSON);
        return res.send(newItem);
    },
    show: (req, res) => {
        return res.render('./products/show');
    }
};

module.exports = productosController;