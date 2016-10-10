var Flint = require('node-flint');
var webhook = require('node-flint/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var app_url = process.env.APP_URL + "/flint";
console.log("app_url: " + app_url);
console.log("process.env.TOKEN_SPARK_BOT: " + process.env.TOKEN_SPARK_BOT);


// flint options
var config = {
    webhookUrl: app_url,
    token: process.env.TOKEN_SPARK_BOT,
    port: 8080,
    removeWebhooksOnStart: false,
    maxConcurrent: 5,
    minTime: 50
};

// init flint
var flint = new Flint(config);
flint.start();

// say hello
flint.hears('/hello', function(bot, trigger) {
    bot.say('Hello %s!', trigger.personDisplayName);
});

// add flint event listeners
flint.on('message', function(bot, trigger, id) {
    flint.debug('"%s" said "%s" in room "%s"', trigger.personEmail, trigger.text, trigger.roomTitle);
});

flint.on('initialized', function() {
    flint.debug('initialized %s rooms', flint.bots.length);
});

// define express path for incoming webhooks
app.post('/flint', webhook(flint));

// start express server
var server = app.listen(config.port, function () {
    flint.debug('Flint listening on port %s', config.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function() {
    flint.debug('stoppping...');
    server.close();
    flint.stop().then(function() {
        process.exit();
    });
});

// echo test
flint.hears('/echo', function(bot, trigger) {
    console.log("echo command");
    console.log("echo " + trigger.args.join(' '));
    bot.say(trigger.args.join(' '));
});

flint.hears('/getroomid', function(bot, trigger) {
    console.log("/getroomid");
    bot.say(bot.myroom.id);
});

// get xray
flint.hears('/getxray', function(bot, trigger) {
    var url = 'http://www.precisioncarenj.com/wp-content/uploads/2010/09/Lateral1.jpg';
    bot.file(url);
});
flint.hears('getxray', function(bot, trigger) {
    var url = 'http://www.precisioncarenj.com/wp-content/uploads/2010/09/Lateral1.jpg';
    bot.file(url);
});


// get mri
flint.hears('/getmri', function(bot, trigger) {
    var url = 'http://svdrads.com/images/home/grid/MRI-head-zoom-38266824-3.jpg';
    bot.file(url);
});
flint.hears('getmri', function(bot, trigger) {
    var url = 'http://svdrads.com/images/home/grid/MRI-head-zoom-38266824-3.jpg';
    bot.file(url);
});



// get patient record
flint.hears('/gethistory', function(bot, trigger) {
    var url = 'https://www.med.unc.edu/medclerk/files/UMNwriteup.pdf';
    bot.file(url);
});

// get patient record
flint.hears('/getlastvisit', function(bot, trigger) {
    var url = 'https://www.litholink.com/downloads/CKD%20Patient1%20Example%20with%20Patient%20Handout.pdf';
    bot.file(url);
});

// get map
flint.hears('/map', function(bot, trigger) {
    bot.say('https://www.google.com/maps/place/12900+Park+Plaza+Dr,+Cerritos,+CA+90703/@33.8673616,-118.0592793,17z/data=!3m1!4b1!4m2!3m1!1s0x80dd2c57cbc9e363:0x25a07604cf1df1bb');
});

// get EMR record
flint.hears('/nextgen', function(bot, trigger) {
    bot.say('https://nextgen.com/Events/1344?c=nextgen');
    bot.say('https://www.google.com/?gws_rd=ssl#q=Patient:' + bot.myroom.title);
});
flint.hears('/getnextgen', function(bot, trigger) {
    bot.say('https://nextgen.com/Events/1344?c=nextgen');
    bot.say('https://www.google.com/?gws_rd=ssl#q=Patient:' + bot.myroom.title);
});

flint.hears('/emr', function(bot, trigger) {
    bot.say('https://www.google.com/?gws_rd=ssl#q=Patient:' + bot.myroom.title);
});
flint.hears('/getemr', function(bot, trigger) {
    bot.say('https://www.google.com/?gws_rd=ssl#q=Patient:' + bot.myroom.title);
});

flint.hears('/epic', function(bot, trigger) {
    bot.say('http://www.epic.com/Epic/Post/1146');
    bot.say('https://www.google.com/?gws_rd=ssl#q=Patient:' + bot.myroom.title);
});
flint.hears('/getepic', function(bot, trigger) {
    bot.say('http://www.epic.com/Epic/Post/1146');
    bot.say('https://www.google.com/?gws_rd=ssl#q=Patient:' + bot.myroom.title);
});

// get SIP URI
flint.hears('/geturi', function(bot, trigger) {
    console.log("/geturi command");
    bot.say(bot.myroom.sipAddress);
});