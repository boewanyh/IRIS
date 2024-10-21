Class notes.Production.Clients.Call Extends %RegisteredObject
{

/// Create SOAPClient
ClassMethod CreateClient()
{
	s r = ##class(%SOAP.WSDL.Reader).%New()
	#; s r.SSLCheckServerIdentity = 0 // 禁用SSL证书检查
	s url = "http://localhost:52773/csp/healthshare/boe/services/notes.Production.BS.SOAP.cls?WSDL"
	s package = "notes.Production.Clients"
	s status = r.Process(url, package)
	i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
}

/// Using SOAPClient
ClassMethod UsingClient()
{
	s $ze=""
	s client = ##class(notes.Production.Clients.SOAPSoap).%New()
	// 赋值自定义标头值
	s securityHeader = ##class(notes.Production.Clients.ns2.BOESecurity).%New()
	s AK 		= "BOE"
	s SK 		= "rIacv39f8gZ5lH7ZMZ"
	s UUID 		= ##class(%SYSTEM.Util).CreateGUID()
	s Timestamp 	= ..GetUNIXTimeStamp()
	s text 		= "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID
	s Sign 		= ..MD5HexStr(text)
	
	s securityHeader.AK 			= AK
	s securityHeader.UUID 		= UUID
	s securityHeader.Timestamp 	= Timestamp
	s securityHeader.Sign 		= Sign

 	d client.HeadersOut.SetAt(securityHeader, "BOESecurity")

	s client.Timeout = 3 //超时时间 默认30s
	s output = ##class(%Stream.GlobalCharacter).%New()
	try {
		s input = ##class(%Stream.GlobalCharacter).%New()
		d input.Write("abc")
		s output = client.Send("Action", input)
	} catch {
		if $ze["<ZSOAP>" {
			// 如果 SOAP 错误, $ZERROR的值以<ZSOAP>开头, 并且%objlasterror包含由接收到的 SOAP 错误
    		d output.Write(%objlasterror)
		} else {
            d output.Write($$$ERROR($$$ObjectScriptError,$ze))
        }
	}
	q output
}

/// MD5加密并转成16进制字符
ClassMethod MD5HexStr(val As %String)
{
	s ret = ""
	q:val="" ""
	set enc = ##class(%SYSTEM.Encryption).MD5Hash(val)
	f j=1:1:$l(enc) d
	.s ascii = $a($e(enc,j)) 
	.if ascii<16 s ret = ret_"0"_$zh(ascii)
	.else  s ret = ret_$zh(ascii)
	q ret
}

/// Description : 获取当前Unix时间戳
/// Input		: aMillisecond是否携带毫秒
ClassMethod GetUNIXTimeStamp(aMillisecond As %Integer = 0) As %Integer
{
	s return=""
	s TimeStamp = $ZTIMESTAMP	//毫秒级内部时间戳(UTC)
	
	s date = $p(TimeStamp,",",1)		//日期
	s tmpTime = $e(TimeStamp,$l(date)+2,$l(TimeStamp))
	s tmpTime = $FN(tmpTime,"",3)		//毫秒尾数为0时会隐藏
	s time = $p(tmpTime,".",1)		//时间
	s millisecond = $p(tmpTime,".",2)	//毫秒
	//转时区(UTC+8)
	s time = time + (8*3600)
	if (time > 86400) {
		s date = date + 1
		s time = time - 86400
	}
	//Unix时间戳是从1970-01-01开始，M时间从1841-01-01
	s Difference = 4070937600		//固定时间差
	s return = (date*24*3600) + time - Difference
	s:aMillisecond=1 return=return_millisecond
	q return
}

}
