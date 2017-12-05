var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
var port = 8080;


var Schema = mongoose.Schema;
var UserSchema = new Schema({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    userid: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },

    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationcode: { type: String }

});

const User = mongoose.model('User', UserSchema)
var myObj = {

    success: true,
    error: ""
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


                        }
                        else {
                            newUser = new User(req.body);
                            newUser.userid = User.count() + 1;
                            newUser.save(function (err, doc) {
                                if (err) throw err;
                                else {
                                    // console.log(doc);  
                                    console.log("User Created");
                                    myObj.success = true;
                                    res.send(myObj);
                                }
                            });


                            //

                        }

                    }
                });
            }


        }
    });




}

const verify = function (email, code) {
    User.findOne({ email: email }, function (err, user) {
        if (err) throw err;
        else {
            if (user.verificationcode == code) {
                res.send.json({
                    success: true
                });
            }
            else {
                res.send.json({ 
                    success: false
                 });
            }
        }
    })

}

module.exports = {
    User: User,
    addData: addData,
    verify: verify
}