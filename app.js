const express = require ("express");
const path = require ("path");
const app = express ();
const rutasProductos = require ("./routes/productos.js");
const rutasMain = require ('./routes/main.js');
const rutasShopping = require ('./routes/shopping.js');
const publicPath = path.resolve(__dirname, "./public");

app.set('view engine', 'ejs');

app.use(express.static(publicPath));

app.listen (3000, () => {
    console.log("servidor corriendo");
})

app.use('/', rutasMain);

app.use('/productos', rutasProductos);

app.use('/shopping-cart', rutasShopping);

