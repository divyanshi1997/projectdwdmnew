var node_info=[];
function set(node_ip,system_info,TPN_info,WSS_info,CSCC_info)
{
    node_info.push({"node_ip":node_ip,"system_info":system_info,"TPN_info":TPN_info,"WSS_info":WSS_info,"CSCC_info":CSCC_info});
}

module.exports={node_info,set}