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
	return { total: list.length, list: list };
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
	var rtn = null;
	getData().on('record', function(row,index){
  		if (row.AIPPID === req.params.id) {
  			rtn = row;
  		}
	}).on('end', function(count) {
		if (rtn != null) {
			rtn.success = true;
			rtn.code = 200;
			res.send(rtn);
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