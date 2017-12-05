var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
User = require('../models/UserModel.js');
var port = 8080;




app.post('/signup', (req, res) => {
    User.addData(req, res);
    //res.send(User.myObj);
    console.log(User.myObj);
}

);
app.post('/verify', (req,res)=>{
    User.verify(req.body.email, req.body.verificationcode);
    

}
);


module.exports = app;

