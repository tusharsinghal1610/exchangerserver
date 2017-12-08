var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
var fs = require('fs');

var Schema = mongoose.Schema;
ProductSchema = new Schema({
    product: {type:String},
    userid:{type:String},
    productid:{type:String},
    name:{type:String},
    type:{type:String},
    category:{type:String},
    price:{type:String},
    rent:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    img1:{type:String},
    img2:{type:String},
    img3:{type:String},
    img4:{type:String}
}); 
const Product = mongoose.model('Product', ProductSchema)


const addPicture=function(currentFile,fileName,callback){
    currentFile.mv('./public/images/'+fileName,callback)
}

const getproductid = function(req, res){
    Product.count(function(err, count){
        if(err){
            throw err;
        } 
        else{
            productId = count+1
            res.send({
                productId : productId
            })
        }
    })
}
module.exports = {
    addPicture:addPicture,
    getproductid:getproductid
}