var gcm = require('node-gcm');
var fs = require('fs');

var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        title: '푸쉬알람',
        message: 'Google Cloud Messaging 테스트',
        custom_key1: 'custom data1',
        custom_key2: 'custom data2'
    }
});


var server_api_key = 'AIzaSyBG5FLRhkW-RC0UPomnhR3A2jrRXPrjLl4';
var sender = new gcm.Sender(server_api_key);
var registrationIds = [];

var token = 'ffaI0yVrjAg:APA91bEXdNQc3M7OFItlpj2rdBgsFcu0ZGMJ3201sOtaCkAkPaA8I8VWOK8Uo1pE4V4AkpBQT8GdJTu4IO3M_beURnnO9MpSDRE0ZwGWac3W5yXb9aHfxcLA6BEjmnS3p37mnL1m349o';
registrationIds.push(token);

sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
});
