const express = require ("express");
const path = require ("path");
const app = express ();

let mainController = {
    index: (req, res) => {
        return res.render('home');
    },

    register: (req, res) => {
        return res.render('./users/register');
    },

    login: (req, res) => {
        return res.render('./users/login');
    }
};

module.exports = mainController;
