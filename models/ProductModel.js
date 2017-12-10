var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
User = require('../models/UserModel.js');
Cart = require('../models/CartModel.js');
var fs = require('fs');

var Schema = mongoose.Schema;
ProductSchema = new Schema({
    productName: {type:String},
    userid:{type:String},
    productId:{type:String},
    //name:{type:String},
    keywords:{type:String},
    email:{type:String},
    type:{type:String},
    category:{type:String},
    description:{type:String},
    price:{type:String},
    rent:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    img1:{type:String},
    img2:{type:String},
    img3:{type:String},
    img4:{type:String},
    count: {type:Number, default:0},
    carts:[{type:Number}]
}); 
const Product = mongoose.model('Product', ProductSchema);

const addPicture=function(req,currentFile,fileName,callback){
    currentFile.mv('./public/images/'+fileName,callback)

  Product.findOne({productId:req.body.productId}, function(err, current_product){
        console.log(req.body.productId + "   "  +current_product.count);
        current_product.count = current_product.count +1;
        if(current_product.count==1)
        current_product.img1 = fileName;
        else if(current_product.count==2)
        current_product.img2 = fileName;
        else if(current_product.count==3)
        current_product.img3 = fileName;
        else
        current_product.img4 = fileName;  

        current_product.save(function(err){
            if(err) throw err;
        });
    });
}


const uploadData = function(req, res){
       Product.findOne({productId:req.body.productId}, function(err, current_product){
        if (err) throw err;
        else
        {
            current_product.productName=req.body.productName;
            current_product.userid = req.body.userid;
            current_product.productId = req.body.productId;
            current_product.type = req.body.type;
            current_product.rent = req.body.rent;
            current_product.price = req.body.price;
            current_product.description = req.body.description;
            current_product.category = req.body.category;
            current_product.email = req.body.email;
            current_product.keywords = req.body.keywords;
            User.UserModel.findOne({userid : req.body.userid}, function(err, user){
                current_product.latitude = user.latitude;
                current_product.longitude = user.longitude;
                current_product.save();
                var products = user.myProducts;
                var product = {
                    productId: req.body.productId,
                    price: req.body.price,
                    rent: req.body.rent,
                    productName: req.body.productName,                    
                }
               
                products.push(product);
                user.myProducts = products;
                user.save();
                res.send({success:true});
            });

        }
    })
}

const getproductid = function(req, res){
    Product.count(function(err, c){
        if(err){
            throw err;
        } 
        else{
            productId = c+1;
            newProduct = new Product({ productId:productId });
            newProduct.save();
            console.log(productId);
            res.send({
                productId : productId
            })
            
        }
    })
}
const filterProductByCategory = function(req, res){
    Product.find({category:req.query.category}, function(err, products){
        console.log(req.query.category);
      
        productList = [];
        if(products.length==0)
        {
            res.send({empty:true})
        }
        else{
            for (var i=0;i<products.length;i++)
            {   console.log(products[i]);
                var details = {
                    img1:products[i].img1,
                    type: products[i].type,
                    productName: products[i].productName,
                    price: products[i].price,
                    rent: products[i].rent,
                    productId:products[i].productId
                }
                productList.push(details);
            
            }
            res.send({productList:productList, empty:false});
           
        }
    })
}
const editProduct = function(req, res){
    Product.findOne({productId:req.query.productId, userid:req.query.userId}, function(err, current_product){
        res.send({product:current_product});

    })
}
const removeProduct = function(req, res){
    Product.remove({productId:req.query.productId, userid:req.query.userId},function(err, current_product){
        if(err) throw err;
        else{
            var carts = current_product.carts;
            for(var  i = 0;i<carts.length;i++)
            {
                Cart.CartModel.findOne({userId : carts[i]}, function(err, current_cart){
                 var cart_items =current_cart.productDetails;
                 for(var j=0;j<cart_items.length;j++){
                     if(cart_items[i].productId==req.query.productId)
                     {
                           cart_items[i].choice = 3;

                     }
                 }
                 current_cart.save(function(err){if (err) throw err;})
                })
            }
            res.send({success:true})

        }
    })
}
module.exports = {
    ProductModel:Product,
    addPicture:addPicture,
    getproductid:getproductid,
    uploadData: uploadData, 
    filterProductByCategory: filterProductByCategory,
    editProduct:editProduct,
    removeProduct:removeProduct
}