function subrackParse(response)
	  {
          var rack=[];
           var str1 = response.split("$");
           var str2 = str1[1].split("#");
           for(i=0;i<str2.length;i++)
           {
               var str3=str2[i].split("-");
               for(j=0;j<str3.length;j++)
               {
                   if(str3[j]==3)
                   {
                       var rack_no=i+1;
                       var subrack_no=j+1;
                       rack.push({rack_no,subrack_no});
                   }
               }
           }
           //console.log(rack);
           return rack;
      }
module.exports={subrackParse}