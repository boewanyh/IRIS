/// http://localhost:52773/csp/healthshare/boe/services/Interaction.SOAP.Service.cls?WSDL
Class Interaction.SOAP.Service Extends %SOAP.WebService
{

/// Name of the WebService.
Parameter SERVICENAME = "DivService";

/// TODO: change this to actual SOAP namespace.
/// SOAP Namespace for the WebService
Parameter NAMESPACE = "https://temuri.org";

/// Namespaces of referenced classes will be used in the WSDL.
Parameter USECLASSNAMESPACES = 1;

Method Div(Input1 As %String, Input2 As %String) As %String [ WebMethod ]
{
    // 获取自定义标头值
    s AK = ..HeadersIn.GetAt("Security").AK
	s UUID = ..HeadersIn.GetAt("Security").UUID
	s Timestamp = ..HeadersIn.GetAt("Security").Timestamp
	s Sign = ..HeadersIn.GetAt("Security").Sign

    // 生成本地Sign对比
    s SK = "rIacv39f8gZ5lH7ZMZ"
    s text = "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID 
	s localSign = ..MD5HexStr(text)
    s tSC = ..CompareSign(localSign, Sign)
    if tSC '= $$$OK Quit "鉴权失败"
    
    q Input1_" / "_Input2_" = "_(Input1 / Input2)
}

/// MD5加密并转成16进制字符
ClassMethod MD5HexStr(val As %String)
{
	s ret = ""
	q:val="" ""
	s enc = ##class(%SYSTEM.Encryption).MD5Hash(val)
	f j = 1 : 1 : $l(enc) d
	.s ascii = $a($e(enc,j)) 
	.if ascii < 16 s ret = ret_"0"_$zh(ascii)
	.else  s ret = ret_$zh(ascii)
	q ret
}

/// 比较本地生成的sign和入参获取到的sign是否一致
ClassMethod CompareSign(localSign As %String, otherSign As %String) As %Status
{
	s localSign = $ZCONVERT(localSign, "U")
	s otherSign = $ZCONVERT(otherSign, "U")
	q localSign = otherSign
}

/// 添加自定义消息头
XData AddHeader
{
<parameters xmlns="http://www.intersystems.com/configuration">
   <request>
      <header name="Security" class="Interaction.SOAP.Header"/> 
   </request>
</parameters>
}

}
