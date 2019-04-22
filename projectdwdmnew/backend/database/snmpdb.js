var c= require("../values/Constants")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/testdata", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
const Schema = mongoose.Schema
 

var network_schema = new Schema({
  network_id: { type: String, required: true},
  no_of_nodes: { type: Number, required: true },
  status: { type: String, required: true},
  datetime:{ type: String},
  nodes: [],
  links: []
});

// var node_schema = new Schema({
//   id: { type: String, required: true },
//   label: { type: String, required: true, max: 100 },
//   no_of_link: { type: Number, required: true, max: 100 }
// });

// var link_schema =new Schema({
//     source: { type: String, required: true },
//     target: { type: String, required: true, max: 100 },
//     direction: { type: String, required: true}
// });

var Network = db.model("network", network_schema);
// var Node = db.model("node", node_schema);
// var Link = db.model("link", link_schema);

function snmpdb(myobj)
{
  
//var link=[];
//var node=[];
console.log("date and time=",myobj.datetime);

var network = new Network({
  network_id: myobj.network_id,
  no_of_nodes: myobj.no_of_nodes,
  status:myobj.status,
  datetime:myobj.datetime,
  nodes:myobj.nodes,
  links:myobj.links
}) 

// for(i=0;i<myobj.nodes.length;i++)
// {
//   node[i] = new Node({
//     id: myobj.nodes[i].id,
//     label: myobj.nodes[i].label,
//     no_of_link: myobj.nodes[i].no_of_link
// })
// }

// for(i=0;i<myobj.links.length;i++)
// {
//   link[i] = new Link({
//     source: myobj.links[i].source,
//     target: myobj.links[i].target,
//     direction: myobj.links[i].direction
// })
// } 

db.db.listCollections().next(function(err,collinfo)
{
  console.log(collinfo);
  if(collinfo!=null)
  {
    if(collinfo.name=="networks")
    {
      console.log("collection exist",collinfo.name);
      // db.collection("networks").find({network_id:c.IPAddress},{projection:{_id:0,network_id:1}}).toArray(function(notmatched, matched) 
      // {
      //     if (notmatched)
      //     {
      //       console.log("networks is empty");
            db.collection("networks").insert(myobj, function(err, res) {  
              if (err) throw err;  
              console.log("Number of records inserted in network: " + res.insertedCount);   
              }); 
        //   }
        //   if(matched)
        //   {
            
        //     console.log("networks contains data",matched);
        //     db.collection("networks").updateMany(myobj, function(err,res){
        //       if(err) throw err;
        //       console.log("number of records updated");
        //     })
        //   }
        // });
   
    }
    else{
      console.error("collection doesnot exist");
      Network.create(network, function (err, doc) {
        if (err)
             return console.error("creation error : ",err);
      console.log("network collection created");
          }) 
    }
  }
  else{
    Network.create(network, function (err, doc) {
      if (err)
           return console.error("creation error : ",err);
    console.log("network collection created");
        })
  }
  
})

}

module.exports={snmpdb,Network}
