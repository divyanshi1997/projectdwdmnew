var inter_node = require("./intermediate_node");
var inter_node_exit_path = require("./intermediate_node_exit_path");
var wss_dir_action = require("./wss_direction_action");
var path_value=require("./path_values");
var dest_rack_subrack=require("./rack_subrack_info");

function check_ila(db, source_node, link_direction, lambda) // to find intermediate node
{

    let direction;
    let n = link_direction.lastIndexOf("_");
    if (n > 0)
        direction = link_direction.substring(0, n);
    else
        direction = link_direction;
    direction = direction.toUpperCase();
    //console.log(direction);
    return new Promise(async (resolve, reject) => {
        var ILA_flag = false;
        try {
            var intermediate_node = await inter_node.intermediate_node(db,source_node, direction); // get intermediate node
            //console.log("intermediate_node", intermediate_node);
            await db.collection("path_analysis").find({}, { sort: { datetime: -1 }, limit: 1 }, async function (err, Nodes) {
                if (err) throw err;
                await Nodes.forEach(async function (result) 
                {
                    for (let i = 0; i < result.node_info.length; i++) 
                    {
                        for (let j = 0; j < intermediate_node.length; j++) 
                        {
                            if (result.node_info[i].node_ip == intermediate_node[j].ip) 
                            {
                                //console.log("==>", result.node_info[i].node_ip, result.node_info[i].system_info.Ne_type);
                                if (result.node_info[i].system_info.Ne_type == "IN LINE AMPLIFIER") 
                                {
                                    ILA_flag = true;
                                    //console.log("ILA_flag=", ILA_flag);
                                }
                                else {
                                    ILA_flag = false;
                                    //console.log("ILA_flag=", ILA_flag);
                                }
                                if (ILA_flag == true) 
                                {
                                    //console.log("this is an ILA, now find exit path");
                                    path_value.links_set(source_node,intermediate_node[j].ip,intermediate_node[j].direction);
                                    console.log("links",path_value.links);
                                    var exit_path = await inter_node_exit_path.exit_path(db,source_node, intermediate_node[j].ip, intermediate_node[j].direction,ILA_flag)
                                    //console.log("exit path", exit_path,exit_path.length);
                                    // if(exit_path.length==0)
                                    // {
                                    //     var exit_path = await inter_node_exit_path.exit_path(db,source_node, intermediate_node[j].ip, intermediate_node[j].direction)
                                    //     //console.log("exit path", exit_path,exit_path.length);
                                    // }
                                    for (let x = 0; x < exit_path.length; x++) 
                                    {
                                        //console.log(">>>>", exit_path[x]);
                                        await check_ila(db, intermediate_node[j].ip, exit_path[x].direction, lambda);
                                    }

                                }
                                if (ILA_flag == false) 
                                {
                                    //console.log("this is not an ILA, now find exit path");
                                    var exit_path = await inter_node_exit_path.exit_path(db,source_node, intermediate_node[j].ip, intermediate_node[j].direction,ILA_flag);
                                    //console.log("exit path", exit_path,exit_path.length);
                                    var direction_action;
                                    for (let x = 0; x < exit_path.length; x++) 
                                    {
                                        //console.log(">>>>", exit_path[x].direction);
                                        direction_action=await wss_dir_action.wss_direction_action(db, intermediate_node[j].ip, exit_path[x].direction, lambda);

                                    }
                                    //console.log("wss ==>", direction_action);
                                    if (direction_action.length > 0) 
                                    {
                                        for (let i = 0; i < direction_action.length; i++) 
                                        {
                                            if (direction_action[i].action == "ADD_DROP") 
                                            {
                                                path_value.links_set(source_node,intermediate_node[j].ip,intermediate_node[j].direction);
                                                
                                                let flag=false;
                                                for(let e=0;e<path_value.nodes.length;e++)
                                                {
                                                    if(path_value.nodes[e].end_node==intermediate_node[j].ip)
                                                     flag=true;
                                                }
                                                if(flag==false)
                                                    await path_value.node_set_end_node(intermediate_node[j].ip);
                                                   
                                                await path_value.path_set();
                                                for(let p=0;p<path_value.path.length;p++)
                                                {
                                                    console.log(p);
                                                    console.log("path====>",path_value.path[p]);
                                                    
                                                }
                                                //let rack_subrack=await dest_rack_subrack.rack_subrack_info(db,intermediate_node[j].ip,intermediate_node[j].direction,lambda);
                                                //console.log(rack_subrack);
                                                break;
                                            }
                                            if(direction_action[i].action.toUpperCase() == "FREE WAVELENGTH")
                                            {
                                                path_value.path=null;
                                                console.log("there is no path");
                                                break;
                                            }
                                            else
                                            {
                                                path_value.links_set(source_node,intermediate_node[j].ip,intermediate_node[j].direction);
                                                //console.log("in check_ila for action===========>", direction_action[i].action.toUpperCase());
                                                let str = direction_action[i].action.toUpperCase().split(" ");
                                                //console.log("str===", str[2]);
                                                await check_ila(db, intermediate_node[j].ip, str[2], lambda);////check here for error

                                            }
                                        }
                                    }
                                    else {
                                        path_value.path=null;
                                        console.log("there is no path")
                                    }

                                }
                                break;
                            }
                        }

                    }
                });
                
            });
            resolve(path_value.path);
            
        }
        catch (error) {
            reject(error);
        }
    });
}
module.exports = { check_ila }