var network=[];

function set(ip,no_nodes,status,node,link,datetime)
{
    network.push({"network_id":ip,"no_of_nodes": no_nodes, "status":status,"nodes":node,"links":link,"datetime":datetime});
}
module.exports={network,set}