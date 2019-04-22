var source_node_info=[];
var intermediate_node=[];
var intermediate_node_info=[]
var destination_node_info=[]

function source_node_info_set(ip,node_type,rack_no,subrack_no,slot_no,wss_direction)
{
    source_node_info.push({ip,node_type,rack_no,subrack_no,slot_no,wss_direction});
}

function intermediate_node_info_set(ip,node_type,wss_direction)
{
    intermediate_node_info.push({ip,node_type,wss_direction});
}

function destination_node_info_set(ip,node_type,rack_no,subrack_no,slot_no,wss_direction)
{
    destination_node_info.push({ip,node_type,rack_no,subrack_no,slot_no,wss_direction})
}

function clear_value()
{
    source_node_info=[];
    intermediate_node=[];
    intermediate_node_info=[]
    destination_node_info=[]
}
module.exports={}