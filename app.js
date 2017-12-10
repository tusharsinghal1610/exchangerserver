var mongoose = require('mongoose');
const fileupload=require('express-fileupload');
var app = require('express')();
var express = require('express');
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
var SignupApi = require('./routes/SignupApi.js')
var LoginApi = require('./routes/LoginApi.js')
var ProductApi = require('./routes/ProductUploadApi.js')
var FetchApi = require('./routes/FetchProductApi.js')
var CartApi = require('./routes/CartApi.js')
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(fileupload());
var port = 8080;

app.use('/signup', SignupApi);
app.use('/login', LoginApi);
app.use('/upload',ProductApi);
app.use(express.static('public'));
app.use('/fetch', FetchApi);
app.use('/cart', CartApi)
app.use('/user', userApi)
var uri = 'mongodb://keshav:keshav@ds119355.mlab.com:19355/exchanger';
mongoose.connect(uri, function (err) {
    if (err) { throw err; }
});


console.log('hi');
app.listen(port, () => {
    console.log("Server listening on port " + port);
});


