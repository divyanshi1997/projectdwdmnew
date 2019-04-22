function tpnParse(response)
{
    var tpninfo=[];
    var str1 = response.split("$");
    var str2 = str1[1].split("#");
    for(i=0;i<str1[0];i++)
    {
        var str3=str2[i].split("-");
        // card type
        if(str3[1]==1)
        {
            str3[1]="MPN";
            if(str3[2]==0) //FOR SUBCARD type
                str3[2]="NA";
            if(str3[2]==1)
                str3[2]="CGM";
            if(str3[2]==2)
                str3[2]="TPN-40G MUXPONDER by AMCC";
            if(str3[2]==3)
                str3[2]="40G MUXPONDER by CORTINA";
            if(str3[2]==4)
                str3[2]="XGM";
            if(str3[2]==5)
                str3[2]="CGX";
            if(str3[2]==6)
                str3[2]="CGMOPX";
            if(str3[2]==7)
                str3[2]="CGXOPX";
            if(str3[2]==8)
                str3[2]="TPN_CCXK_PMCS";
        }   
        if(str3[1]==2)
            str3[1]="TPC";
        if(str3[1]==3)
            str3[1]="CSCC";
        if(str3[1]==4)
            str3[1]="Amplifier";
        if(str3[1]==5)
            str3[1]="ILA Card";
        if(str3[1]==6)
            str3[1]="Protection Card";
        if(str3[1]==7)
        {
            str3[1]="OCM Card";
            if(str3[2]==0) //FOR SUBCARD
                str3[2]="OCM1x2";
            if(str3[2]==1)
                str3[2]="OCM1x8";
            if(str3[2]==2)
                str3[2]="OCM1x16";
        }
        if(str3[1]==8)
            str3[1]="WSS 1*2 Card";
        if(str3[1]==9)
        {
            str3[1]="WSS 2*1*9 Card";
            if(str3[2]==0)   //FOR SUBCARD
                str3[2]="Finisar Axsun";
            if(str3[2]==1)
                str3[2]="Finisar JDSU";
            if(str3[2]==2)
                str3[2]="JDSU/OPLINK Axsun";
            if(str3[2]==3)
                str3[2]="JDSU/OPLINK JDSU";
        }   
        if(str3[1]==10)
            str3[1]="EDFA Card";
        if(str3[1]==11)
        {
            str3[1]="MCS Card";
            if(str3[2]==0)       //FOR SUBCARD
                str3[2]="DWDM_MCS_JDSU";
            if(str3[2]==1)
                str3[2]="DWDM_MCS_OPLINK";
        }
        if(str3[1]==12)
        {
            str3[1]="SUPY";
            if(str3[2]==1)       //FOR SUBCARD
                str3[2]="VOIP";
            if(str3[2]==2)
                str3[2]="OCP";
        }    
        if(str3[1]==13)
        {
            str3[1]="Wss 2*1*20 Card";
            if(str3[2]==0)   //FOR SUBCARD
                str3[2]="Finisar Axsun";
            if(str3[2]==1)
                str3[2]="Finisar JDSU";
            if(str3[2]==2)
                str3[2]="JDSU/OPLINK Axsun";
            if(str3[2]==3)
                str3[2]="JDSU/OPLINK JDSU";
        }
        if(str3[1]==14)
        {
            str3[1]="TPN";
            if(str3[2]==1)     // FOR SUBCARD
                str3[2]="CGM";
            if(str3[2]==4)
                str3[2]="CGC";
            if(str3[2]==5)
                str3[2]="CGX";
        }
        if(str3[1]==15)
            str3[1]="WSS2*8*12";
        if(str3[1]==16)
        {
            str3[1]="OTDR";
            if(str3[2]==7)
                str3[2]="OTDR1x4";
            if(str3[2]==9)
                str3[2]="OTDR1x16";
        }
        if(str3[2]==0) // if there is no subcard type
          str3[2]="NA";
        // end card type

        if(str3[4]==3)
            str3[4]="UNPROVISIONED_NOT_READY";
        if(str3[4]==4)
            str3[4]="CONFIG_MISMATCH";
        if(str3[4]==5)
            str3[4]="UNPROVISIONED_READY";
        if(str3[4]==6)
            str3[4]="PROVISIONED_NOT_READY";
        if(str3[4]==7)
            str3[4]="PROVISIONED_READY";

        if(str3[5]==0)
            str3[5]="DEFAULT";
        if(str3[5]==1)
            str3[5]="EAST";
        if(str3[5]==2)
            str3[5]="WEST";

        var SlotIndex=str3[0];
        var CardType=str3[1];
        var CardSubType=str3[2];
        var ModifiedBy=str3[3];
        var ApplicationState=str3[4];
        var Direction=str3[5];
        var TxWavelengthNum=str3[6];
        var RxWavelengthNum=str3[7];
        var LinePortNum=str3[8];
        var PortNum=str3[9];
        var Timestamp=str3[10];
        tpninfo.push({SlotIndex,CardType,CardSubType,ModifiedBy,ApplicationState,Direction,TxWavelengthNum,RxWavelengthNum,LinePortNum,PortNum,Timestamp});
    }
    //console.log(tpninfo);
    return tpninfo;
}
module.exports={tpnParse}