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

}
