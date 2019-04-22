var c=require("./Constants")
var node=[];

function set(id,label,no_of_link)
{
    node.push({id,label,no_of_link,});
}
module.exports={node,set}