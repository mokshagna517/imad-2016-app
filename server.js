var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user: 'mokshagna517',
    db: 'mokshagna517',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));
var articles={
articleone: {title: "Article One",
    para1: "This is article one",
    heading: "My favorite food items",
    content:  `<li>Chicken Biryani</li>
                <li>Kesari</li>
                <li>Noodles</li>
                <li>Chocolate cake</li>`},
   
articletwo : {title: "Article Two",
     para1: "This is article two",
    heading: "My favorite actors and cricketers",
    content:  `<li>Mahesh Babu</li>
                <li>Virat Kohli</li>
                <li>Roger Federer</li>
                <li>Bruce Lee</li>`},
    
articlethree : {title: "Article Three",
     para1: "This is article three",
    heading: "My favorite brands in automobiles",
    content:  `<li>Audi</li>
                <li>Lambhorghini</li>
                <li>Mustang</li>
                <li>Ferrari</li>`}
       
                
                
    
};

function createTemplate( data){
    var tit=data.title;
    var para=data.para1;
    var head=data.heading;
    var cont=data.content;
    var htmlTemplate=`<html>    
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
 <script type='text/javascript' src='/ui/main.js'></script>
        
 </body>
</html>`;

return htmlTemplate;
}




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function(req,res){
   var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
var pool=new Pool(config);
app.get('/test-db',function(err,res){
    
    
    pool.query('SELECT name FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    var counter=0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});




    
});
var names=[];
app.get('/submit-name/:name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
});






app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img257.jpg'));
});

app.get('/ui/main.js', function(req,res){
    res.sendFile(path.join(__dirname, 'ui','main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
