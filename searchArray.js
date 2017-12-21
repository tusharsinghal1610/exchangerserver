var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());

var fs = require('fs');

//arr=["hello","hye"];
array=[{"type":"electronics","category":"electronics","keywords":"jfgh dkjhg kfdjlgj fnnm bkn vm"},{"type":"electronics","category":"electronics","keywords":"jfgh dkjhg kfdjlgj fnnm bkn vm"},{"type":"electronics","category":"electronics","keywords":"jfgh dkjhg kfdjlgj fnnm bkn vm"},{"type":"electronics","category":"electronics","keywords":"gfdh ghgf jdhgk hfkjhjjh lfgjl"},{"type":"electronics","category":"electronics","keywords":"hgsd jbh vjcnb. vcbnc cvcc vmc ccjbkj "}];
const sendArray = function(){
    return array;
    console.log(array);
}

module.exports={sendArray:sendArray};