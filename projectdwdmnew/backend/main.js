var c=require("./values/Constants")
var oid=require("./values/oids")
var result=require("./snmp/SnmpHandler")
var pathana=require("./Functions/pathAnalysis1")
async function main(IP)
{
    c.IPAddress = IP;//"192.168.115.230";  
    await result.Result(c.IPAddress,oid.agentoid);
   setTimeout(
       async function()
        {
            console.log("???after result function");
            let flag=await pathana.pathanalysis1();
            console.log(flag);
        }
    ,5000);
    console.log("///last of main function///");
}
main("192.168.115.230");
module.exports={main}