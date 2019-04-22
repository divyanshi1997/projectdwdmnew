var card_dir = require("./card_direction");
var wss_dir_action = require("./wss_direction_action");
var check_ILA = require("./check_ila");
var path_value = require("./path_values");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testdata", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//main function of path_finding

async function path_finding(source_node_ip, rack_no, subrack_no, slot_index, lambda) 
{
    return new Promise(async (resolve, reject) => {

        try {
            path_value.node_set_start_node(source_node_ip); // set start node
            var card_direction = await card_dir.card_direction(db, source_node_ip, rack_no, subrack_no, slot_index, lambda);

            //console.log("card direction=>", card_direction);
            for (let x = 0; x < card_direction.length; x++) 
            {
                //console.log("for direction", card_direction[x]);

                var direction_action = await wss_dir_action.wss_direction_action(db, source_node_ip, card_direction[x].direction, lambda);
               // console.log("wss ==>", direction_action);
                if (direction_action.length > 0) {
                    for (let i = 0; i < direction_action.length; i++) {
                        if (direction_action[i].action == "ADD_DROP") {
                            //console.log("in path_finding, for direction===========>", direction_action[i].direction);
                            await check_ILA.check_ila(db, source_node_ip, direction_action[i].direction, lambda);
                            
                        }
                        else
                        {
                            path_value.clear_path();
                            //path_value.path = null;
                            console.log("there is no path");
                            console.log("path====", path_value.path);
                            break;
                        }
                    }
                }
                else {
                    console.log("there is no path")
                    path_value.clear_path();
                    //path_value.path = null;
                }
            }
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });

}
module.exports={path_finding}
//path_finding("10.5.0.10", 1, 2, 4, 48);