Class BOE.CallMDHSB Extends %RegisteredObject
{

/// ##class(BOE.CallMDHSB).Call()
ClassMethod Call()
{
	s $ze=""
	s soap = ##class(BOE.SOAP.PUB0013Soap).%New()
	s OAuth2Header = ##class(BOE.SOAP.s0.OAuth2Header).%New()
	s OAuth2Header.%apiaccesskey = "ioeMMQyQ7omUQQ_MzqJgaNRZv_tvthbglZCj4C4nDsA"
	s OAuth2Header.%apiname = "service"
	s OAuth2Header.%apiversion = "1.0"
	s OAuth2Header.%apitimestamp = ..GetUNIXTimeStamp(1)
	s OAuth2Header.%apinonce = ##class(%SYSTEM.Util).CreateGUID()
	
	
	s action = "MES0023"
	s message = "<Request><TradeCode>1012</TradeCode><ExtUserID>wx001</ExtUserID><DepartmentCode></DepartmentCode><StartDate>2024-11-20</StartDate><EndDate>2024-11-20</EndDate><HospitalId>BJMDYY</HospitalId></Request>"
	
	//签名值 --start
	s unSignStr = "_api_access_key="_OAuth2Header.%apiaccesskey_"&_api_name="_OAuth2Header.%apiname_"&_api_nonce="_OAuth2Header.%apinonce_"&_api_timestamp="_OAuth2Header.%apitimestamp_"&_api_version="_OAuth2Header.%apiversion_"&action="_$zcvt(action,"I","UTF8")_"&message="_$zcvt(message,"I","UTF8")
	s unSignStr = $ZCVT(unSignStr,"O","UTF8")
	s sk = "9TR4oCbOGwpLyT75gMox0_Ov4uG1LZ1w8EkVoGtRxnoHmA-GanFn0iL4XsWZlKum8ywjqmpemhAYd__4JTfDrA"
	s signServer = $system.Encryption.HMACSHA1(unSignStr,sk)
	s signServer = $system.Encryption.Base64Encode(signServer)
	s OAuth2Header.%apisignature = signServer
	//签名值 --End
	
 	d soap.HeadersOut.SetAt(OAuth2Header, "OAuth2Header")
 	
 	
 	s soap.Timeout = 10
	s soap.SSLConfiguration = "sslclient"
	s soap.SSLCheckServerIdentity = 0
	s output = ##class(%Stream.GlobalCharacter).%New()
	try {
		s input = ##class(%Stream.GlobalCharacter).%New()
		d input.Write(message)
		s output = soap.HIPMessageServerWECHAT(action, input)
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

/// Description : 获取当前Unix时间戳
/// Input		: aMillisecond是否携带毫秒
ClassMethod GetUNIXTimeStamp(aMillisecond As %Integer = 0) As %Integer
{
	s return=""
	s TimeStamp = $ZTIMESTAMP	//毫秒级内部时间戳(UTC)
	
	s date = $p(TimeStamp,",",1)		//日期
	s tmpTime = $e(TimeStamp,$l(date)+2,$l(TimeStamp))
	s tmpTime = $fn(tmpTime,"",3)		//毫秒尾数为0时会隐藏
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
	s return = (date * 24 * 3600) + time - Difference
	s:aMillisecond=1 return = return_millisecond
	q return
}

}
