Class notes.Production.BS.SOAP Extends EnsLib.SOAP.Service
{

Parameter ADAPTER;

Parameter NAMESPACE = "http://tempuri.org";

Parameter SERVICENAME = "BSdemo";

Method Send(Action As %String, pInput As %Stream.GlobalCharacter) As %Stream.GlobalCharacter [ WebMethod ]
{
    set pOutput=##class(%Stream.GlobalCharacter).%New()

    // 鉴权认证
    s AK = ..HeadersIn.GetAt("BOESecurity").AK
	s UUID = ..HeadersIn.GetAt("BOESecurity").UUID
	s Timestamp = ..HeadersIn.GetAt("BOESecurity").Timestamp
	s Sign = ..HeadersIn.GetAt("BOESecurity").Sign

    s SK = "rIacv39f8gZ5lH7ZMZ" // 本地存储的SK
    s text = "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID 
	s localSign = ..MD5HexStr(text)
    s tSC = ..CompareSign(localSign, Sign)
    if tSC'=$$$OK Quit "鉴权失败"
}

/// md5加密并转成16进制字符
ClassMethod MD5HexStr(val As %String)
{
	s ret = ""
	Quit:val="" ""
	set enc = ##class(%SYSTEM.Encryption).MD5Hash(val)
	f j=1:1:$l(enc) d
	.s ascii = $a($e(enc,j)) 
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
