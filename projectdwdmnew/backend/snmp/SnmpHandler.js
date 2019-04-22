var s= require("./SnmpGet");
var parser=require("../agentInfo/AgentParser")
var agentinfo=require("../agentInfo/agentInfo")
var c=require("../values/Constants")

async function Result(ip,oid)
{
  return new Promise(async (resolve,reject)=>{
    let mainObj = new s.Get(ip, oid, "on");
try {
  console.log("Snmp get call");
  let res=await mainObj.snmpGetCall();
  var p=parser.agentparse(res);
         c.count++;
         agentinfo.agentInfo(p);
  console.log("Snmp Get Data:");
  resolve();  
} catch (error) {
  c.count++;
  reject(error);
}    
  });
}
module.exports={Result}