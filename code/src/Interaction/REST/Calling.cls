Class Interaction.REST.Calling Extends %RegisteredObject
{

/// Sending HTTP Request
ClassMethod SendHttpRequest()
{
	/* 创建%Net.HttpRequest的实例，设置实例属性 */
  s request = ##class(%Net.HttpRequest).%New()
	s request.Server = "localhost" //IP
	s request.Port = "52773" //端口
	s request.Location = "/api/manualapp/resource" //地址
	s request.Timeout = 3 //等待超时

	/* 认证标头*/
	s AK 		= "BOE"
	s SK 		= "rIacv39f8gZ5lH7ZMZ"
	s UUID 		= ##class(%SYSTEM.Util).CreateGUID()
	s Timestamp	= ..GetUNIXTimeStamp()
	s text 		= "ak="_AK_"sk="_SK_"timestamp="_Timestamp_"uuid="_UUID
	s Sign 		= ..MD5HexStr(text)
	d request.SetHeader("AK",AK)
	d request.SetHeader("UUID",UUID)
	d request.SetHeader("Timestamp",Timestamp)
	d request.SetHeader("Sign",Sign)

	#; /* 发送HTTP GET请求 */
	#; d request.InsertParam("Id", 1) //插入参数
	#; s status = request.Get()

	/* 发送HTTP POST请求 */
	d request.EntityBody.SetAttribute("CONTENT-TYPE","application/json")  //请求主体
	s jsonStream = ##class(%Stream.GlobalCharacter).%New()
	s jsonObj = {}
	s jsonObj.Id = "1"
	d jsonObj.%ToJSON(jsonStream) 
	d request.EntityBody.CopyFrom(jsonStream)
	s status = request.Post()

	#; /* 发送HTTP DELETE请求 */
	#; s status = request.Send("DELETE")

	/* 接收HTTP响应 */
	if $$$ISERR(status){
		w $system.Status.GetErrorText(status) ,!
	}else{
		s response = request.HttpResponse
		s statusCode = response.StatusCode
		s data = response.Data
		s dataObj = {}.%FromJSON(data)
		w dataObj.message ,!
	}
	
	/* Others */
	#; d request.InsertFormData("Id","1") //表单

	#; s request.Https=1 //https连接
	#; s request.Port=443
	#; s request.SSLConfiguration="MySSLConfiguration"
	#; s request.SSLCheckServerIdentity = 0 //禁用SSL证书检查
	
	#; s request.Username="10695144-4GA075FF" //认证方式1
	#; s request.Password="welcome1"
	#; d request.SetHeader("Authorization",token) //认证方式2  //设置标头
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
