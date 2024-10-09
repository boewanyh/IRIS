Class notes.HttpRequest Extends %RegisteredObject
{

/// Amap WebApi Key
Parameter AMAPAPIKEY = "6225218d56b310eccc2ac4b4d280dd39";

/// Sending HTTP Request
ClassMethod SendHttpRequest()
{
	/* 创建%Net.HttpRequest的实例，设置实例属性 */
    s request = ##class(%Net.HttpRequest).%New()
	s request.Server = "restapi.amap.com" //IP
	s request.Port = "80" //端口
	s request.Location = "/v3/weather/weatherInfo" //地址
	s request.Timeout = 3 //等待超时
	
	#; /* 发送HTTP GET请求 */
	#; d request.InsertParam("key", ..#AMAPAPIKEY) //插入参数
	#; d request.InsertParam("city", "340124")
    #; d request.InsertParam("extensions", "all")
	#; s status = request.Get()

	/* 发送HTTP POST请求 */
	d request.InsertFormData("key",..#AMAPAPIKEY) //发送表单
	d request.InsertFormData("city","340124")
	d request.InsertFormData("extensions", "all")
	s status = request.Post()

	/* 接收HTTP响应 */
	if $$$ISERR(status){
		w $system.Status.GetErrorText(status),!
	}else{
		s response = request.HttpResponse
		s statusCode = response.StatusCode
		s data = response.Data
		s dataObj = {}.%FromJSON(data)
		s forecasts = dataObj.forecasts
		s itr = forecasts.%GetIterator()
		while itr.%GetNext(.key, .val){
			s province = val.province
			s city = val.city
            s reporttime = val.reporttime
            w province_city_" "_reporttime_" 播报：",!
            s casts = val.casts
            s itr = casts.%GetIterator()
            while itr.%GetNext(.key, .val){
			    s date = val.date
			    s week = $CASE(val.week, 1:"星期一", 2:"星期二", 3:"星期三", 4:"星期四", 5:"星期五", 6:"星期六", 7:"星期日")
                s dayweather = val.dayweather
                s nightweather = val.nightweather
                s daytemp = val.daytemp
                s nighttemp = val.nighttemp
                s daywind = val.daywind
                s nightwind = val.nightwind
                s daypower = val.daypower
                s nightpower = val.nightpower
			    w date_" "_week_"：白天，"_dayweather_" "_daytemp_"℃ ，"_daywind_"风"_daypower_"级；"_"夜晚，"_nightweather_" "_nighttemp_"℃ ，"_nightwind_"风"_nightpower_"级。",!
            }
		}
	}

	/* Others */
	#; s request.Https=1 //https连接
	#; s request.Port=443
	#; s request.SSLConfiguration="MySSLConfiguration"

	#; s request.Username="10695144-4GA075FF" //认证方式1
	#; s request.Password="welcome1"
	#; d request.SetHeader("Authorization",token) //认证方式2  //设置标头
		
	#; d request.EntityBody.SetAttribute("CONTENT-TYPE","application/json")  //请求主体
	#; s jsonStream = ##class(%Stream.GlobalCharacter).%New()
	#; d jsonObj.%ToJSON(jsonStream) 
	#; d request.EntityBody.CopyFrom(jsonStream)
}

}
