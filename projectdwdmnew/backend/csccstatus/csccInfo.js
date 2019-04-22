var s= require("../snmp/SnmpGet");
var csccparser=require("./csccParser")

async function csccResult(ip,oid)
{ var p1=null;
  return new Promise(async (resolve,reject)=>{
    let mainObj = new s.Get(ip, oid, "on");
    try {
    let res=await mainObj.snmpGetCall();
    //console.log(res);
    p1=csccparser.csccParse(res);
    //console.log(p1);
    resolve(p1); 
    }
    catch (error) 
    {
        reject(error);
    }    
  });
}
module.exports={csccResult}
//csccResult("192.168.115.230","1.3.6.1.4.1.5380.3.2.5.1.1.3") 