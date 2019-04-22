var s= require("../snmp/SnmpGet");
var subparser=require("./subrackParser")

async function subrackResult(ip,oid)
{ var p1=null;
  return new Promise(async (resolve,reject)=>{
    let mainObj = new s.Get(ip, oid, "on");
    try {
    let res1=await mainObj.snmpGetCall();
    //console.log(res1);
    p1=subparser.subrackParse(res1);
    //console.log(p1);
    resolve(p1); 
    }
    catch (error) 
    {
        reject(error);
    }    
  });
}
module.exports={subrackResult}