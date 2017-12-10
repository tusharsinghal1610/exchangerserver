var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'exchangerapp123@gmail.com',
      pass: 'sudhanshu123'
    }
  });
Cart = require('../models/CartModel.js');
var mailOptions = {
    from: 'exchangerapp123@gmail.com',
    to: '',
    subject: 'Verification Code',
    text: 'Your code is'
  };
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
var port = 8080;


var Schema = mongoose.Schema;

var productObj = {
    productId: { type: String },
    price: { type: Number },
    rent: { type: Number },
    category: { type: String },
    productName: { type: String },
    type: { type: String },
    img1: {type: String}
}
var UserSchema = new Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    userid: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact:{type: String},
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationcode: { type: String },
    myProducts:[productObj]

});

const User = mongoose.model('User', UserSchema)
var myObj = {

    success: true,
    error: "",
    userid: ""
};
const addData = function (req, res) {

    var data = req.body;
    var query = User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        else {
            console.log("hello this is user");
            //console.log(user);
            if (user != null) {
                myObj.success = false;
                myObj.error = "This Email is already registered";
                res.send(myObj);

            }

            else {

                var Contacts_query = User.findOne({ contact: req.body.contact }, function (err, user1) {
                    if (err) throw err;
                    else {
                        if (user1 != null) {
                            myObj.success = false;
                            myObj.error = "This Phone Number is already registered. Please try some other Phone Number";
                            res.send(myObj);
                            console.log(user1);


                        }
                        else {
                           
                             User.count(function(err, c){
                                newUser = new User(req.body);
                                 newUser.userid = c + 1;
                                 console.log(newUser.userid)
                                 newUser.save(function (err, doc) {
                                    if (err) throw err;
                                    else {
                                        // console.log(doc);  
                                        console.log("User Created");
                                        myObj.success = true;
                                        myObj.userid = newUser.userid;
                                        mailOptions.to = newUser.email;
                                        mailOptions.text = mailOptions.text + " " + newUser.verificationcode;
                                        transporter.sendMail(mailOptions, function(error, info){
                                            if (error) {
                                              console.log(error);
                                            } else {
                                              console.log('Email sent: ' + info.response);
                                            }
                                          });
                                        res.send(myObj);
                                    }
                                });
    
                            }) ;

                           
                           

                        

                        }

                    }
                });
            }


        }
    });




}

const verify = function (email, code, res) {
    
    User.findOne({ email: email }, function (err, user) {
        if (err) throw err;
        else {
            if (user.verificationcode == code) {
                res.send({
                    success: true
                });
                user.isVerified = true;
                user.save();
            }
            else {
                res.send({ 
                    success: false
                 });
            }
        }
    })

}

const Login = function(email, password, res){
    currentUser = User.findOne({email:email, password:password}, function(err, user){
        if(err) throw err;
        else{
            if(user==null)
            {
                res.send({success:false});
            }
            if(user!=null)
            {

                Cart.CartModel.findOne({userId:user.userid}, function(err, cart){
                    products = cart.productDetails;
                    array=[]
                    for(var i = 0;i<products.length;i++){
                        array.push(products[i].productId);
                        
                    }
                    console.log("the array is"+array);
                    res.send({success:true, userid:user.userid, firstname : user.firstname, products:array});
                })
               
            }

        }
    })
}
const getMyProducts = function(req, res){
    User.findOne({userid:req.query.userId},function(err, user){
        if(err) throw err
        else
        {

        res.send({
            myProducts:user.myProducts
            
        });
    
}
    });
}
module.exports = {
    UserModel: User,
    addData: addData,
    verify: verify,
    Login: Login,
    getMyProducts:getMyProducts
    
}