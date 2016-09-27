console.log('Loaded!');
var button=document.getElementById('counter');
 button.onclick=function(){
     var request= new XMLHttpRequest();
     request.onreadystatechange=function(){
         if(request.reeadystate===200){
             var counter=request.responseText;
             var span=document.getElementById('count');
             span.innerHTML=counter.toString();
             
         }
     };
     request.pen('GET','http://mokshagna517.imad.hasura-app.io/',true);
     request.send(null);
 };