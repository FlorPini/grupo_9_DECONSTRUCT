const express = require ("express");
const path = require ("path");
const app = express ();
const fs = require("fs")
const { validationResult} = require ('express-validator');
const jsonTable= require("../../database2/jsonTable");
const productsModel = jsonTable ("products")
const db = require("../../database/models");


let productsApiController = {
     index: async (req, res) => {

        try {
            const products = await db.Product.findAll();
            const responseToSend = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: req.originalUrl,
                },
                data: products
    
                };
                res.json(responseToSend)
            }
            catch (error){
                console.error(error)
                const responseToSend = {
                    meta: {
                        status: 500,
                        url: req.originalUrl,
                    },
                    data: {
                        message: "Hubo un error al procesar tu solicitud"
                    }
        
                    };
                    res.json(responseToSend)

            }
        },
    create: (req, res) => {
        
        Promise.all([db.Category.findAll(),db.Type.findAll()])        
            .then(function([categorys, types]){     
            return res.json('types: types , categorys: categorys')
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
                
            })

  
                } else {
                    Promise.all([db.Category.findAll(),db.Type.findAll()])        
                    .then(function([categorys, types]){    
                        res.json('errors: errors.mapped(), old: req.body, types: types , categorys: categorys');
                    })
                }
    },

    edit: (req, res) => {
        Promise.all([db.Product.findByPk(req.params.id),db.Category.findAll(),db.Type.findAll()])        
                    .then(function([product, categorys, types]){     
                        res.json('types: types , categorys: categorys, product:product');
                    })
    },

    update:(req , res) =>{
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            db.Product.update({
                product_name : req.body.productName ,
                category_id : req.body.category,
                type_id : req.body.type,
                description : req.body.productDescription,
                duration : req.body.duration,
                price :req.body.productPrice,
                image: req.file.filename,
            },{
                where:{
                    id:req.params.id
                }
            })
            res.redirect("/api/products/" +req.params.id)
        }else{
            Promise.all([db.Category.findAll(),db.Type.findAll()])        
            .then(function([categorys, types]){    
                res.json('errors: errors.mapped(), old: req.body, types: types , categorys: categorys');
            })
            }
    },

    show: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include:[{association: "category"},{association:"type"}]
        })
            .then(function(product){
                res.json('product:product')
            }) 
    },

    erase: (req, res) => {
        db.Product.destroy({
            where:{
                id:req.params.id
            }   
        })  
        res.redirect('/api/products')
    }
};

module.exports = productsApiController;