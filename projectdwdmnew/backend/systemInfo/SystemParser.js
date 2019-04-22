function SystemParse(response)
{
      var str = response.split("#");
      if(str[9]==0)
            str[9]="DEFAULT";
      if(str[9]==1)
            str[9]="TERMINAL EQUIPMENT";
      if(str[9]==2)
            str[9]="IN LINE AMPLIFIER";
      if(str[9]==4)
            str[9]="SUTEEVRA";
      if(str[9]==5)
            str[9]="FOADM";
      if(str[9]==6)
            str[9]="2DROADM";
      if(str[9]==7)
            str[9]="HUB";
      if(str[9]==8)
            str[9]="CDC_ROADM";


      if(str[10]==1)
            str[10]="PRIMARY GNE";
      if(str[10]==2)
            str[10]="SECONDARY GNE";
      if(str[10]==0)
            str[10]="NE(SUBAGENT)";


      if(str[11]==1)
            str[11]="INTRA OFFICE";
      if(str[11]==2)
            str[11]="SHORT HAUL";
      if(str[11]==3)
            str[11]="VERY LONG HAUL";
      if(str[11]==4)
            str[11]="ULTRA LONG HAUL";
      

      if(str[14]==0)
            str[14]="NOT APPLICABLE";
      if(str[14]==1)
            str[14]="FORTY CHANNEL, EVEN MUX TRAY";
      if(str[14]==2)
            str[14]="FORTY CHANNEL, ODD MUX TRAY";
      if(str[14]==3)
            str[14]="EIGHTY CHANNEL";


      if(str[15]==1)
            str[15]="LINEAR";
      if(str[15]==2)
            str[15]="HUBBED RING";
      if(str[15]==3)
            str[15]="CLOSED RING";
      if(str[15]==4)
            str[15]="MESH";


      if(str[16]==0)
            str[16]="DEFAULT";
      if(str[16]==1)
            str[16]="EAST";
      if(str[16]==2)
            str[16]="WEST";
      if(str[16]==3)
            str[16]="NORTH";
      if(str[16]==4)
            str[16]="SOUTH";
      if(str[16]==5)
            str[16]="NORTH_EAST";
      if(str[16]==6)
            str[16]="NORTH_WEST";
      if(str[16]==7)
            str[16]="SOUTH_EAST";
      if(str[16]==8)
            str[16]="SOUTH_WEST";

      var sysinfo={
            "station_name": str[0],
            "site_name":str[1],
            "Date_Time":str[2],
            "IPv4_Address": str[3],
            "SubnetMask": str[4],
            "Gateway": str[5],
           //var IPv6_Address= str[6],
           "snmpAgent_VID": str[7],
           "MAC_Address": str[8],
           "Ne_type" :str[9],
           "GNEflag":str[10],
           "OpticalReach":str[11],
           "order_of_OTM":str[12],
           "Degree":str[13],
           "System_capacity":str[14],
           "topology":str[15],
           "Direction":str[16],
           "Network_name":str[17],
           "Ne_id":str[18],
           "potp_type":str[19],
           "Ila_type":str[20]
      };
	//console.log(sysinfo);	
      return sysinfo;  
}

module.exports={SystemParse}      
