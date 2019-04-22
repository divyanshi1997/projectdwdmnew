
var c=require("../values/Constants")

var agentparse = function AgentParser(response)
{
	
		   var hashmap=new Map();
		   var str1 = response.split("#");
		   c.no_nodes=parseInt(str1[0]);
		   var array=[];
		   
		   for (let i = 1; i < str1.length ; i++)
		   { 
			   var str2=str1[i].split("-");
	  		   array[i]=str2;
			}
			for(let i = 1; i < str1.length ; i++)
			{
				var agentinfo=[];
				var connection=[];
				var direction=[];
				var k=0;
				var l=0;
				for(let j = 0; j < array[i].length; j++)
				{
					if(j < 7)
					{
						agentinfo[k]=array[i][j];
						k++;
							
					}
					
					else
					{
						var str3=array[i][j].split("$");
						connection[l]=str3[0];
						direction[l]=str3[1];
						l++;
						
					}

				}
				hashmap.set("agentinfo"+i,agentinfo);
				hashmap.set("connection"+i,connection);
				hashmap.set("direction"+i,direction);
			}
	return hashmap; 
}

module.exports={agentparse}
	