var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
var formidable = require('formidable');
var fs = require('fs');

var Schema = mongoose.schema;
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

const addPicture=function(currentFile,fileName,callback){
    currentFile.mv('./public/images/'+fileName,callback)
}
module.export = {
    addPicture:addPicture
}