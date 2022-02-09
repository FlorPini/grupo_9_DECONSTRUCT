const express = require ("express");
const path = require ("path");
const app = express ();

let mainController = {
    index: (req, res) => {
        return res.render('home');
    },

    login: (req, res) => {
        return res.render('register');
    },

    register: (req, res) => {
        return res.render('login');
    }
};

module.exports = mainController;
