const express = require ("express");
const path = require ("path");
const app = express ();
const jsonTable= require("../database/jsonTable");
const usersModel = jsonTable ("users")

let mainController = {
    index: (req, res) => {
        return res.render('home');
    }
};

module.exports = mainController;
 