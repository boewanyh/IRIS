/// http://localhost:52773/csp/healthshare/boe/services/Interaction.Production.BS.SOAP.cls?WSDL
Class Interaction.Production.BS.SOAP Extends EnsLib.SOAP.Service
{

Parameter ADAPTER;

Parameter NAMESPACE = "http://tempuri.org";

Parameter SERVICENAME = "SOAP";

Parameter USECLASSNAMESPACES = 1;

Method Send(Action As %String, pInput As %Stream.GlobalCharacter) As %Stream.GlobalCharacter [ WebMethod ]
{
    s pOutput = ##class(%Stream.GlobalCharacter).%New()

    // 鉴权认证
    s AK = ..HeadersIn.GetAt("Security").AK
	s UUID = ..HeadersIn.GetAt("Security").UUID
	s Timestamp = ..HeadersIn.GetAt("Security").Timestamp
	s Sign = ..HeadersIn.GetAt("Security").Sign

    s SK = "rIacv39f8gZ5lH7ZMZ" // 本地存储的SK
    s text = "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID 
	s localSign = ..MD5HexStr(text)
    s tSC = ..CompareSign(localSign, Sign)
    if tSC'=$$$OK Quit "鉴权失败"
	s pInput = ##class(%Stream.GlobalCharacter).%New()
	d pInput.Write("输入流")

	s request = ##class(Interaction.Production.Messages.Request).%New()
	s request.MessageCode = Action
	s request.InputStream = pInput

	s tSc = ..SendRequestSync("Interaction.Production.BP.BP1",request,.tResponse) //同步调用
	//s tSC = ..SendRequestAsync("Interaction.Production.BP.BP1",request) //异步调用

	d pOutput.CopyFrom(tResponse.OutputStream)
	q pOutput
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
