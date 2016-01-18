var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var app = express();
var multipartMiddleware = multipart();
var productCtrl = require('./server/product-controller.js');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'




app.use(bodyParser.json());
app.use('/', express.static(__dirname + "/"));
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.get('/catalog', productCtrl.list);
app.post('/add', multipartMiddleware, productCtrl.addition);
app.delete('/catalog/:id', productCtrl.removal);
app.get('/catalog/:id', productCtrl.change);
app.post('/update/:id', multipartMiddleware, productCtrl.update);

server.listen(server_port, server_ip_address, function () {
	console.log( "Listening on " + server_ip_address + ", server_port " + port )
});