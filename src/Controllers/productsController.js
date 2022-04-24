const express = require ("express");
const path = require ("path");
const app = express ();
const fs = require("fs")
const { validationResult} = require ('express-validator');
const jsonTable= require("../database2/jsonTable");
const productsModel = jsonTable ("products")
const db = require("../database/models");


let productsController = {
    index: (req, res) => {
        let products = productsModel.all() 
        return res.render('./products/productsList' , {products});
    },
    
    
    create: (req, res) => {
        
        Promise.all([db.Category.findAll(),db.Type.findAll()])        
            .then(function([categorys, types]){     
            return res.render('./products/create',{types: types , categorys: categorys})
            })
            .catch(function(error){
                console.log(error);
            })
        },

    store: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
                let product = req.body;
                product.image = req.file.filename;   //con esto tomo el valor filename (nombre que le di al archivo) de la informacion que viene del req.file y se la asocio a la clave image del objeto literal group
                productId = productsModel.create(product);
                res.redirect('/products/' + productId);
                } else {
                    Promise.all([db.Category.findAll(),db.Type.findAll()])        
                    .then(function([categorys, types]){ 
                        console.log(req.body);    
                        res.render('./products/create', {errors: errors.mapped(), old: req.body, types: types , categorys: categorys});
                    })
                 //le enviamos a la vista de creacion de producto un array con los errores
                }
      //  let newItem = {
       //     name : req.body.productName ,
       //     category : req.body.category,
       //     type : req.body.type,
       //     description : req.body.productDescription,
       //     price :req.body.productPrice
       // }
       // let productJSON= JSON.stringify(newItem);
        //fs.appendFileSync("./database/products.json",productJSON);
        //return res.render('./products/createConfirm');
    },

    edit: (req, res) => {
        return res.render('./products/edit');
    },

    show: (req, res) => {
        let group = productsModel.find(req.params.id);
        return res.render('./products/show');
    }
};

module.exports = productsController;