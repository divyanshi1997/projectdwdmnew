const express = require("express");
const router = express.Router();
var c =require('../../backend/values/Constants');
var oids=require('../../backend/values/oids');
var cl=require('../../backend/Functions/clear');
var result=require('../../backend/snmp/SnmpHandler');

router.get("/", function(req) {
  console.log(req.params);
});

router.post("/", async function(req, res) {
  console.log("Post Request", req.body);
 
  let { username, password, ipAdd } = req.body;
  if (username == "admin" && password == "admin") 
  {
    c.IPAddress = ipAdd;
     cl.clear();
     await result.Result(c.IPAddress,oids.agentoid); //calling background processing
    res.status(200);
    res.send(true);
  } 
  else {
    res.status(501);
    res.send("Wrong");
  }
});
var Net= require("../controller/network.controller");
router.post("/getnetwork", Net.Netview);

var NetChange = require("../controller/network.controller");
router.post("/getchangenetwork", NetChange.NetChangeview);

var Pathinfo = require("../controller/network.controller");
router.post("/getpathinfo", Pathinfo.PathConfigview);

var Netinfo = require("../controller/network.controller");
router.post("/getnetworkconfig", Netinfo.NetConfigview);

var Findpathinfo = require("../controller/network.controller");
router.post("/getpath", Findpathinfo.PathFindview);

module.exports = router;
