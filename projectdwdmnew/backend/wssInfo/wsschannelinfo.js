var s= require("../snmp/SnmpGet");
var wsschannelparser=require("./wsschannelparser");
var wssdirection=require('./wssdirectioninfo');

async function wssChannelResult(ip,wsschannel_oid,wssdirection_oid)
{
  return new Promise(async (resolve,reject)=>{
    try
    { 
      var wss_info=[];
      var direct=await wssdirection.wssDirectionResult(ip,wssdirection_oid);
      //console.log("*******direction",direct);
      if(direct!=null)
      {
        var wsschannel;
        var newoid;
        for(let i=1;i<direct.length;i++)
        {
          if(direct[i].direction<20)
            newoid=wsschannel_oid+".1.2"+"."+2+direct[i].direction;
          else
          newoid=wsschannel_oid+".1.2"+"."+direct[i].direction;

          //console.log("///////",newoid);
          let mainObj = new s.Get(ip, newoid, "on");
          try 
          {
              let res1=await mainObj.snmpGetCall();
              //console.log(res1);
               wsschannel=wsschannelparser.wssChannelParse(res1);
              //console.log(wsschannel);
          }
          catch (error) 
          {
              console.log(error);
          } 
          if(direct[i].direction==0)
          direct[i].direction="DEFAULT";
          if(direct[i].direction==1)
          direct[i].direction="EAST_ADD";
          if(direct[i].direction==2)
          direct[i].direction="WEST_ADD";
          if(direct[i].direction==3)
          direct[i].direction="NORTH_ADD";
          if(direct[i].direction==4)
          direct[i].direction="SOUTH_ADD";
          if(direct[i].direction==5)
          direct[i].direction="NORTH_EAST_ADD";
          if(direct[i].direction==6)
          direct[i].direction="NORTH_WEST_ADD";
          if(direct[i].direction==7)
          direct[i].direction="SOUTH_EAST_ADD";
          if(direct[i].direction==8)
          direct[i].direction="SOUTH_WEST_ADD";
          if(direct[i].direction==11)
          direct[i].direction="EAST_DROP";
          if(direct[i].direction==12)
          direct[i].direction="WEST_DROP";
          if(direct[i].direction==13)
          direct[i].direction="NORTH_DROP";
          if(direct[i].direction==14)
          direct[i].direction="SOUTH_DROP";
          if(direct[i].direction==15)
          direct[i].direction="NORTH_EAST_DROP";
          if(direct[i].direction==16)
          direct[i].direction="NORTH_WEST_DROP";
          if(direct[i].direction==17)
          direct[i].direction="SOUTH_EAST_DROP";
          if(direct[i].direction==18)
          direct[i].direction="SOUTH_WEST_DROP";
          if(direct[i].direction==21)
          direct[i].direction="EAST";
          if(direct[i].direction==22)
          direct[i].direction="WEST";
          if(direct[i].direction==23)
          direct[i].direction="NORTH";
          if(direct[i].direction==24)
          direct[i].direction="SOUTH";
          if(direct[i].direction==25)
          direct[i].direction="NORTH_EAST";
          if(direct[i].direction==26)
          direct[i].direction="NORTH_WEST";
          if(direct[i].direction==27)
          direct[i].direction="SOUTH_EAST";
          if(direct[i].direction==28)
          direct[i].direction="SOUTH_WEST";
        
          wss_info.push({"direction":direct[i].direction,"wss_channel":wsschannel});   
        }

      }
      else wss_info=null;
      resolve(wss_info);
    }
    catch(error)
    {
      reject(error);
    }
  });
}
module.exports={wssChannelResult}
//wssChannelResult("192.168.115.230","1.3.6.1.4.1.5380.3.2.5.2.1.21","1.3.6.1.4.1.5380.3.2.5.2.1.20")