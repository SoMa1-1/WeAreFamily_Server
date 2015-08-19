var gcm = require('./gcm');
var push = require('./handlers/push');

var db_push = push.db;

exports.mornitoring = function () {
    setInterval(function() {
      db_push.find({}, getPushCondition);  
    }, 1000 * 5);  
};

getPushCondition = function(error, results) {

	for(var i = 0; i < results.length; i++) {

		var home = new Object();
		home["t_duid"] = results[i].t_duid;
		home["lat"] = results[i].home_lat;
		home["lon"] = results[i].home_lon;

		var member = new Object();
		member["m_duid"] = results[i].m_duid;
		member["lat"] = results[i].lat;
		member["lon"] = results[i].lon;
		member["name"] = results[i].name;
		member["relation"] = results[i].relation;

		console.log("***** 위치 출력 *****");
		console.log("home : " + home.lat + " " + home.lon);
		console.log("member : " + member.lat + " " + member.lon);
		console.log("*******************");
		console.log("");

		isOutOrInHome(home, member);

	}
}

var prev_lat = 0;
var prev_lon = 0;

//집을 나갔는지 검사.
var isOutOrInHome = function(home, member){

	if(prev_lat == 0 || prev_lon == 0) {
		prev_lat = member.lat;
		prev_lon = member.lon;
	}

	if ( (prev_lat == home.lat) && (prev_lon == home.lon) ){
		if( (member.lat != home.lat) || (member.lon != home.lon) ) {
			console.log(member.name + "님(" + member.relation + ")이 집을 나갔습니다.");
  			gcm.pushMessage("We Are Family", member.name + "님 잘 다녀오세요~!", member.m_duid);
		}
	}

	if ( (prev_lat != home.lat) || (prev_lon != home.lon) ){
		if( (member.lat == home.lat) && (member.lon == home.lon) ) {
			console.log(member.name + "님(" + member.relation + ")이 집에 들어왔습니다..");
			gcm.pushMessage("We Are Family", member.name + "님 다녀오셨어요~!", member.m_duid);
		}
	}

	prev_lat = member.lat;
	prev_lon = member.lon;
}


// var token = 'eF2GBh6FTBo:APA91bHPX_uuaBYcFdzvN_W7aULxLQzYf7oybxHLkVmSKT-KMyj0cGsh-PZrttZTHKtCcXyA2olx7sAg625ZpdPZ7DHc5dm0QefPVbzanREpqIaJ-73_zGObD43sS2FOwt3fYwCB8rkx';
  // gcm.pushMessage("타이틀", "메시지", token);
