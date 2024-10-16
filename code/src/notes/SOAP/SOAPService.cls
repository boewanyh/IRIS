/// http://localhost:52773/csp/healthshare/boe/services/notes.SOAP.SOAPService.cls?WSDL
Class notes.SOAP.SOAPService Extends %SOAP.WebService
{

/// Name of the WebService.
Parameter SERVICENAME = "SOAPService";

/// TODO: change this to actual SOAP namespace.
/// SOAP Namespace for the WebService
Parameter NAMESPACE = "https://temuri.org";

/// Namespaces of referenced classes will be used in the WSDL.
Parameter USECLASSNAMESPACES = 1;

Method Div(Input1 As %String, Input2 As %String) As %String [ WebMethod ]
{
    // 获取自定义标头值
    s AK = ..HeadersIn.GetAt("BOESecurity").AK
	s UUID = ..HeadersIn.GetAt("BOESecurity").UUID
	s Timestamp = ..HeadersIn.GetAt("BOESecurity").Timestamp
	s Sign = ..HeadersIn.GetAt("BOESecurity").Sign

    // 生成本地Sign对比
    s SK = "rIacv39f8gZ5lH7ZMZ"
    s text = "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID 
	s localSign = ..MD5HexStr(text)
    s tSC = ..CompareSign(localSign, Sign)
    if tSC'=$$$OK Quit "鉴权失败"
    
    q Input1_" / "_Input2_" = "_(Input1 / Input2)
}

/// Description: 把val进行md5加密并返回结果
/// Input : val 字符串
/// Return: 加密后结果
ClassMethod MD5HexStr(val As %String)
{
	Quit:val="" ""
	set enc = ##class(%SYSTEM.Encryption).MD5Hash(val)
	set enc = ..Byte2Hex(enc)
	quit enc
}

/// Description: 将字节转成16进制字符
/// Input : val 字节
/// Return: 16进制字符
ClassMethod Byte2Hex(val)
{
	s ret = ""
	f j=1:1:$l(val) d
	.s ascii = $a($e(val,j)) 
	.if ascii<16 set ret = ret_"0"_$zh(ascii)
	.else  set ret = ret_$zh(ascii)
	q ret
}

/// 比较本地生成的sign和入参获取到的sign是否一致
ClassMethod CompareSign(localSign As %String, otherSign As %String) As %Status
{
	Set localSign = $ZCONVERT(localSign, "U")
	Set otherSign = $ZCONVERT(otherSign, "U")
	Quit localSign = otherSign
}

/// 添加自定义消息头
XData AddHeader
{
<parameters xmlns="http://www.intersystems.com/configuration">
   <request>
      <header name="BOESecurity" class="notes.SOAP.SOAPHeader"/> 
   </request>
</parameters>
}

}
