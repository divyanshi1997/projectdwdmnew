var sysresult = require("../systemInfo/sysinfo");
var tpnresult = require("../TPNconfig/tpnconfig");
var wssresult = require("../wssInfo/wsschannelinfo");
var csccresult = require("../csccstatus/csccInfo");
var oids = require("../values/oids");
var c = require("../values/Constants");
var changeoid = require("../Functions/ChangeOID");
var node_IP = require("../values/node_ips");
var final_info = require("../values/nodes_info");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testdata", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

async function pathanalysis1() {
    var flag = false;
    let date = require('date-and-time');
    var datetime = date.format(new Date(), 'DD/MM/YYYY HH:mm:ss');
    //console.log(">>>>>>>",datetime);

    var tpn_info;
    var wss_info;
    var cscc_info;
    return new Promise(async (resolve, reject) => {
        try {
            console.log("//////inside path analysis");
            for (let x = 0; x < node_IP.node_IPs.length; x++) {
                var sysinfo = [];
                //console.log("system info of node",node_IP.node_IPs[x].ip);
                if (node_IP.node_IPs[x].GNEflag == true) //for GNE node
                {
                    sysinfo = await sysresult.sysResult(c.IPAddress, oids.sysoid);
                    //console.log("====",sysinfo); 
                }
                else {
                    var sysoid = changeoid.ChangeOID(oids.sysoid, node_IP.node_IPs[x].ip);
                    var sysinfo = await sysresult.sysResult(c.IPAddress, sysoid);
                    //console.log("====",sysinfo);
                }
                if (node_IP.node_IPs[x].GNEflag == true) //for GNE node
                {
                    tpn_info = await tpnresult.TPNResult(c.IPAddress, oids.tpnoid, oids.subrackoid);
                }
                else {
                    var tpnoid = changeoid.ChangeOID(oids.tpnoid, node_IP.node_IPs[x].ip);
                    var subrkoid = changeoid.ChangeOID(oids.subrackoid, node_IP.node_IPs[x].ip);
                    tpn_info = await tpnresult.TPNResult(c.IPAddress, tpnoid, subrkoid);
                }
                if (node_IP.node_IPs[x].GNEflag == true) //for GNE node
                {
                    wss_info = await wssresult.wssChannelResult(c.IPAddress, oids.wsschanneloid, oids.wssdirectionoid);
                }
                else {
                    var wsschannel_oid = changeoid.ChangeOID(oids.wsschanneloid, node_IP.node_IPs[x].ip);
                    var wssdirection_oid = changeoid.ChangeOID(oids.wssdirectionoid, node_IP.node_IPs[x].ip);
                    wss_info = await wssresult.wssChannelResult(c.IPAddress, wsschannel_oid, wssdirection_oid);
                }
                //console.log(">>>>>wss info",wss_info);
                if (node_IP.node_IPs[x].GNEflag == true) //for GNE node
                {
                    cscc_info = await csccresult.csccResult(c.IPAddress, oids.csccstatusoid);
                }
                else {
                    let csccstatus_oid = changeoid.ChangeOID(oids.csccstatusoid, node_IP.node_IPs[x].ip);
                    cscc_info = await csccresult.csccResult(c.IPAddress, csccstatus_oid);
                }
                final_info.set(node_IP.node_IPs[x].ip, sysinfo, tpn_info, wss_info, cscc_info);
            }

            //console.log(">>>>>>",final_info);
            var document = {
                "node_info": final_info.node_info,
                "datetime": datetime
            };

            //console.log("last of path analysis//////",document);

            await db.createCollection("path_analysis", async function (err, res) {
                if (err) throw err;
                else {
                    console.log("Collection is created!");
                    await db.collection("path_analysis").insert(document, async function (err, res) {
                        if (err)
                        {
                            flag=false;
                            throw err;
                        }
                        else{
                            console.log("Number of records inserted: " + res.insertedCount);
                            flag=true;    
                        }                         
                        resolve(flag);
                    });
                }

            });
        }
        catch (error) {
            reject(error);
        }
    });

}

module.exports = { pathanalysis1 }

