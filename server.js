var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');
var config={
    user: 'mokshagna517',
    db: 'mokshagna517',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
   secret: "Somerandomstring",
   cookie: {maxAge: 1000*60*60*24*30}
}));
var pool=new Pool(config);
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
         <div id="comment_form">
         </div>
 <script type='text/javascript' src='/ui/article.js'></script>
        
 </body>
</html>`;

return htmlTemplate;
}




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/register',function(req,res){
    res.sendFile(path.join(__dirname, 'ui','register.html'));
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    
}



app.get('/hash/:input',function(req,res){
    var hashedstring=hash(req.params.input, "randomstring");
    res.send(hashedstring);
});


app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT into "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send("User successfully created his account with username"+username);
        }
        
    });
});
app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
        
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(403).send("Username/password is invalid");
            }
            else{
                var dbString=result.rows[0].password;
                var salt=dbString.split('$')[2];
                var hashedPassword=hash(password,salt);
                if(hashedPassword===dbString){
                    req.session.auth={userId: result.rows[0].id};
                    res.send("Logged in successfully as"+username);
                    
                }
                else{
                    res.send("password is incorrect");
                }
            }
        }
        
    });
    
});  
    
 app.get('/check-login',function(req,res){
     
     if(req.session&&req.session.auth&&req.session.auth.userId){
     res.send("You are logged in"+req.session.auth.userId.toString());
     }
     else{
         res.send("You are not logged in");
     }
     
 });   
    
  app.get('/logout', function(req,res){
     delete req.session.auth;
      res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
  }); 
    
app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(404).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comments (comment, article-id, user-id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!');
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});








app.get('/articles/:articleName', function(req,res){
    
    pool.query("SELECT * FROM articles WHERE title= '"+req.params.articleName+"'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
         else{
            if(result.rows.lenth===0){
                
                res.status(404).send("Article not found");
                
            }
            else{
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }
         
    }});
       
    }); 
   
    


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
app.get('/submit-name/?name',function(req,res){
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
app.get('/ui/register.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui','register.js'));
});
app.get('/ui/article.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
