   

     

      var sub=document.getElementById("submit-btn");
      sub.onclick=function(){
          var request=new XMLHttpRequest();
          request.onreadystatechange=function(){
              if(request.readyState===XMLHttpRequest.DONE){
                  if(request.status===200){
                      console.log("user logged in");
                      alert("You logged in successfully ");
                      }
                      else{
                          alert("Error ");
                      }
                      
                      
                  }
                  
              
              
          };
          
var username=document.getElementById("user-name").value;
              var password=document.getElementById("pass-word").value;
               console.log(username);
              console.log(password);
              request.open('POST','http://mokshagna517.imad.hasura-app.io/login', true);
             
              request.setRequestHeader('Content-Type','application/json');
              request.send(JSON.stringify({username :username,password:password}));
          
          
      };
    