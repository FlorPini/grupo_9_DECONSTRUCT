const express = require ("express");
const path = require ("path");
const app = express ();

let mainController = {
    index: function (req, res) {
        res.sendFile(path.resolve(__dirname, "../views/home.html"));
    }
};

module.exports = mainController;
