Class notes.SOAP.SOAPClient Extends %RegisteredObject
{

/// Create SOAPClient
ClassMethod CreateClient()
{
	s r = ##class(%SOAP.WSDL.Reader).%New()
	#; s r.SSLCheckServerIdentity = 0 // 禁用SSL证书检查
	s url = "http://localhost:52773/csp/healthshare/boe/services/notes.SOAP.SOAPService.cls?WSDL"
	s package = "notes.SOAP"
	s status = r.Process(url, package)
	i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
}

/// Using SOAPClient
ClassMethod UsingClient()
{
	s $ze=""
	s client = ##class(notes.SOAP.SOAPServiceSoap).%New()
	#; s client.Location = "url" // 替换
	#; s client.SSLConfiguration = "SSL" // SSL证书
	#; s client.SSLCheckServerIdentity = "0" // 禁用SSL证书检查

	// 赋值自定义标头值
	set securityHeader = ##class(notes.SOAP.BOESecurity).%New()
	set AK 		= "BOE"
	set SK 		= "rIacv39f8gZ5lH7ZMZ"
	set UUID 		= ##class(%SYSTEM.Util).CreateGUID()
	set Timestamp 	= ..GetUNIXTimeStamp()
	set text 		= "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID
	set Sign 		= ..MD5HexStr(text)
	
	set securityHeader.AK 			= AK
	set securityHeader.UUID 		= UUID
	set securityHeader.Timestamp 	= Timestamp
	set securityHeader.Sign 		= Sign

 	do client.HeadersOut.SetAt(securityHeader, "BOESecurity")

	s client.Timeout = 3 //超时时间 默认30s

	try {
		s ans = client.Div(5, 2)
	} catch {
		if $ze["<ZSOAP>" {
			// 如果 SOAP 错误, $ZERROR的值以<ZSOAP>开头, 并且%objlasterror包含由接收到的 SOAP 错误
    		s ans = %objlasterror
		} else {
            s ans = $$$ERROR($$$ObjectScriptError,$ze)
        }
	}
	q ans
}

/// Description: 把val进行md5加密并返回结果
/// Input : val 字符串
/// Return: 加密后结果
/// Other: w ##class(DHC.Register.REG0200.CustomBO.RegisterWebService).MD5HexStr(1)
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
/// Other: zzdump websys.Conversions.BinHexS
ClassMethod Byte2Hex(val)
{
	s ret = ""
	f j=1:1:$l(val) d
	.s ascii = $a($e(val,j)) 
	.if ascii<16 set ret = ret_"0"_$zh(ascii)
	.else  set ret = ret_$zh(ascii)
	q ret
}

/// Description : 获取当前Unix时间戳
/// Input		: aMillisecond是否携带毫秒
ClassMethod GetUNIXTimeStamp(aMillisecond As %Integer = 0) As %Integer
{
	Set return=""
	Set TimeStamp = $ZTIMESTAMP	//毫秒级内部时间戳(UTC)
	
	Set date = $p(TimeStamp,",",1)		//日期
	Set tmpTime = $e(TimeStamp,$l(date)+2,$l(TimeStamp))
	Set tmpTime = $FN(tmpTime,"",3)		//毫秒尾数为0时会隐藏
	Set time = $p(tmpTime,".",1)		//时间
	Set millisecond = $p(tmpTime,".",2)	//毫秒
	//转时区(UTC+8)
	Set time = time + (8*3600)
	If (time > 86400) {
		Set date = date + 1
		Set time = time - 86400
	}
	//Unix时间戳是从1970-01-01开始，M时间从1841-01-01
	Set Difference = 4070937600		//固定时间差
	Set return = (date*24*3600) + time - Difference
	Set:aMillisecond=1 return=return_millisecond
	Quit return
}

}
