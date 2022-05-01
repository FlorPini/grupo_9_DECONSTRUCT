const express = require("express");
const path = require("path");
const app = express();
const rutasProducts = require("./routes/products.js");
const rutasUsers = require("./routes/users.js");
const rutasMain = require("./routes/main.js");
const rutasShopping = require("./routes/shopping.js");
const res = require("express/lib/response");
const session = require("express-session");
const cookies = require('cookie-parser')
const methodOverride = require("method-override"); //para poder usar los metodos PUT y DELETE en el parametro method del HTML
const userLoggedMiddleware = require("./middleWares/userLoggedMiddleware");
//const nodeFetch = require('node-fetch');

const productsApiRoutes = require ('./routes/api/productsApiRoutes')

app.use (methodOverride("_method"));

app.use(express.urlencoded({extended:false})); //para poder usar el metodo post, decimos que tomamos toda la info que llega desde un formulario

app.use(express.json());     //para poder trasnformarlo a un archivo .json

app.use(session({
    secret:"Shh, es un secreto",
    resave: false,
    saveUninitialized: false,
}));    

app.use(cookies()); 

app.use(userLoggedMiddleware); // a este lo ponemos despues del session ya que este usa el otro

//app.use(cookieParser())

const publicPath = path.resolve(__dirname, "../public");

//app.get("/", (req,res)=> {      //con esto redirigimos todas las rutas que entren en home a la ruta producto
//  res.redirect("/productos/")
//})

app.set("view engine", "ejs");

app.use(express.static(publicPath));

app.use("/", rutasMain);

app.use("/users", rutasUsers);

app.use("/products", rutasProducts);

app.use("/api/products", productsApiRoutes);

app.use("/shopping-cart", rutasShopping);

app.listen(3000, () => {
  console.log("servidor corriendo");
});
