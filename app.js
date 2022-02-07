const express = require ("express");
const path = require ("path");
const app = express ();
const rutasProductos = require ("./routes/productos.js")
const rutasMain = require ('./routes/main.js')

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.listen (3000, () => {
    console.log("servidor corriendo");
})

app.use('/productos', rutasProductos);

app.use('/', rutasMain);


app.get ("/shopping-cart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/shopping-cart.html"));
})

app.get ("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/register.html"));
})

app.get ("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/login.html"));
})