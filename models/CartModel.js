var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
User = require('../models/UserModel.js');
Product = require('../models/ProductModel.js');
var fs = require('fs');

var Schema = mongoose.Schema;
var productDetail = {
    productId: { type: String },
    price: { type: Number },
    rent: { type: Number },
    choice: { type: Number },
    productName: { type: String }
}
CartSchema = new Schema({
    userId: { type: String },
    productDetails: [productDetail],
    count: { type: Number }
})
const Cart = mongoose.model('Cart', CartSchema);

const addToCart = function (req, res) {
    Cart.findOne({ userId: req.query.userId }, function (err, current_cart) {
        if (err) throw err;
        var product = {
            productId: req.query.productId,
            price: req.query.price,
            rent: req.query.rent,
            productName: req.query.productName,
            choice: ""
        }
        if(req.query.rent==null)
        {
            product.choice = 1;

        }
        else
        {   if(req.query.price!=null)
            product.choice = 1;
            else
                 product.choice = 2;
        }
        if (current_cart == null) {
            var array = []
            newCart = new Cart({
                userId: req.query.userId,
            });

            array.push(product);
            newCart.productDetails = array;
            newCart.count = array.length;
            newCart.save();
            res.send({ success: true });
        }
        else if (current_cart != null) {
            var array = [];
            array = current_cart.productDetails;
            array.push(product);
            current_cart.productDetails = array;
            current_cart.count = array.length;
            current_cart.save();
            res.send({ success: true });
        }

        Product.ProductModel.findOne({productId:productId}, function(err, current_product){
            var array = current_product.carts;
            array.push(current_cart.userId);
            current_product.carts = array;
            current_product.save();
        })
    })
}

const getCart = function (req, res) {
    Cart.findOne({ userId: req.query.userId }, function (err, cart) {

        if (cart != null) {
            var products = cart.productDetails;
            var sum = 0
            for (var i = 0; i < products.length; i++) {
                if (products[i].choice == 2) {
                    sum = sum + products[i].rent;
                }
                if (products[i].choice == 1) {
                    sum = sum + products[i].price;
                }
            }
            res.send({
                productDetails: cart.productDetails,
                totalPrice: sum,
                empty: false
            })
        }
        else {
            res.send({
                empty: true
            })
        }


    })
}
const deleteFromCart = function(req, res){
    Cart.findOne({userId :req.query.userId}, function(err, cart){
        if(err) throw err;
        else{
            products = cart.productDetails;
            for(var i=0;i<products.length;i++)
            {
                if(products[i].productId == req.query.productId)
                {
                    products.splice(i,1);
                   
                }
            }
            cart.count-=1;
            res.send({success:true});
            cart.productDetails = products;
            cart.save(function(err){if(err) throw err;});
        }
    })
}
const updateChoice = function (req, res) {
    Cart.findOne({ userId: req.query.userId }, function (err, cart) {
        if (err) throw err;
        else {
            products = cart.productDetails;
            for (var i = 0; i <= products.length; i++) {
                if (products[i].productId == req.query.productId) {
                    products[i].choice = req.query.choice;
                    break;

                }
            }
            cart.productDetails = products;
            cart.save();
            res.send({ success: true });

        }

    })
}
const getCartId = function(req, res){
    Cart.CartModel.findOne({userId:user.userid}, function(err, cart){
        products = cart.productDetails;
        array=[]
        for(var i = 0;i<products.length;i++){
            array.push(products[i].productId);
            
        }
        //console.log("the array is"+array);
        res.send({success:true, userid:user.userid, firstname : user.firstname, products:array});
    })
}

module.exports = {
    CartModel: Cart,
    addToCart: addToCart,
    getCart: getCart,
    deleteFromCart: deleteFromCart,
    updateChoice:updateChoice,
    getCartId:getCartId
}