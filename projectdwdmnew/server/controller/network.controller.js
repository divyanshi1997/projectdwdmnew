var n = require("../../backend/database/snmpdb");
var c = require("../../backend/values/Constants");
var cl = require("../../backend/Functions/clear");
var oids = require("../../backend/values/oids");
var result = require("../../backend/snmp/SnmpHandler");

var path_finding=require("../../backend/pathfinding/path_finding");
var path_value=require("../../backend/pathfinding/path_values");

const mongoose = require("mongoose");
var db = mongoose.connection;

exports.Netview = function(req, res) {
  n.Network.find({ network_id: c.IPAddress })
    .sort({ datetime: -1 })
    .limit(1)
    .exec(function(err, net) {
      if (err) throw err;
      res.send(net);
    });
};
async function mainagain(req) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("......", req.body.changeip);
      c.IPAddress = req.body.changeip;
      cl.clear();
      console.log("----------Calling Result---------");
      await result.Result(c.IPAddress, oids.agentoid);
      console.log("----------out of main---------");
      setTimeout(function() {
        console.log("your name");
        resolve();
      }, 10000);
    } catch (error) {
      c.count++;
      reject(error);
    }
  });
}

exports.NetChangeview = async function(req, res) {
  await mainagain(req);
  n.Network.find({ network_id: c.IPAddress }, function(err, net) {
    if (err) throw err;
    console.log("................................", net);
    res.send(net);
  });
};

exports.PathConfigview = async function(req, res) {
  //console.log("--------------------------",req.body.nodeip);
  db.collection("path_analysis")
    .find()
    .sort({ datetime: -1 })
    .limit(1)
    .forEach(function(net) {
      let str;
      console.log("req.body.nodeip", req.body.nodeip);
      for (let i = 0; i < net.node_info.length; i++) {
        if (net.node_info[i].node_ip == req.body.nodeip) {
          str = [];
          for (let j = 0; j < net.node_info[i].TPN_info.length; j++) {
            if (net.node_info[i].TPN_info[j].info != null) {
              for (let k = 0; k < net.node_info[i].TPN_info[j].info.length; k++)
                str.push({
                  Node_ip: net.node_info[i].node_ip,
                  Rack_no: net.node_info[i].TPN_info[j].rack_no,
                  Subrack_no: net.node_info[i].TPN_info[j].subrack_no,
                  Slot_index: net.node_info[i].TPN_info[j].info[k].SlotIndex,
                  TxWavelength:
                    net.node_info[i].TPN_info[j].info[k].TxWavelengthNum,
                  Rxwavwlength:
                    net.node_info[i].TPN_info[j].info[k].RxWavelengthNum
                });
            }
          }
          break;
        }
      }
      //console.log("%%%%%%%%%%%%%%%%%%%%%%", str);
      if (str.length == 0) str = false;
      res.send(str);
    });
};

exports.NetConfigview = async function(req, res) {
  var pathana = require("../../backend/Functions/pathAnalysis1");
  var flag = await pathana.pathanalysis1();
  res.send(flag);
};

exports.PathFindview =async function(req, res) {
  console.log("#################", req.body);
  path_value.clear_path();
      console.log("----------Calling path finding---------");
      await path_finding.path_finding(req.body.Nodeip,req.body.Rackno,req.body.Subrackno,req.body.Slotindex,req.body.Txwavelength);
     setTimeout(function() {
       console.log("time over");
        console.log("----------out of path finding---------");
        if(path_value.path.length>0)
        res.send(path_value.path[path_value.path.length-1]);
        else 
        res.send(null);
      }, 5000);
};
