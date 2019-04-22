function wssChannelParse(response)
{
  //console.log(response);
  var str1 = response.split("$");
  //console.log("str1[0]",str1[0]);
  var str11=str1[0].split("-");
  //console.log("str11",str11);
  var str12=str1[1].split("#");
  channel_no=[];
  for(let i=0;i<str12.length;i++)
  { 
    var str2=str12[i].split("-");
    let WavelengthNum=str2[0];
    let Action;
    if(str2[1]==0)
      str2[1]="Free Wavelength";
    if(str2[1]==1)
      str2[1]="Pass through EAST";
    if(str2[1]==2)
      str2[1]="Pass through WEST";
    if(str2[1]==3)
      str2[1]="Pass through NORTH";
    if(str2[1]==4)
      str2[1]="Pass through SOUTH";
    if(str2[1]==5)
      str2[1]="Pass through NORTH_EAST";
    if(str2[1]==6)
      str2[1]="Pass through NORTH_WEST";
    if(str2[1]==7)
      str2[1]="Pass through SOUTH_EAST";
    if(str2[1]==8)
      str2[1]="Pass through SOUTH_WEST";
    
      Action=str2[1];

    
    if(str2[2]==0)
      str2[2]="DISABLED";
    if(str2[2]==1)
      str2[2]="ENABLED";
    let ChannelFlag=str2[2];
    let Attenuation=str2[3];
    let ChannelWidth=str2[4];
    
    channel_no[i]={WavelengthNum,Action,ChannelFlag,Attenuation,ChannelWidth}
  }
  //console.log("wsschannel",channel_no);
  
  if(str11[0]==0)
    str11[0]="CM_AUTOMATIC";
  if(str11[0]==1)
    str11[0]="CM_MANUAL_FIX";
  if(str11[0]==2)
    str11[0]="CM_MANUAL_VARIABLE";
  if(str11[0]==3)
    str11[0]="PRE_AMPLIFICES";
  let AttenuationConfigMode=str11[0];
  let Attenuation=str11[1];

  
  if(str11[2]==0)
    str11[2]="CM_FIX_GRID";
  if(str11[2]==1)
    str11[2]="CM_FLEX_GRID";
    
  let ChannelWidthConfigMode=str11[2];
  let ChannelWidth=str11[3];

  var wsschannel={AttenuationConfigMode,Attenuation,ChannelWidthConfigMode,ChannelWidth,"channels":channel_no};
 //console.log("wsschannel",wsschannel);
  return wsschannel;
}
module.exports={wssChannelParse}