console.log('Loaded');

     var img=document.getElementById("move");
     var marginLeft=0;
     function moveRight(){
      marginLeft=marginLeft+5;
      img.style.marginLeft=marginLeft+'px';
     }
     
     
     img.onclick=function(){
         var interval=setInterval(moveRight, 50);
     };
     var element=document.getElementById('counter');
     var i=0;
     element.onclick=function(){
         
         
         var span=document.getElementById('count');
         
         span.innerHTML=i++;
         
         
     };