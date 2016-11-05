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
      request.open('GET','http://mokshagna517.imad.hasura-app.io/counter',true);
      request.send(null);
 };      

      var sub=document.getElementById('submit_btn');
      sub.onclick=function(){
          var request=new XMLHttpRequest();
          request.onreadystatechange=function(){
              if(request.readyState===XMLHttpRequest.DONE){
                  if(request.status===200){
                      var names=request.responseText;
                      names=JSON.parse(names);
                      var list='';
                      for(var i=0;i<names.length;i++){
                          list+='<li>'+names[i]+'</li>';
                      }
                      var ul=document.getElementById("namelist");
                      ul.innerHTML=list;
                      
                      
                  }
                  
              }
              
          };
          
var nameInput=document.getElementById("name");
              var name=nameInput.value;
              request.open('GET','http://mokshagna517.imad.hasura-app.io/submit-name/?name',true);
              request.send(null);
          
          
      };
    