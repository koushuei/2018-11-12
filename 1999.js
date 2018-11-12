var xhr = new XMLHttpRequest();
xhr.open('get',"https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery",true);
xhr.send();
console.log(xhr.responseText);
xhr.onload = function(){
  var data = JSON.parse(xhr.responseText);
  console.log(data);
  var area={};
  var type={};
  for(var i=0;i<data.length;i++){
    var a =data[i].ZipName_;
    var t=data[i].InformDesc_;
    if(a==undefined){
      area[a]=1;
    }else{
      area[a]+=1;
    }
    if(t==undefined){
      type[t]=1;
    }else{
      type[t]+=1;
    }
  }
  var zip=document.querySelector('#area');
  var desc=document.querySelector('#type');
  var area_name='<option>請選擇地區</option>';
  for(i in area){
    area_name+='<option value="'+i+'">'+i+'</option>';
  }
   zip.innerHTML=area_name;
  var type_name='<option>請選擇類型</option>';
  for(i in type){
    type_name+='<option value="'+i+'">'+i+'</option>';
  }
  desc.innerHTML=type_name;
  //----------------------------------------------------
  document.querySelector('.search').addEventListener('click',function(e){
  var a= document.querySelector('#area');
  var t= document.querySelector('#type');
  var list='';
    var sum=0;
  for(var i=0;i<data.length;i++){
    if(data[i].ZipName_==a.value && data[i].InformDesc_ == t.value){
      list+='<li><h4>地點：'+data[i].address_+'</h4><h5>報案狀況：'+data[i].BeforeDesc_
      +'</h5></li>';
      sum+=1;
    }
  }
    document.querySelector('.result').innerHTML= a.value+' '+t.value+'有'+sum+'處';
  document.querySelector('.list').innerHTML=list;
    console.log(list);
    })

}