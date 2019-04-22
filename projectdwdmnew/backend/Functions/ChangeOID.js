function ChangeOID (OID,IP)
{
    	value1 = OID.split(".");
  		value2 = IP.split(".");
        value1[value1.length-2]=value2[value2.length-1];
     	var sb =new StringBuilder();    
        for(i=0;i<value1.length;i++)
    		{
                sb.append(value1[i]);
                sb.append(".");
            }
         return sb.toString().slice(".",-1);
       	
}

function StringBuilder(value) {
    this.strings = new Array();
    this.append(value);
}

StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

StringBuilder.prototype.clear = function () {
    this.strings.length = 0;
}

StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}

module.exports={ChangeOID : ChangeOID}
