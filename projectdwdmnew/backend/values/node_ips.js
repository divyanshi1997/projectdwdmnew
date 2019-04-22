var node_IPs=[];
function set(ip,status,GNEflag)
{
    node_IPs.push({ip,status,GNEflag}); 
}

module.exports={node_IPs,set}