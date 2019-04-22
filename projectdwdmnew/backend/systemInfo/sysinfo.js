var s= require("../snmp/SnmpGet");
var parser=require("./SystemParser")

async function sysResult(ip,oid)
{
  return new Promise(async (resolve,reject)=>{
    let mainObj = new s.Get(ip, oid, "on");
try {
    console.log("Snmp get call");
    let res1=await mainObj.snmpGetCall();
    //console.log(res1);
    var p1=parser.SystemParse(res1);
    resolve(p1);  
    }
catch (error) 
    {
        reject(error);
    }    
  });
}
module.exports={sysResult}
   // sysResult("192.168.115.230","1.3.6.1.4.1.5380.3.2.5.1.1.1")