var Bot = require('slackbots');
var sqlite3 = require('sqlite3').verbose();

//const { urls, domain, slashtags } = commandParser(body.text)
// create a bot
var settings = {
    token: '',
    name: 'Sparky',
    as_user : true
};

var bot = new Bot(settings);

bot.on('start', function() {
    bot.postMessageToChannel('bot_testing', 'Hello channel!');
});

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm 
    console.log(data);
});


var db = new sqlite3.Database('sparky.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists user_info (info TEXT)");

  var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.info);
  });

});

db.close();