<<<<<<< HEAD
const express = require("express");
const path = require("path");
const app = express();

=======
const express = require ("express");
const path = require ("path");
const app = express ();
const rutasProductos = require ("./routes/productos.js");
const rutasMain = require ('./routes/main.js');
const rutasShopping = require ('./routes/shopping.js');
>>>>>>> 4abd77eb586df7e00049941399bb878360571261
const publicPath = path.resolve(__dirname, "./public");

app.set('view engine', 'ejs');

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log("servidor corriendo");
});

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/home.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/product.html"));
});

app.get("/shopping-cart", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views//shopping-cart.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views//login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views//register.html"));
});
=======
app.use('/', rutasMain);

app.use('/productos', rutasProductos);

app.use('/shopping-cart', rutasShopping);

>>>>>>> 4abd77eb586df7e00049941399bb878360571261
