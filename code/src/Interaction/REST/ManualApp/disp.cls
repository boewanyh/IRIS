/// 分发类
Class Interaction.REST.ManualApp.disp Extends %CSP.REST
{

Parameter HandleCorsRequest = 0;

XData UrlMap [ XMLNamespace = "https://www.intersystems.com/urlmap" ]
{
<Routes>
	 <Route Url = "/resource" Method = "GET" Call = "GetResourceById" />
	 <Route Url = "/resource" Method = "POST" Call = "CreateResource" />
</Routes>
}

/// GET http://localhost:52773/api/manualapp/resource
ClassMethod GetResourceById() As %Status
{
    Try {
        d ##class(%REST.Impl).%SetContentType("application/json")
        if '##class(%REST.Impl).%CheckAccepts("application/json"){
	    	d ##class(%REST.Impl).%ReportRESTError(..#HTTP406NOTACCEPTABLE, $$$ERROR($$$RESTBadAccepts))
	    	q  
	    }

        // 鉴权
        // 1. 获取标头
        s AK = %request.GetCgiEnv("HTTP_AK","")
        s UUID = %request.GetCgiEnv("HTTP_UUID", "")
        s Timestamp = %request.GetCgiEnv("HTTP_TIMESTAMP", "")
        s Sign = %request.GetCgiEnv("HTTP_SIGN", "")

        // 2. 生成本地Sign对比
        s SK = "rIacv39f8gZ5lH7ZMZ"
        s text = "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID 
        s localSign = ..MD5HexStr(text)
        s tSC = ..CompareSign(localSign, Sign)

        if tSC '= $$$OK {
            s response = {"message": "鉴权失败"}
        }else {
            s response = ##class(Interaction.REST.ManualApp.impl).GetResourceById()
        }
    } Catch (ex) {
        d ##class(%REST.Impl).%SetStatusCode("400")
        s response =  {"errormessage": "Client error"}
    }
    d ##class(%REST.Impl).%WriteResponse(response)
    q $$$OK
}

/// POST http://localhost:52773/api/manualapp/resource
ClassMethod CreateResource() As %Status
{
    Try {
        d ##class(%REST.Impl).%SetContentType("application/json")
        if '##class(%REST.Impl).%CheckAccepts("application/json"){
	    	d ##class(%REST.Impl).%ReportRESTError(..#HTTP406NOTACCEPTABLE, $$$ERROR($$$RESTBadAccepts))
	    	q  
	    }

         // 鉴权
        // 1. 获取标头
        s AK = %request.GetCgiEnv("HTTP_AK","")
        s UUID = %request.GetCgiEnv("HTTP_UUID", "")
        s Timestamp = %request.GetCgiEnv("HTTP_TIMESTAMP", "")
        s Sign = %request.GetCgiEnv("HTTP_SIGN", "")

        // 2. 生成本地Sign对比
        s SK = "rIacv39f8gZ5lH7ZMZ"
        s text = "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID 
        s localSign = ..MD5HexStr(text)
        s tSC = ..CompareSign(localSign, Sign)

        if tSC '= $$$OK {
            s response = {"message": "鉴权失败"}
        }else {
             if $isobject(%request.Content) s ppayloadBody=%request.Content
            s response = ##class(Interaction.REST.ManualApp.impl).CreateResource(.ppayloadBody)
            
        }
    } Catch (ex) {
        d ##class(%REST.Impl).%SetStatusCode("400")
        s response =  {"errormessage": "Client error"}
    }
    d ##class(%REST.Impl).%WriteResponse(response)
    q $$$OK
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

}
