console.log('Loaded');

     
     
     var element=document.getElementById('counter');
     
     
     element.onclick=function(){
         
         var request=new XMLHttpRequest();
         
         request.onreadystatechange=function(){
             if(request.readyState===XMLHttpRequest.DONE){
                 if(request.status===200){
                 var counter=request.responseText;
                 var span=document.getElementById('count');
                 span.innerHTML=counter.toString();
                 }
             }
             
             
         };
         request.open('GET', 'http://mokshagna517.imad.hasura-app.io/counter',true);
         request.send(null);
         
         
     };