var gcm = require('./gcm');
var push = require('./handlers/push');

var db_push = push.db;

exports.mornitoring = function () {
    setInterval(function() {
      db_push.find({}, getPushCondition);  
    }, 1000 * 5);  
};

getPushCondition = function(error, results) {
	// isOutHome(results[0]);
	// isInHome(results[0]);
}

var prev = 0;
//집을 나갔는지 검사.
var isOutHome = function(home, now, m_duid){
	if(prev == 0){
		prev = now;
	}

	if (prev == home){
		if(home != now){
			console.log("집을 나갔습니다.");
  			// gcm.pushMessage("WAF알람", "다녀오세요~", token);
		}
	}
	prev = now;
}

//집을 들어오는지 검사.
var isInHome = function(home, now, m_duid){
	if(prev == 0){
		prev = now;
	}

	if (prev != home){
		if(home == now){
			console.log("집에 들어왔습니다.");
  			// gcm.pushMessage("WAF알람", "다녀오세요~", token);
		}
	}
	prev = now;
}


// var token = 'eF2GBh6FTBo:APA91bHPX_uuaBYcFdzvN_W7aULxLQzYf7oybxHLkVmSKT-KMyj0cGsh-PZrttZTHKtCcXyA2olx7sAg625ZpdPZ7DHc5dm0QefPVbzanREpqIaJ-73_zGObD43sS2FOwt3fYwCB8rkx';
  // gcm.pushMessage("타이틀", "메시지", token);
