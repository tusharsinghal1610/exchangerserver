var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
var SignupApi = require('./routes/SignupApi.js')
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
var port = 8080;

app.use('/', SignupApi);

var uri = 'mongodb://keshav:keshav@ds119355.mlab.com:19355/exchanger';
mongoose.connect(uri, function (err) {
    if (err) { throw err; }
});

console.log('hi');
app.listen(port, () => {
    console.log("Server listening on port " + port);
});



