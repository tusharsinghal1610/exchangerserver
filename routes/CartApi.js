var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
Cart = require('../models/CartModel.js');

var port = 8080;

app.get('/', (req, res) =>{
    Cart.addToCart(req, res);
});
app.get('/getcart/',(req,res)=>{
    Cart.getCart(req, res);
});
app.get('/delete/',(req,res)=>{
    Cart.deleteFromCart(req, res);
});
app.get('/updateChoice/',(req,res)=>{
    Cart.updateChoice(req,res);
})
app.get("/getCartId/",(req,res)=>{
    Cart.getCartId(req,res);
})
module.exports = app;
