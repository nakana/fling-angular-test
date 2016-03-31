//express-sample/app.js
var express = require('express');
var app = express();
//static ミドルウエア設定を追加
app.use(express.static('.'));
//ルーティング設定
app.get('/', function (req, res) {
  res.send('Hello World');
});
app.listen(3000);
console.log('Server running at http://localhost:3000/');
