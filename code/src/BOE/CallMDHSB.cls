Class BOE.CallMDHSB Extends %RegisteredObject
{

/// ##class(BOE.CallMDHSB).Call()
ClassMethod Call()
{
    // 定义 action 和 message
    Set action = "MES0023"
    Set message = "<Request><TradeCode>1012</TradeCode><ExtUserID>wx001</ExtUserID><DepartmentCode></DepartmentCode><StartDate>2024-11-19</StartDate><EndDate>2024-11-19</EndDate><HospitalId>BJMDYY</HospitalId><test>中文</test></Request>"
    
    Set action = $ZCONVERT(action,"I","UTF8")
    Set message = $ZCONVERT(message,"I","UTF8")
    
    // 生成签名字符串
    Set unSignStr = "_api_access_key=ak&_api_name=service&_api_nonce=2FDC553E-467F-444F-9C35-802FF7936C68&_api_timestamp=1559467961208&_api_version=1.0"_"&action="_action_"&message="_message
    Set unSignStr = $ZCONVERT(unSignStr,"O","UTF8")
    Set sk = "secret"
    Set signServer = $SYSTEM.Encryption.HMACSHA1(unSignStr, sk)
    Set signServer = $SYSTEM.Encryption.Base64Encode(signServer)
    
    w !,signServer
}

}
