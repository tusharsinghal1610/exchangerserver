var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
ProductApi = require('../models/ProductModel.js');

var port = 8080;


app.post('/',(req, res)=>{
    fileName="-"+Date.now()+req.files.file.name;    
    ProductApi.addPicture(req,req.files.file,fileName,function(err){
            if(err)
                throw err;

                res.json({
                success:true,
                message:fileName
            })
        })

});
app.post('/getproductid',(req, res)=>{
        ProductApi.getproductid(req,res);
})
app.post("/data", (req,res)=>{
    ProductApi.uploadData(req,res);
})
module.exports = app;
