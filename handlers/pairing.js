/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var db = new Datastore({ filename: './data/pairing', autoload: true });  

 exports.create = function(req, res) {  
	var body = req.body;

	_insertPairing(body , function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.read = function(req, res) { 
	var where = req.query;
	_findPairing(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updatePairing(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removePairing(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertPairing(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var tv = {
		t_duid: body.t_duid,
		m_duid: body.m_duid,
		ip: body.ip,
		duration: body.duration
	};
	db.insert(tv, callback);  
} 
 
function _findPairing(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 
 
function _updatePairing(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removePairing(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}