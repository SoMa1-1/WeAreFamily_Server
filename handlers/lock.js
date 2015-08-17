/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var db = new Datastore({ filename: './data/lock', autoload: true });  

 exports.create = function(req, res) {  
	var body = req.body;

	_insertLock(body , function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.read = function(req, res) { 
	var where = req.query;
	_findLock(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updateLock(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removeLock(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertLock(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var lock = {
		m_duid: body.m_duid,
		date: new Date(),
		event: body.event
	};
	db.insert(lock, callback);  
} 
 
function _findLock(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 
 
function _updateLock(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removeLock(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}