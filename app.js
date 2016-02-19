var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/Thermostat.html');
});

app.listen(3000, function() {
  console.log('Thermostat app listening on port 3000!');
})

app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
