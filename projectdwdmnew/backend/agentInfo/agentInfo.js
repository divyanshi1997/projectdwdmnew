var c=require("../values/Constants")
var oids=require("../values/oids")
var n=require("../values/nodes")
var node_IP=require("../values/node_ips")
var net=require("../values/Network")
var connect=require("../values/conn_direct")
var changeip=require("../Functions/ChangeOID")
var snmpdb=require("../database/snmpdb")

function agentInfo(hashmap)
{
   var ip=[];
   var result=require("../snmp/SnmpHandler");
   for(i=1,j=0;i<=c.no_nodes;i++,j++)
   {
     var v=(hashmap.get("agentinfo"+i)).toString().split(",");
     var gne=false;
     if(v[2]==1)
        gne=true;
     if(node_IP.node_IPs.length>0)
     {
      var flag=0
      for(k=0;k<node_IP.node_IPs.length;k++)
      {
         if(node_IP.node_IPs[k].ip==v[6])
         {
            flag=1;
         }
      }
      if(flag==0) 
         node_IP.set(v[6],false,gne);  
     }
     else
         node_IP.set(v[6],false,gne);
     ip[j]=v[6];
   }
   for(j=1;j<=c.no_nodes;j++)
   {
      var no_link=0;
      var v=(hashmap.get("agentinfo"+j)).toString().split(",");
      var conn=(hashmap.get("connection"+j)).toString().split(",");
      var dir=(hashmap.get("direction"+j)).toString().split(",");

      for(k=0;k<=c.no_nodes;k++)
      {
         var d=null;
         if(conn[k]==1)
         {
            if(dir[k]==1)
               d="EAsT";
            if(dir[k]==2)
               d="WEST";
            if(dir[k]==3)
               d="NORTH";
            if(dir[k]==4)
               d="SOUTH";
            if(dir[k]==5)
               d="NORTH_EAST";
            if(dir[k]==6)
               d="NORTH_WEST";
            if(dir[k]==7)
               d="SOUTH_EAST";
            if(dir[k]==8)
               d="SOUTH_WEST";
            if(d!=null)
            {
               connect.set(v[6],ip[k],d); 
               no_link++;  
            }
            
         }
      }

     var l=n.node.length;
     if(l>0)
     {
        var match=1;
         for(x=0;x<l;x++)
         {
             if(n.node[x].id==v[6])
               { 
                  match=0;
                  if(n.node[x].no_of_link<=no_link)
                        n.node[x].no_of_link=no_link;
               }  
           
         }
          if(match==1)
              n.set(v[6],v[1],no_link);
      }
     else
     {
      n.set(v[6],v[1],no_link);
     }   
   }
   for(x=0;x<node_IP.node_IPs.length;x++)
   {
      if(node_IP.node_IPs[x].status==false)
       {
         node_IP.node_IPs[x].status=true;
         if(node_IP.node_IPs[x].GNEflag==false)
         {
         var oid=changeip.ChangeOID(oids.agentoid,node_IP.node_IPs[x].ip);
         result.Result(c.IPAddress,oid); 
         }
       }
   }
   console.log(node_IP.node_IPs.length,"#######",c.count);
   if(node_IP.node_IPs.length==c.count)
   {
      console.log("///////////////////////////////////////");
      let date = require('date-and-time');
      let datetime =date.format( new Date(), 'DD/MM/YYYY HH:mm:ss');
      net.set(c.IPAddress,c.no_nodes,"ready",n.node,connect.conn,datetime);

      console.log("date and time=",net.network[0].datetime);
      //  console.log("node====",n.node);
      //  console.log("link====",connect.conn);
      //console.log("network====",net.network[0]);
      // console.log("=======",node_IP.node_IPs);
      snmpdb.snmpdb(net.network[0]);
   }
}
module.exports={agentInfo}