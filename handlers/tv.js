/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var db = new Datastore({ filename: './data/tv', autoload: true });  

 exports.create = function(req, res) {  
	var body = req.body;

	_insertTv(body , function(error, results) { 
		res.json( {error: error, results: results});
	});

	setTimeout(function() {
		db.remove({ code: body.code }); 
	}, 1000 * 60 * 3);
}; 

 exports.read = function(req, res) { 
	var where = req.query;
	_findTv(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updateTv(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removeTv(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertTv(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var tv = {
		t_duid: body.t_duid,
		ip: "172.16.101.27",
		code: body.code,
		duration: "9999"
	};
	db.insert(tv, callback);  
} 
 
function _findTv(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 
 
function _updateTv(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removeTv(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}