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
            let idLogged = req.session.userLogged.id 
            db.Product.create({
                product_name : req.body.productName ,
                category_id : req.body.category,
                type_id : req.body.type,
                description : req.body.productDescription,
                duration : req.body.duration,
                price :req.body.productPrice,
                image: req.file.filename,
                user_id: idLogged  
            })
            db.Product.findAll()
               .then(function(products){
            res.render('./products/productsList' , {products:products})
            })

        } else {
            Promise.all([db.Category.findAll(),db.Type.findAll()])        
            .then(function([categorys, types]){    
                res.render('./products/create', {errors: errors.mapped(), old: req.body, types: types , categorys: categorys});
            })
            console.log(errors.mapped());
        }
    },

    edit: (req, res) => {
        Promise.all([db.Product.findByPk(req.params.id),db.Category.findAll(),db.Type.findAll()])        
            .then(function([product, categorys, types]){     
                res.render('./products/edit', {types: types , categorys: categorys, product:product});
            })
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