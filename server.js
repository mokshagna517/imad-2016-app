var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/articleone', function(req,res){
    res.sendFile(path.join(__dirname, 'ui','articleone.html'));
});
app.get('/articletwo', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'articletwo.html'));
});
app.get('/articlethree', function(req,res){
    res.send("Article three requested");
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('https://lh3.googleusercontent.com/-81nCHljgMKc/VGS374TSQEI/AAAAAAAAABs/dinpzeyg1TkCG-JrvucRIn7hYaBP8t-LQCEw/w139-h140-p/img257.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img257.jpg'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
