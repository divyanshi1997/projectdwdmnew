function wssDirectionParse(response)
{
  //console.log(response);
  var str1 = response.split("#");
  var no_direction=str1[0];
  var wssdirection=[];
  wssdirection.push({"no_of_direction":no_direction});
  if(no_direction>0)
  for(let i=1;i<str1.length;i++)
  {
    var str2 = str1[i].split("-");
    wssdirection.push({"direction":str2[5]});
  }
  else wssdirection=null;
  //console.log("direction",wssdirection);
  return wssdirection;
}
module.exports={wssDirectionParse}