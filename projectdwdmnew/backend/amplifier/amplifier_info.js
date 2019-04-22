var s= require("../snmp/SnmpGet");

async function amplifierResult(ip,oid)
{ var p1=null;
  return new Promise(async (resolve,reject)=>{
    let mainObj = new s.Get(ip, oid, "on");
    try {
    let res1=await mainObj.snmpGetCall();
    console.log(res1);
   // p1=wssdirectionparser.wssDirectionParse(res1);
    //console.log(p1);
    resolve(); 
    }
    catch (error) 
    {
        reject(error);
    }    
  });
}
//module.exports={amplifierResult}
amplifierResult("192.168.115.230","1.3.6.1.4.1.5380.3.2.5.2.1.24.1.7")//1.7 for BA, 1.8 for PA