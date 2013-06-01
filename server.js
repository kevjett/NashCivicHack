var express = require('express'),
	host = express();

// Parse request JSON body
host.use(express.bodyParser());



// serve static files
host.use(express.static(__dirname + '/app'));

host.listen(5000);
console.log('Server running at http://localhoat:5000/');