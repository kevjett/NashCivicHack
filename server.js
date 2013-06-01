var express = require('express'),
	host = express(),
	data = require('./server/data');


// Parse request JSON body
host.use(express.bodyParser());


host.get('/data', data.findAll);
host.get('/data/:id', data.findById);
host.get('/data/:column/:search', data.findBySearch);


// serve static files
host.use(express.static(__dirname + '/app'));

host.listen(8081);
console.log('Server running at http://localhoat:8081/');