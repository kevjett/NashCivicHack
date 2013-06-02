'use strict';
var csv = require('csv');

var getData = function() {
	return csv().from('./data.csv', {columns: true});
};

var getProp = function(obj,prop){
  prop = (prop + "").toLowerCase();
  for(var p in obj){
     if(obj.hasOwnProperty(p) && prop == (p+ "").toLowerCase()){
           return obj[p];
      }
   }
   return undefined;
};

var returnList = function(list) {
	return { total: list.length, list: list, success: true, code:200 };
};

exports.findAll = function(req, res) {
	var data = [];
	getData().on('record', function(row,index){
  		data.push(row);
	}).on('end', function(count) {
		res.send(returnList(data));
	});
};

exports.findById = function(req, res) {
	var rtn = [];
	var ids = req.params.id.split(',');
	getData().on('record', function(row,index){
		for (var i = ids.length - 1; i >= 0; i--) {
			if (row.AIPPID === ids[i]) {
	  			rtn.push(row);
	  		}
		};
	}).on('end', function(count) {
		if (rtn.length > 0) {
			res.send(returnList(rtn));
		} else {
			res.send({error:'item not found', code:404, id:req.params.id, success:false});
		}
	});
};

exports.findBySearch = function(req, res) {
	var colfound = false,
		rtn = [];
	getData().on('record', function(row,index){
		var val = getProp(row,req.params.column);
		if(val == null) {
			return;
		}
		colfound = true;
 		if(val.toLowerCase().indexOf(req.params.search.toLowerCase()) !== -1) {
 			rtn.push(row);
		}
	}).on('end', function(count) {
		if (!colfound) {
			res.send({error:'column not found', code:404, column:req.params.column, search:req.params.search, success:false});
		} else {
			res.send(returnList(rtn));
		}
	});
};	