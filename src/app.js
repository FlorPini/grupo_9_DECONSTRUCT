const express = require("express");
const path = require("path");
const app = express();
const rutasProductos = require("./routes/productos.js");
const rutasMain = require("./routes/main.js");
const rutasShopping = require("./routes/shopping.js");
const res = require("express/lib/response");

//para poder usar el metodo post, decimos que tomamos toda la info
//que llega desde un formulario
app.use(express.urlencoded({extended:false}));
//para poder trasnformarlo a un archivo .json
app.use(express.json());

const publicPath = path.resolve(__dirname, "../public");

//con esto redirigimos todas las rutas que entren en home a la ruta 
//producto
//app.get("/", (req,res)=> {
//  res.redirect("/productos/")
//})
app.set("view engine", "ejs");

app.use(express.static(publicPath));

app.use("/", rutasMain);

app.use("/products", rutasProductos);

app.use("/shopping-cart", rutasShopping);

app.listen(3000, () => {
  console.log("servidor corriendo");
});