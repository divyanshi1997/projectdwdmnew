var s= require("../snmp/SnmpGet");
var wssdirectionparser=require("./wssdirectionparser")

async function wssDirectionResult(ip,oid)
{ var p1=null;
  return new Promise(async (resolve,reject)=>{
    let mainObj = new s.Get(ip, oid, "on");
    try {
    let res1=await mainObj.snmpGetCall();
    //console.log(res1);
    p1=wssdirectionparser.wssDirectionParse(res1);
    //console.log(p1);
    resolve(p1); 
    }
    catch (error) 
    {
        reject(error);
    }    
  });
}
module.exports={wssDirectionResult}
//wssDirectionResult("192.168.115.230","1.3.6.1.4.1.5380.3.2.5.2.1.20")