var express = require('express');
var _ = require('lodash');

var app = express();


app.use(express.static('.'));

app.get('/', function (req, res) {
  res.send('Hello World');
});

_.forEach(['a', 'b', 'c'], function(s){
  app.get('/test/' + s, function(req, res){
    res.send({val: 'mock-data-' + s});
  });
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
