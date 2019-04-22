async function intermediate_node(db,source_node, direction) 
{
    return new Promise(async (resolve, reject) => 
    {
        var intermediate_node = [];
        try 
        {
            await db.collection("networks").find({}, { sort: { datetime: -1 }, limit: 1 }, async function (err, Networks) 
            {
                if (err) throw err;
                await Networks.forEach(async function (result) 
                {
                    for (let i = 0; i < result.links.length; i++) 
                    {

                        if (result.links[i].source == source_node && result.links[i].direction.toUpperCase() == direction) {
                            intermediate_node.push({ ip: result.links[i].target, direction: result.links[i].direction.toUpperCase() });
                            break;
                        }
                    }
                });
            });
            resolve(intermediate_node);
        }
        catch (error) 
        {
        reject(error);
        }
    });
}
module.exports={intermediate_node}

