Class BOE.CallMDHSB Extends %RegisteredObject
{

/// 调用明德平台发布的微信公众号服务
/// ##class(BOE.CallMDHSB).Call()
ClassMethod Call()
{
    Set $ZERROR=""
    
    // 初始化 SOAP 和 OAuth2 头对象
    Set soap = ##class(BOE.SOAP.PUB0013Soap).%New()
    Set OAuth2Header = ##class(BOE.SOAP.s0.OAuth2Header).%New()
    
    // 设置 OAuth2 头信息
    Set OAuth2Header.%apiaccesskey = "_KBKxKST61yfIQbmqXIWI1Li4IeMTdUOO_jBYbC2h8Y" //= "ioeMMQyQ7omUQQ_MzqJgaNRZv_tvthbglZCj4C4nDsA"
    Set OAuth2Header.%apiname = "service"
    Set OAuth2Header.%apiversion = "1.0"
    Set OAuth2Header.%apitimestamp = "1732774269373" //..GetUNIXTimeStamp(1)
    Set OAuth2Header.%apinonce = "7b2d151ce1cd4d42acd92e1c05c21311" //##class(%SYSTEM.Util).CreateGUID()
    
    // 定义 action 和 message
    Set action = "MES0063" //"MES0023"
    Set message = "2000341718" //"<Request><TradeCode>1012</TradeCode><ExtUserID>wx001</ExtUserID><DepartmentCode></DepartmentCode><StartDate>2024-11-28</StartDate><EndDate>2024-11-28</EndDate><HospitalId>BJMDYY</HospitalId></Request>"
    Set action = $ZCONVERT(action,"I","UTF8")
    Set message = $ZCONVERT(message,"I","UTF8") // 等同于 $ZCONVERT(message,"O","RAW")
    
    
    // 生成签名字符串
    Set unSignStr = "_api_access_key="_OAuth2Header.%apiaccesskey_"&_api_name="_OAuth2Header.%apiname_"&_api_nonce="_OAuth2Header.%apinonce_"&_api_timestamp="_OAuth2Header.%apitimestamp_"&_api_version="_OAuth2Header.%apiversion_"&action="_action_"&message="_message
    Set unSignStr = $ZCONVERT(unSignStr,"O","UTF8")
    Set sk = "LZ0nT9waz-pVTZwEYIEwsFyvNbSTriij3BMi4oEBZ4VUJJxedvdFinNnYqBka-VaqjXTuVIHQ2OI3fcunlw8QQ" //"9TR4oCbOGwpLyT75gMox0_Ov4uG1LZ1w8EkVoGtRxnoHmA-GanFn0iL4XsWZlKum8ywjqmpemhAYd__4JTfDrA"
    Set signServer = $SYSTEM.Encryption.HMACSHA1(unSignStr, sk)
    Set signServer = $SYSTEM.Encryption.Base64Encode(signServer)
    Set OAuth2Header.%apisignature = signServer
    
    // 设置 SOAP 请求头
    Do soap.HeadersOut.SetAt(OAuth2Header, "OAuth2Header")
    
    // 设置 SOAP 配置
    Set soap.Timeout = 10
    Set soap.SSLConfiguration = "sslclient"
    Set soap.SSLCheckServerIdentity = 0
    
    // 初始化输出流
    Set output = ##class(%Stream.GlobalCharacter).%New()
    
    Try {
        // 初始化输入流并写入消息
        Set input = ##class(%Stream.GlobalCharacter).%New()
        Do input.Write(message)
        
        // 发送 SOAP 请求并接收响应
        Set output = soap.HIPMessageServerWECHAT(action, input)
    } Catch {
        If $ZERROR["<ZSOAP>" {
            // 如果是 SOAP 错误，写入 %objlasterror
            Do output.Write(%objlasterror)
        } Else {
            // 处理其他错误
            Do output.Write($$$ERROR($$$ObjectScriptError, $ZERROR))
        }
    }
    
    Quit output
}

/// Description : 获取当前Unix时间戳
/// Input       : aMillisecond是否携带毫秒
ClassMethod GetUNIXTimeStamp(aMillisecond As %Integer = 0) As %Integer
{
    Set return=""
    Set TimeStamp = $ZTIMESTAMP		// 毫秒级内部时间戳(UTC)
    
    Set date = $PIECE(TimeStamp, ",", 1)				// 日期
    Set tmpTime = $EXTRACT(TimeStamp, $LENGTH(date)+2, $LENGTH(TimeStamp))
    Set tmpTime = $FNUMBER(tmpTime, "", 3)
    Set time = $PIECE(tmpTime, ".", 1)          // 时间
    Set millisecond = $PIECE(tmpTime, ".", 2)   // 毫秒
    
    // 转时区(UTC+8)
    Set time = time + (8*3600)
    If (time > 86400) {
        Set date = date + 1
        Set time = time - 86400
    }
    
    // Unix时间戳是从1970-01-01开始，M 时间从1841-01-01
    Set Difference = 4070937600		// 固定时间差
    Set return = (date * 24 * 3600) + time - Difference
    Set:aMillisecond=1 return = return_millisecond
    
    Quit return
}

}
