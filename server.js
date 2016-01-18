var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var app = express();
var multipartMiddleware = multipart();
var productCtrl = require('./server/product-controller.js');

app.use(bodyParser.json());
app.use('/', express.static(__dirname + "/"));
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.get('/catalog', productCtrl.list);
app.post('/add', multipartMiddleware, productCtrl.addition);
app.delete('/catalog/:id', productCtrl.removal);
app.get('/catalog/:id', productCtrl.change);
app.post('/update/:id', multipartMiddleware, productCtrl.update);

app.listen(8000);
console.log("Server running on port 8000");