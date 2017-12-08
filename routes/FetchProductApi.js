var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
Product = require('../models/ProductModel.js');

var port = 8080;

app.get('/category/', (req, res) =>{
    Product.filterProductByCategory(req, res);
});
module.exports=app;