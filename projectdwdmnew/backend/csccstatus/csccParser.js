function csccParse(response)
{
        var cscctype=[];
        var SubRackState=[];
            let str1 = response.split("#");

            for(let i=0;i<2;i++)
            {
                let str11=str1[i].split("-");
                // if(str11[5]==4)///////// to check amplifier card
                // {
                //     console.log("###########################");
                //     console.log(str11[2],str11[3],str11[4],str11[5],str11[6]);
                //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                // }////////////////////
                if(str11[0]==0) // for csccstate
                    str11[0]="Passive";
                if(str11[0]==1)
                    str11[0]="Active";

                if(str11[1]==0) // for csccstatus
                    str11[1]="Jacked-out";
                if(str11[1]==1)
                    str11[1]="Un-provisioned";
                if(str11[1]==2)
                    str11[1]="Selected";
                if(str11[1]==3)
                    str11[1]="Provisioned";
                if(str11[1]==4)
                    str11[1]="Conflict";
                if(str11[1]==5)
                    str11[1]="NotDetected";
                if(str11[1]==6)
                    str11[1]="DatabaseRestore";
                if(str11[1]==7)
                    str11[1]="NOT_REACHABLE";

                if(str11[5]==1)
                {
                    str11[5]="MPN";
                    if(str11[6]==0) //FOR SUBCARD type
                        str11[6]="NA";
                    if(str11[6]==1)
                        str11[6]="CGM";
                    if(str11[6]==2)
                        str11[6]="TPN-40G MUXPONDER by AMCC";
                    if(str11[6]==3)
                        str11[6]="40G MUXPONDER by CORTINA";
                    if(str11[6]==4)
                        str11[6]="XGM";
                    if(str11[6]==5)
                        str11[6]="CGX";
                    if(str11[6]==6)
                        str11[6]="CGMOPX";
                    if(str11[6]==7)
                        str11[6]="CGXOPX";
                    if(str11[6]==8)
                        str11[6]="TPN_CCXK_PMCS";
                }   
                if(str11[5]==2)
                    str11[5]="TPC";
                if(str11[5]==3)
                    str11[5]="CSCC";

                if(str11[5]==4)
                {
                    str11[5]="Amplifier";
                    if(str11[6]==8) //FOR SUBCARD
                        str11[6]="DWDM_AMP_RAMAN_Hybrid";
                    if(str11[6]==10)
                        str11[6]="DWDM_AMP_RAMAN_Simple_RMNK";
                }
                
                if(str11[5]==5)
                {
                    str11[5]="ILA Card";
                    if(str11[6]==8) //FOR SUBCARD
                        str11[6]="DWDM_AMP_RAMAN_Hybrid";
                    if(str11[6]==10)
                        str11[6]="DWDM_AMP_RAMAN_Simple_RMNK";
                }

                if(str11[5]==6)
                    str11[5]="Protection Card";
                if(str11[5]==7)
                {
                    str11[5]="OCM Card";
                    if(str11[6]==0) //FOR SUBCARD
                        str11[6]="OCM1x2";
                    if(str11[6]==1)
                        str11[6]="OCM1x8";
                    if(str11[6]==2)
                        str11[6]="OCM1x16";
                }
                if(str11[5]==8)
                    str11[5]="WSS 1*2 Card";
                if(str11[5]==9)
                {
                    str11[5]="WSS 2*1*9 Card";
                    if(str11[6]==0)   //FOR SUBCARD
                        str11[6]="Finisar Axsun";
                    if(str11[6]==1)
                        str11[6]="Finisar JDSU";
                    if(str11[6]==2)
                        str11[6]="JDSU/OPLINK Axsun";
                    if(str11[6]==3)
                        str11[6]="JDSU/OPLINK JDSU";
                }   
                if(str11[5]==10)
                    str11[5]="EDFA Card";
                if(str11[5]==11)
                {
                    str11[5]="MCS Card";
                    if(str11[6]==0)       //FOR SUBCARD
                        str11[6]="DWDM_MCS_JDSU";
                    if(str11[6]==1)
                        str11[6]="DWDM_MCS_OPLINK";
                }
                if(str11[5]==12)
                {
                    str11[5]="SUPY";
                    if(str11[6]==1)       //FOR SUBCARD
                        str11[6]="VOIP";
                    if(str11[6]==2)
                        str11[6]="OCP";
                }    
                if(str11[5]==13)
                {
                    str11[5]="Wss 2*1*20 Card";
                    if(str11[6]==0)   //FOR SUBCARD
                        str11[6]="Finisar Axsun";
                    if(str11[6]==1)
                        str11[6]="Finisar JDSU";
                    if(str11[6]==2)
                        str11[6]="JDSU/OPLINK Axsun";
                    if(str11[6]==3)
                        str11[6]="JDSU/OPLINK JDSU";
                }
                if(str11[5]==14)
                {
                    str11[5]="TPN";
                    if(str11[6]==1)     // FOR SUBCARD
                        str11[6]="CGM";
                    if(str11[6]==4)
                        str11[6]="CGC";
                    if(str11[6]==5)
                        str11[6]="CGX";
                }
                if(str11[5]==15)
                    str11[5]="WSS2*8*12";
                if(str11[5]==16)
                {
                    str11[5]="OTDR";
                    if(str11[6]==7)
                        str11[6]="OTDR1x4";
                    if(str11[6]==9)
                        str11[6]="OTDR1x16";
                }
                if(str11[6]==0) // if there is no subcard type
                    str11[6]="NA";
                // end card type
                let csccstate=str11[0];
                let csccstatus=str11[1];
                let csccrack=str11[2];
                let csccsubrack=str11[3];
                let slotindex=str11[4];
                let cardtype=str11[5];
                let cardsubtype=str11[6];

                // for serialnumber which is a combination of multiple strings
                let serialnumber=str11[7];
                if(str11.length>7)  
                {
                    for(let j=8;j<str11.length;j++)
                        serialnumber+="-"+str11[j];
                }
                cscctype.push({csccstate,csccstatus,csccrack,csccsubrack,slotindex,cardtype,cardsubtype,serialnumber});
            }
            //console.log("cscctype...",cscctype);
                        
            for(let i=2;i<str1.length;i++)
            {
                let TpcState;
                let TpnState;
                let subrackstate=str1[i].split("$");
                let rack=subrackstate[0];
                let subrack=subrackstate[1];
                for(let j=2;j<4;j++)
                {
                    let tpcstatearr=subrackstate[j].split("-");

                    if(tpcstatearr[0]==0) // for tpcsubrackstatus
                        tpcstatearr[0]="Jacked-out";
                    if(tpcstatearr[0]==1)
                        tpcstatearr[0]="Un-provisioned";
                    if(tpcstatearr[0]==2)
                        tpcstatearr[0]="Selected";
                    if(tpcstatearr[0]==3)
                        tpcstatearr[0]="Provisioned";
                    if(tpcstatearr[0]==4)
                        tpcstatearr[0]="Conflict";
                    if(tpcstatearr[0]==5)
                        tpcstatearr[0]="NotDetected";
                    if(tpcstatearr[0]==6)
                        tpcstatearr[0]="DatabaseRestore";
                    if(tpcstatearr[0]==7)
                        tpcstatearr[0]="NOT_REACHABLE";

                    if(tpcstatearr[1]==0) // for tpcstate
                        tpcstatearr[1]="PASSIVE";
                    if(tpcstatearr[1]==1)
                        tpcstatearr[1]="ACTIVE";

                    let tpcsubrackstatus=tpcstatearr[0];
                    let tpcstate=tpcstatearr[1];
                    let slot=tpcstatearr[2];
                    TpcState={tpcsubrackstatus,tpcstate,slot};
                }
                
                for(let j=4;j<=12;j++)
                {
                    let tpnstatearr=subrackstate[j].split("-")
                    if(tpnstatearr[0]==20) // for tpnstatus
                        tpnstatearr[0]="ABSENT";
                    if(tpnstatearr[0]==21)
                        tpnstatearr[0]="PRESENT";
                    if(tpnstatearr[0]==22)
                        tpnstatearr[0]="READY";
                    if(tpnstatearr[0]==23)
                        tpnstatearr[0]="JACKOUT";
                    if(tpnstatearr[0]==24)
                        tpnstatearr[0]="NOT_DETECTED";
                    if(tpnstatearr[0]==25)
                        tpnstatearr[0]="NOT_REACHABLE";
                    if(tpnstatearr[0]==26)
                        tpnstatearr[0]="NOT_RESPONDING";

                    if(tpnstatearr[4]==4) // for applicationstate
                        tpnstatearr[4]="CONFIG_MISMATCH";
                    if(tpnstatearr[4]==5)
                        tpnstatearr[4]="UNPROVISIONED_READY";
                    if(tpnstatearr[4]==6)
                        tpnstatearr[4]="PROVISIONED_NOT_READY";
                    if(tpnstatearr[4]==7)
                        tpnstatearr[4]="PROVISIONED_READY";
                    if(tpnstatearr[4]==8)
                        tpnstatearr[4]="UNPROVISIONED_UNEXPECTED";
                    if(tpnstatearr[4]==9)
                        tpnstatearr[4]="PROVISIONED_UNEXPECTED";
                    if(tpnstatearr[4]==10)
                        tpnstatearr[4]="UNPROVISIONED_NOT_READY";

                    let tpnstate=tpnstatearr[0];
                    let slot=tpnstatearr[1];
                    let cardtype=tpnstatearr[2];
                    let cardsubtype=tpnstatearr[3];
                    let applicationstate=tpnstatearr[4];   
                    TpnState={tpnstate,slot,cardtype,cardsubtype,applicationstate};                
                }
                //console.log("Tpc State",TpcState);
                //console.log("TpnState==",TpnState);
                SubRackState.push({rack,subrack,TpcState,TpnState});
            }
            //console.log("subrackstate====",SubRackState);
        let csccResult={cscctype,SubRackState};
        //console.log("csccResult--",csccResult);
        return csccResult;
}
module.exports={csccParse}