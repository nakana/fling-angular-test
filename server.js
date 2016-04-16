var express = require('express');
var _ = require('lodash');

var app = express();


app.use(express.static('.'));

app.get('/', function (req, res) {
  res.send('Hello World');
});
app.get('/api/login/ok', function (req, res) {
  res.send({result: 'ok'});
});
app.get('/api/login/ng', function (req, res) {
  res.status(401).send({result: 'ng'});
});

app.get('/api/error/:status', function (req, res) {
  var status = req.params.status;
  res.status(status).send({result: 'ng', status: status});
});

_.forEach(['a', 'b', 'c'], function(s){
  app.get('/test/' + s, function(req, res){
    res.send({val: 'mock-data-' + s});
  });
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
