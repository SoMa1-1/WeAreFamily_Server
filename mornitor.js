var gcm = require('./gcm');
var gps = require('./handlers/gps');
var home = require('./handlers/home');

var db_gps = gps.db;
var home = home.db;

exports.mornitoring = function () {
    setInterval(function() {
      db_gps.find({}, getPushCondition);  
    }, 1000 * 3);  
};

getPushCondition = function(error, results) {
  console.log(results[0]);

  var token = 'eF2GBh6FTBo:APA91bHPX_uuaBYcFdzvN_W7aULxLQzYf7oybxHLkVmSKT-KMyj0cGsh-PZrttZTHKtCcXyA2olx7sAg625ZpdPZ7DHc5dm0QefPVbzanREpqIaJ-73_zGObD43sS2FOwt3fYwCB8rkx';
  gcm.pushMessage("타이틀", "메시지", token);
}


