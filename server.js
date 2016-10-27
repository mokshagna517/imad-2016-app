var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles={
articleone:
    {title: "Article One",
    para1: "This is article one",
    heading: "My favorite food items",
    content:  `<li>Chicken Biryani</li>
                <li>Kesari</li>
                <li>Noodles</li>
                <li>Chocolate cake</li>`},
articletwo :
     {title: "Article Two",
     para1: "This is article two",
    heading: "My favorite actors and cricketers",
    content:  `<li>Mahesh Babu</li>
                <li>Virat Kohli</li>
                <li>Roger Federer</li>
                <li>Bruce Lee</li>`},
articlethree : 
       {title: "Article Three",
     para1: "This is article three",
    heading: "My favorite brands in automobiles",
    content:  `<li>Mahesh Babu</li>
                <li>Virat Kohli</li>
                <li>Roger Federer</li>
                <li>Bruce Lee</li>`}
                
                
    
};

function createTemplate(data){
    var tit=data.title;
    var para=data.para1;
    var head=data.heading;
    var cont=data.content;
    var htmltemplate=`<html>    
    <head>
        <title>
            ${tit}
        </title>
        <link type="text/css" rel="stylesheet" href="/ui/style.css" />
    </head>
    <body>
        <div class="center">
            <p>
                ${para}
            </p>
            <h3>${head} </h3>
            <ul>
             ${cont}
                
            </ul>
            
         </div>

        
 </body>
</html>`;

return htmltemplate;
}






app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleName', function(req,res){
   var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img257.jpg'));
});
var counter=0;
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
