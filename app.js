const express = require ("express");
const path = require ("path");
const app = express ();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.listen (3000, () => {
    console.log("servidor corriendo");
})

app.get ("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})

app.get ("/product", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/product.html"));
})

app.get ("/shopping-cart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views//shopping-cart.html"));
})