console.log('Loaded');

     var img=document.getElementById("move");
     var marginLeft=0;
     function moveRight(){
      marginLeft=marginLeft+1;
      img.style.marginLeft=marginLeft+'px';
     }
     
     
     img.onclick=function(){
         var interval=setInterval(moveRight, 50);
     };
     var element=document.getElementById('counter');
     
     element.onclick=function(){
         
         var request=new XMLHttpRequest();
         
         request.onreadystatechange=function(){
             if(request.readystate===200){
                 var counter=request.responseText;
                 var span=document.getElementById('count');
                 span.innerHTML=counter.toString();
             }
             
             
         };
         request.open('GET', 'http://mokshagna517.imad.hasura-app.io/counter',true);
         request.send(null);
         
         
     };