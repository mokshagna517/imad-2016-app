var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articleone={
    title: 'Article One',
    para1: 'This is article one',
    heading: 'My favorite food items',
    content:  `<li>Chicken Biryani</li>
                <li>Kesari</li>
                <li>Noodles</li>
                <li>Chocolate cake</li>`
    
};

function createTemplate(data){
    var title=data.title;
    var para1=data.para1;
    var heading=data.heading;
    var content=data.content;


var htmlTemplate=`<!doctype html>
<html>
    <head>
        <title>
            ${title}
        </title>
        <link type="text/css" rel="stylesheet" href="/ui/style.css" />
    </head>
    <body>
        <div class="center">
            <p>
                ${para1}
            </p>
            <h3>${heading} </h3>
            <ul>
             ${content}
                
            </ul>
            
         </div>

        
 </body>
</html>`;
}






app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/articleone', function(req,res){
    res.send(createTemplate(articleone));
});
app.get('/articletwo', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'articletwo.html'));
});
app.get('/articlethree', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'articlethree.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img257.jpg'));
});
counter=0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});
app.get('/ui/main.js', function(req,res){
    res.sendFile(path.join(__dirname, 'ui','main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
