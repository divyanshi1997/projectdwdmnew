async function wss_direction_action(db,source_node_ip,card_direction,lambda) // card direction and wss direction
{
    //console.log("in wss_direction_action",source_node_ip,card_direction,lambda);
    
    return new Promise(async (resolve,reject)=>{
        let channel_config_action;
        let direction_action=[];
    try
    {
        await db.collection("path_analysis").find({}, { sort: { datetime: -1 }, limit: 1 }, async function (err, Nodes) {
            if (err) throw err;
            await Nodes.forEach(async function (result) {
                for(let i=0;i<result.node_info.length;i++)
                {
                    if(result.node_info[i].node_ip==source_node_ip)
                    {
                        for(let j=0;j<result.node_info[i].WSS_info.length;j++) //card action
                            {
                                    if(result.node_info[i].WSS_info[j].direction==card_direction+"_DROP" ||result.node_info[i].WSS_info[j].direction==card_direction+"_ADD" ||result.node_info[i].WSS_info[j].direction==card_direction)//card_direction[k]
                                    {
                                        //console.log(result.node_info[i].WSS_info[j].direction);
                                        channel_config_action=result.node_info[i].WSS_info[j].wss_channel.channels[lambda-1].Action;
                                        if(channel_config_action>=9)
                                            channel_config_action="ADD_DROP";    
                                        direction_action.push({"direction":result.node_info[i].WSS_info[j].direction,"action":channel_config_action});
                                        //console.log(direction_action);
                                    }
                            }
                        break;
                    }
                }
            });
            resolve(direction_action);
        });
        
    }
    catch(error)
    {
        reject(error);
    }
    });   
}
module.exports={wss_direction_action}