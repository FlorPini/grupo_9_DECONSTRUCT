const express = require ("express");
const { validationResult} = require ('express-validator');
const db = require("../../database/models");
const Op = db.Sequelize.Op;

let productsApiController = {

    list: async (req, res) => {

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
    show: (req, res) => {
            db.Product
            .findByPk(req.params.id, {
                include:[{association: "category"},{association:"type"}]
            })
            .then(function(product){
                const responseToSend = {
                    meta: {
                        status: 200,
                    },
                    data: product
                    }
                return res.status(200).json(responseToSend)
                    });
                 
        },
    
    store: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            db.Product
                .create(
                    {
                    product_name : req.body.product_name ,
                    category_id : req.body.category_id,
                    type_id : req.body.type_id,
                    description : req.body.description,
                    duration : req.body.duration,
                    price :req.body.price,
                    //image: req.file.filename
                    })
                .then(function(product){
                    const responseToSend = {
                        meta: {
                            status: 200,
                            created: "ok"
                        },
                        data: product  
                        }
                    return res.status(200).json(responseToSend) 
                })         
                } else { 
                        res.json(errors);
                    }
    },
    erase: (req, res) => {
        db.Product
            .destroy({
                where:{
                id: req.params.id
                }   
            })  
            .then(function(response){
            return res.status(200).json(response)
        }) 
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if ( errors.isEmpty()){
            db.Product
                .update(
                    {
                    product_name : req.body.product_name ,
                    category_id : req.body.category_id,
                    type_id : req.body.type_id,
                    description : req.body.description,
                    duration : req.body.duration,
                    price :req.body.price,
                    //image: req.file.filename
                    },{
                        where:{
                            id:req.params.id
                        }
                    })
                .then(function(product){
                    const responseToSend = {
                        meta: {
                            status: 200,
                            update: "ok"
                        },
                        data: product  
                        }
                    return res.status(200).json(responseToSend) 
                })         
                } else { 
                        res.json(errors);
                    }
    },
    search: (req , res) => {
        db.Product
            .findAll({
                where: {
                    product_name: { [Op.like]: "%" + req.query.keyword + "%" } 
                }
            })
            .then(function(products){
                if (products.length > 0){
                    return res.json("No existen productos") 
                }                    
                return res.json("No existen productos")
            })
    }
   
};

module.exports = productsApiController;