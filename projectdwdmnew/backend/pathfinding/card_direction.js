async function card_direction(db,source_node_ip,rack_no,subrack_no,slot_index,lambda) 
{
    let card_direction = [];
    return new Promise(async (resolve, reject) => {
        try {
            await db.collection("path_analysis").find({}, { sort: { datetime: -1 }, limit: 1 }, async function (err, Nodes) {
                if (err) throw err;
                await Nodes.forEach(async function (result) {
                    for (let i = 0; i < result.node_info.length; i++) 
                    {
                        if (result.node_info[i].node_ip == source_node_ip) 
                        {
                            //console.log(result.node_info[i].node_ip);
                            for (let j = 0; j < result.node_info[i].TPN_info.length; j++) // card direction
                            {
                                //console.log(result.node_info[i].TPN_info[j].info);
                                if (result.node_info[i].TPN_info[j].rack_no == rack_no && result.node_info[i].TPN_info[j].subrack_no == subrack_no) {
                                    // console.log(result.node_info[i].TPN_info[j].info);
                                    for (let k = 0; k < result.node_info[i].TPN_info[j].info.length; k++) 
                                    {
                                        if (result.node_info[i].TPN_info[j].info[k].SlotIndex == slot_index && result.node_info[i].TPN_info[j].info[k].TxWavelengthNum == lambda) {
                                            card_direction.push({ "direction": result.node_info[i].TPN_info[j].info[k].Direction });
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    }
                });
                resolve(card_direction);
            });
             
        }
        catch (error) {
            reject(error);
        }
    });
}
module.exports = { card_direction }