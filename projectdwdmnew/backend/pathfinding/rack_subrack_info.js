var path_value=require("./path_values2")
async function rack_subrack_info(db, node_ip, wss_direction, lambda) {
    var rack_subrack;
    return new Promise(async (resolve, reject) => {
        try {
            await db.collection("path_analysis").find({}, { sort: { datetime: -1 }, limit: 1 }, async function (err, Nodes) {
                if (err) throw err;
                await Nodes.forEach(async function (result) {
                    for (let i = 0; i < result.node_info.length; i++) 
                    {
                        if (result.node_info[i].node_ip == node_ip) 
                        {
                            //console.log(result.node_info[i].node_ip);
                            for (let j = 0; j < result.node_info[i].TPN_info.length; j++) // card direction
                            {
                               if(result.node_info[i].TPN_info[j].info!=null)
                               {
                                for (let k = 0; k < result.node_info[i].TPN_info[j].info.length; k++) // card direction
                                {
                                    if(result.node_info[i].TPN_info[j].info[k].Direction==wss_direction && result.node_info[i].TPN_info[j].info[k].RxWavelengthNum==lambda)
                                    {
                                        path_value.
                                        rack_subrack=
                                        {
                                        "rack_no":result.node_info[i].TPN_info[j].rack_no,
                                        "subrack_no":result.node_info[i].TPN_info[j].subrack_no,
                                        "slot_index":result.node_info[i].TPN_info[j].info[k].SlotIndex,
                                        "wss_direction":wss_direction
                                        }
                                        //console.log(rack_subrack);
                                    }
                                }

                               }
                            }
                            break;
                        }
                    }
                });
            });
            
            resolve(rack_subrack);

        }
        catch (error) {
            reject(error);
        }
    });

}

module.exports={rack_subrack_info}
