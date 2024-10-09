/// 总分发类
Class notes.RESTful.disp Extends %CSP.REST
{

Parameter HandleCorsRequest = 0;

XData UrlMap [ XMLNamespace = "https://www.intersystems.com/urlmap" ]
{
<Routes>
	<Map Prefix="/manualapp" Forward="notes.RESTful.ManualApp.disp"/>
</Routes>
}

}
