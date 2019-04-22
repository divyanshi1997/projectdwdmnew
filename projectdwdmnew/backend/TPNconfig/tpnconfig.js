var s= require("../snmp/SnmpGet");
var tpnparser=require("./tpnParser");
var subrack=require("../subrackinfo/subrackinfo");
async function TPNResult(ip,tpnoid,subrackoid)
{ 
  return new Promise(async (resolve,reject)=>{
  try{
    var info=await subrack.subrackResult(ip,subrackoid);
    //console.log("*******rack info",info);
    var tpn_info=[];
        for(y=0;y<info.length;y++)
        {
          var newoid=tpnoid+".1.6"+"."+info[y].rack_no+"."+info[y].subrack_no+".0.0.0";
          var value="";

          let mainObj = new s.Get(ip, newoid, "on");
          try 
          {
              let res1=await mainObj.snmpGetCall();
              //console.log(res1);
              value=tpnparser.tpnParse(res1);
              if(value.length==0)
                 value=null;
          }
          catch (error) 
          {
              console.log(error);
          } 
          
          tpn_info.push({"rack_no":info[y].rack_no,"subrack_no":info[y].subrack_no,"info":value});
        }
      //console.log(tpn_info);
      resolve(tpn_info);
    }
  catch(error)
  {
    reject(error);
  }
  });
}

module.exports={TPNResult}
//TPNResult("192.168.115.230","1.3.6.1.4.1.5380.3.2.5.2.18.12","1.3.6.1.4.1.5380.3.2.5.1.18.10")