var c =require("../values/Constants");
var n1=require("../values/node_ips");
var n2=require("../values/nodes");
var n3=require("../values/Network");
var n4=require("../values/conn_direct");
function clear()
{
    c.no_nodes=0;
    c.count=0;
    n1.node_IPs.length=0;
    n2.node.length=0;
    n3.network.length=0;
    n4.conn.length=0;
}
module.exports={clear}