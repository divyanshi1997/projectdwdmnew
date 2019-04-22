var path=[];
var nodes=[];
var links=[];
function node_set_start_node(start_node)
{
    nodes.push({"start_node":start_node});
}

function node_set_end_node(end_node)
{
    nodes.push({"end_node":end_node});
}

function links_set(source,target,direction)
{
    links.push({"source":source,"target":target,"direction":direction});  
}

function path_set()
{
    path.push({"nodes":nodes,"links":links});  
}
 function clear_path()
 {
     path.length=0;
     nodes.length=0;
     links.length=0;
 }

module.exports={path,path_set,nodes,node_set_start_node,node_set_end_node,links,links_set,clear_path}