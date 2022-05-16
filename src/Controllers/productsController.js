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
       db.Product.findAll()
         .then(function(products){
            res.render('./products/productsList' , {products:products})
         })
       
        // let products = productsModel.all() 
        //return res.render('./products/productsList' , {products});
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
            db.Product.create({
                product_name : req.body.productName ,
                category_id : req.body.category,
                type_id : req.body.type,
                description : req.body.productDescription,
                duration : req.body.duration,
                price :req.body.productPrice,
                image: req.file.filename
                //user_id:user??   
            })
            //  name : req.body.productName ,
            //     category : req.body.category,
            //     type : req.body.type,
            //     description : req.body.productDescription,
            //     price :req.body.productPrice

            //return res.redirect('./')
            db.Product.findAll()
               .then(function(products){
            res.render('./products/productsList' , {products:products})
               })

                     //    let product = req.body;
               //   product.image = req.file.filename;   //con esto tomo el valor filename (nombre que le di al archivo) de la informacion que viene del req.file y se la asocio a la clave image del objeto literal group
             //   productId = productsModel.create(product);
              // res.redirect('/products/' + productId);
                } else {
                    Promise.all([db.Category.findAll(),db.Type.findAll()])        
                    .then(function([categorys, types]){    
                        res.render('./products/create', {products: errors.mapped(), old: req.body, types: types , categorys: categorys});
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
        Promise.all([db.Product.findByPk(req.params.id),db.Category.findAll(),db.Type.findAll()])        
                    .then(function([product, categorys, types]){     
                        res.render('./products/edit', {types: types , categorys: categorys, product:product});
                    })
        //let orderProduct =db.Product.findByPk(req.params.id)
       // return res.render('./products/edit',{product:product});
    },

    update:(req , res) =>{
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            if(req.file){
                db.Product.update({
                product_name : req.body.productName ,
                category_id : req.body.category,
                type_id : req.body.type,
                description : req.body.productDescription,
                duration : req.body.duration,
                price :req.body.productPrice,
                image: req.file.filename,
                //user_id:user??   
            },{
                where:{
                    id:req.params.id
                }
            })
            res.redirect("/products/" +req.params.id)
            }else{
                db.Product.update({
                product_name : req.body.productName,
                category_id : req.body.category,
                type_id : req.body.type,
                description : req.body.productDescription,
                duration : req.body.duration,
                price : req.body.productPrice,  
                },{
                where:{
                    id:req.params.id
                }
                })
                res.redirect("/products/" +req.params.id)
            }
        }else{
            Promise.all([db.Category.findAll(),db.Type.findAll()])        
            .then(function([categorys, types]){    
                res.render('./products/edit', {errors: errors.mapped(), old: req.body, types: types , categorys: categorys});
            })
            }
    },

    show: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include:[{association: "category"},{association:"type"}]
        })
            .then(function(product){
                res.render('./products/show',{product:product})
            }) 
       // let group = productsModel.find(req.params.id);
        //return res.render('./products/show');
    },

    erase: (req, res) => {
        db.Product.destroy({
            where:{
                id:req.params.id
            }   
        })  
        res.redirect('/products')
    }
};

module.exports = productsController;