console.log('Loaded');
var c=0;
  var element=document.getElementById("counter");
  element.onclick=function(){
      var request=new XMLHttpRequest();
      request.onreadystatechange=function(){
          if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                c=request.responseText;
                var p=document.getElementById("count");
                p.innerHTML=c.toString();
            }  
              
              
          }
      };    
          
  };      

      
    