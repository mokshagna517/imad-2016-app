console.log('Loaded');
var c=0;
  var element=document.getElementById("counter");
  element.onclick=function(){
      
      
      c=c+1;
      var p=document.getElementById("count");
      p.innerHTML=c.toString();
      
      
  };