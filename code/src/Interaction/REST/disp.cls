/// 总分发类
Class Interaction.REST.disp Extends %CSP.REST
{

Parameter HandleCorsRequest = 0;

XData UrlMap [ XMLNamespace = "https://www.intersystems.com/urlmap" ]
{
<Routes>
	<Map Prefix="/manualapp" Forward="Interaction.REST.ManualApp.disp"/>
</Routes>
}

}
