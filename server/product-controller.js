var mongojs = require('mongojs');
var db = mongojs('mongodb://root:root@ds045785.mongolab.com:45785/list', ['catalog']);
var fs = require('fs');
var path = require('path');

module.exports.list = function(req, res) {
	db.catalog.find(function (err, docs) {
		res.json(docs);
	});
};

module.exports.addition = function(req, res) {
	if(req.files.file) {
		var file = req.files.file;
		var tempPath = file.path;
		var targetPath = path.resolve('app/uploads/' + file.name);
		var rstream = fs.createReadStream(tempPath);
		var fstream = fs.createWriteStream(targetPath);
		rstream.pipe(fstream);
		fstream.on('close', function(err) {
			console.log(err);
		});
		db.catalog.insert({data: req.body, path: 'app/uploads/' + file.name}, function(err, doc) {
			res.send({ok: 200});
		});
	} else {
		db.catalog.insert({data: req.body, path: ' '}, function(err, doc) {
			res.send({ok: 200});
		});
	}
};

module.exports.removal = function(req, res) {
	var id = req.params.id;
	db.catalog.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.send({ok: 200});
	});
};

module.exports.change = function(req, res) {
	var id = req.params.id;
	db.catalog.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
};

module.exports.update = function(req, res) {
	var id = req.params.id;
	if(req.files.file) {
		var file = req.files.file;
		var tempPath = file.path;
		var targetPath = path.resolve('app/uploads/' + file.name);
		var rstream = fs.createReadStream(tempPath);
		var fstream = fs.createWriteStream(targetPath);
		rstream.pipe(fstream);
		fstream.on('close', function(err) {
			console.log(err);
		});
		db.catalog.findAndModify({query: {_id: mongojs.ObjectId(id)},
			update: {$set: {data: req.body, path: 'app/uploads/' + file.name}},
			new: true}, function(err, doc) {res.send({ok: 200});});
	}
	else {
		db.catalog.findAndModify({query: {_id: mongojs.ObjectId(id)},
			update: {$set: {data: req.body}},
			new: true}, function(err, doc) {res.send({ok: 200});});
	}
};
