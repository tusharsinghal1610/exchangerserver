var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
User = require('../models/UserModel.js');
var fs = require('fs');

var Schema = mongoose.Schema;
var productDetail={
    productId:{type:String},
    price:{type:Number},
    rent:{type:Number},
    choice:{type:String},
    productName:{type:String}
}
CartSchema = new Schema({
    userId:{type:String},
    
    productDetails:[productDetail], 
    count:{type:Number}
})
const Cart = mongoose.model('Cart', CartSchema);

const addToCart = function(req, res){
                     Cart.findOne({userId : req.query.userId}, function(err, current_cart){
                        if(err) throw err;
                        var product = {
                            productId:req.query.productId,
                            price:req.query.price,
                            rent:req.query.rent,
                            productName:req.query.productName
                        }
                        if(current_cart==null)
                         {
                            var array  = []
                           newCart = new Cart({
                               userId :req.query.userId,
                           });
                          
                           array.push(product);
                           newCart.productDetails = array;
                           newCart.count = array.length;
                           newCart.save();
                           res.send({success:true});
                         }
                         else if(current_cart!=null)
                         {
                             var array = [];
                             array = current_cart.productDetails;
                            array.push(product);
                            current_cart.productDetails = array;
                            current_cart.count = array.length;
                            current_cart.save();
                            res.send({success:true});
                         }
                     })
                 }

module.exports = {
    CartModel:Cart,
    addToCart:addToCart
}