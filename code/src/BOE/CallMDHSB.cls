Class BOE.CallMDHSB Extends %RegisteredObject
{

/// 调用明德平台发布的服务
/// ##class(BOE.CallMDHSB).Call()
ClassMethod Call()
{
    Set $ZERROR=""
    
    // 初始化 SOAP 和 OAuth2 头对象
    Set soap = ##class(BOE.SOAP.PUB0016Soap).%New()
    Set OAuth2Header = ##class(BOE.SOAP.s0.OAuth2Header).%New()
    
    // 设置 OAuth2 头信息
    Set OAuth2Header.%apiaccesskey = "yt8R4nwSnnyefoyUt411uwI5ggHLWx_P-gW9wiCoQE0"
    Set OAuth2Header.%apiname = "service"
    Set OAuth2Header.%apiversion = "1.0"
    Set OAuth2Header.%apitimestamp = ..GetUNIXTimeStamp(1)
    Set OAuth2Header.%apinonce = ##class(%SYSTEM.Util).CreateGUID()
    
    // 定义 action 和 message
    Set action = "MES0081"
    Set message = "{""drugCode"":""112103012IJ1"",""itemType"":{""code"":""1"",""value"":""药品""},""classLevel1"":{""code"":""1"",""value"":""化学药品""},""classLevel2"":{""code"":""2100"",""value"":""血液系统用药物""},""classLevel3"":{""code"":""2103"",""value"":""抗凝血药""},""doseModel"":{""code"":""IJ"",""value"":""注射剂""},""itemDesc"":""依诺肝素钠注射液(0.4ml:4000AxaIU/支)"",""regularName"":""依诺肝素钠注射液"",""regularNamePy"":""YNGSNZSY"",""regularNameWb"":""WYEGQITI"",""tradeName"":"""",""tradeNamePy"":"""",""tradeNameWb"":"""",""specs"":""0.4ml:4000AxaIU/支"",""regulatoryClass"":{""code"":"""",""value"":""""},""isEasyToPoison"":0,""isContainDope"":0,""isOtc"":0,""isBasicDrug"":0,""inventoryGroup"":{""code"":""002"",""value"":""西药""},""inventoryClass"":{""code"":""029"",""value"":""针剂""},""isOriginalResearch"":0,""basicUnitCode"":{""code"":""067"",""value"":""支""},""packagingUnit"":{""code"":""036"",""value"":""盒""},""packagingConversionFactor"":""2"",""baseDose"":""4000"",""baseDoseUnit"":{""code"":""001"",""value"":""AXaIU""},""secondBaseDose"":""0.40"",""secondBaseDoseUnit"":{""code"":""011"",""value"":""ml""},""manufacturerCode"":""4130523"",""manufacturerName"":""杭州九源基因工程股份有限公司"",""license"":""浙20000009"",""licenseIssueDate"":""20210115000000"",""licenseValidDate"":""20251108000000"",""approvalNumber"":""国药准字H20064066"",""approvalIssueDate"":""20201130000000"",""approvalValidDate"":""20251129000000"",""itemSource"":{""code"":""1"",""value"":""国产""},""isNationNegotiation"":0,""standardCode"":""86904488000197"",""storageConditions"":{""code"":""3"",""value"":""阴凉""},""hefeiUse"":""0"",""chengduUse"":""0"",""suzhouUse"":""0"",""mingdeUse"":""1"",""beijingUse"":""0"",""oldDrugCode"":"""",""createBy"":""admin"",""createTime"":""20210730104605"",""validFlag"":""1"",""countryDrugCode"":"""",""centralPurDose"":{""code"":"""",""value"":""""},""centralPurClass"":{""code"":"""",""value"":""""},""specialDrug"":{""code"":"""",""value"":""""},""holderManuName"":""杭州九源基因工程股份有限公司""}"
    Set actionRAW = $ZCONVERT(action,"I","UTF8")
    Set messageRAW = $ZCONVERT(message,"I","UTF8") // 等同于 $ZCONVERT(message,"O","RAW")
    
    
    // 生成签名字符串
    Set unSignStr = "_api_access_key="_OAuth2Header.%apiaccesskey_"&_api_name="_OAuth2Header.%apiname_"&_api_nonce="_OAuth2Header.%apinonce_"&_api_timestamp="_OAuth2Header.%apitimestamp_"&_api_version="_OAuth2Header.%apiversion_"&action="_actionRAW_"&message="_messageRAW
    Set unSignStr = $ZCONVERT(unSignStr,"O","UTF8")
    Set sk = "SP4xiCg-lbp44l6oRAPq6l4sBG3COq4SRBOgFCIPmA9netdAJ6jpolPsxp7eESrWtJd908IEZnXHWp68ff_Uew"
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
        Set output = soap.HIPService(action, input)
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
