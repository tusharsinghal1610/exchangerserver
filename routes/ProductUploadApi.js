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


app.post('/upload',(req, res)=>{
    fileName="-"+Date.now()+req.files.file.name;    
    Product.addPicture(req,req.files.file,fileName,function(err){
            if(err)
                throw err;

                res.json({
                success:true,
                message:fileName
            })
        })

});
app.post('/getproductid',(req, res)=>{
        Product.getproductid(req,res);
})
app.post("/data", (req,res)=>{
    Product.uploadData(req,res);
})
app.get('/edit/', (req,res)=>{
    Product.editProduct(req, res);
})
app.get('/remove/',(req, res)=>{
    Product.removeProduct(req, res);
})
app.get('/description/',(req,res)=>{
    Product.productDescription(req,res);
});
app.get('/buyNow/',(req, res)=>{
    Product.buyNowDetails(req,res);
})
module.exports = app;
