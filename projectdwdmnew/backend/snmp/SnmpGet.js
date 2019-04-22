var c=require("../values/Constants")
class SnmpGet 
{
    constructor(ipaddress, oidvalue) {
      c.IPAddress=ipaddress
      this.oid=oidvalue;
      this.response = 0;
      this.snmp = require("net-snmp");
  
      this.options = {
        port: 161,
        retries: 5,
        timeout: 300000,
        transport: "udp4",
        version: this.snmp.Version2c,
        idBitsSize: 32
      };
      this.session = this.snmp.createSession(
        c.IPAddress,
        "public",
        this.options
      );
    }
  
    asyncFun() {
      // return "Ok from Async";
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("TimeOut");
          const error = false;
          if (!error) {
            resolve("Ok");
          } else reject("Error in Promise");
        }, 1000);
      });
    }
  
    
    snmpGetCall()
    {
      console.log("snmpGetCall : " + this.oid);
          return new Promise((resolve, reject) => {
       
          this.session.get([this.oid], (error, varbinds) => {
          if (error) {
            console.error("session get error"+this.oid, error.toString());
            reject("Error in input");
          } else {
            if (
              varbinds[0].type != this.snmp.ErrorStatus.NoSuchObject &&
              varbinds[0].type != this.snmp.ErrorStatus.NoSuchInstance &&
              varbinds[0].type != this.snmp.ErrorStatus.EndOfMibView
            ) {
              var snmpRes = varbinds[0].value.toString();
              //console.log("Response", snmpRes);
              resolve(snmpRes);
            } else {
              console.error(
                this.snmp.ObjectType[varbinds[0].type] +
                  ": " +
                  varbinds[0].oid +
                  " : " +
                  this.snmp.ObjectType[varbinds[0]]
              );
              reject("Error in output");
            }
          }
          });
      
          });
    }
}
  
  class Get extends SnmpGet {
    constructor(ipaddress, oidvalue, status) {
      super(ipaddress, oidvalue); //Call SnmoGet Constructor()
      this.status = status;
    }

  }
  
  module.exports={Get}
 