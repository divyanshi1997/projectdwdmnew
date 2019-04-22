async function exit_path(db,source_node,inter_node,entry_direction,ILA_flag)
{
    
    return new Promise(async (resolve, reject) => 
    {
        //console.log("ILA_flag",ILA_flag);
        //console.log("......",source_node,inter_node,entry_direction);
        var exit_path=[];
        var reverse_direction=null;
        try {
            
            //console.log("open networks db");
            await db.collection("networks").find({}, { sort: { datetime: -1 }, limit: 1 }, async function (err, Networks) 
            {
               if (err) throw err;
               else
               {
               await Networks.forEach(async function (result) 
                {
                    //console.log("foreach networks db");
                    for (let i = 0; i < result.links.length; i++) 
                    {
                            //console.log("=======",result.links[i].source,inter_node,result.links[i].target,source_node);

                            if (result.links[i].source == inter_node && result.links[i].target == source_node) {
                                reverse_direction = result.links[i].direction.toUpperCase();
                                //console.log("reverse_direction",reverse_direction);
                            }
                    }
                    
                if(ILA_flag==true)
                {
                    for(let i = 0; i < result.links.length; i++) 
                    {
                        if(reverse_direction!=null)
                            if (entry_direction == reverse_direction) 
                            {
                                //console.log("directions match");
                                //console.log(result.links[i].source," == ",inter_node," && ",result.links[i].direction.toUpperCase()," != ",entry_direction)
                                if (result.links[i].source==inter_node && result.links[i].direction.toUpperCase()!=entry_direction) {
                                    exit_path.push({"node_ip":result.links[i].target,"direction":result.links[i].direction.toUpperCase()});
                                    //console.log("when ", entry_direction, "==", reverse_direction, " ", exit_path);
                                }
                            }
                            else 
                            {
                                //console.log("directions not match");
                                //console.log(result.links[i].source," == ",inter_node," && ",result.links[i].direction.toUpperCase()," != ",reverse_direction)
                                if (result.links[i].source==inter_node && result.links[i].direction.toUpperCase()!=reverse_direction) {
                                    exit_path.push({"node_ip":result.links[i].target,"direction":result.links[i].direction.toUpperCase()});
                                    //console.log("when ", entry_direction, "!=", reverse_direction, " ", exit_path );
                                }
                            }

                    }
                }
                if(ILA_flag==false)
                {
                    exit_path.push({"direction":reverse_direction});
                }
                    
                });
               }
            });
            resolve(exit_path);
        }
        catch (error) 
        {
        reject(error);
        }
    });
}
module.exports={exit_path}
