var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
User = require('../models/UserModel.js');
var fs = require('fs');

var Schema = mongoose.Schema;
var productDetail = {
    productId: { type: String },
    price: { type: Number },
    rent: { type: Number },
    choice: { type: Number, default: 1 },
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
    Cart.findone({ userId: req.query.userId }, function (err, cart) {
        if (err) throw err;
        else {
            products = cart.productDetails;
            for (var i = 0; i < products.length(); i++) {
                if (products[i].productId == req.query.productId) {
                    products[i].choice = req.query.choice;
                    break;
                }
            }
            cart.productDetails = products;
            cart.save();
            res.send({success:true})

        }

    })}

module.exports = {
    CartModel: Cart,
    addToCart: addToCart,
    getCart: getCart,
    updateChoice:updateChoice,
    deleteFromCart: deleteFromCart
}