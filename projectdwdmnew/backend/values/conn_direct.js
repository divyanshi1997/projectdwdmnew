var conn=[];

function set(source_ip,dest_ip,direction)
{
    conn.push({"source":source_ip,"target":dest_ip,"direction":direction});
}
module.exports={conn,set}