/** memoHandler.js **/ 

var Datastore = require('nedb'); 
var db = new Datastore({ filename: './data/gps', autoload: true });  

 exports.create = function(req, res) {  
	var body = req.body;

	_insertGps(body , function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.read = function(req, res) { 
	var where = req.query;
	_findGps(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.update = function(req, res, body) {  
	var where = req.query;
	var body = req.body;

	_updateGps(where, body, function(error, results) { 
		res.json( {error: error, results: results});
	});
}; 

 exports.remove = function(req, res, body) {  
	var where = req.query;

	_removeGps(where, function(error, results) { 
		res.json( {error: error, results: results});
	});
};

function _insertGps(body, callback) { 
	body = typeof body === 'string' ? JSON.parse(body) : body; 

	var gps = {
		m_duid: body.m_duid,
		date: new Date(),
		lat: body.lat,
		lon: body.lon
	};
	db.insert(gps, callback);  
} 
 
function _findGps(where, callback) { 
	where = where || {}; 
	db.find(where, callback);  
} 
 
function _updateGps(where, body, callback) { 
	db.update(where, {$set: body}, {multi: true}, callback);  
} 
 
function _removeGps(where, callback) { 
	db.remove(where, {multi: true}, callback); 
}