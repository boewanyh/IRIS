/// 分发类
Class notes.RESTful.ManualApp.disp Extends %CSP.REST
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
        s response = ##class(notes.RESTful.ManualApp.impl).GetResourceById()
        d ##class(%REST.Impl).%WriteResponse(response)
    } Catch (ex) {
        d ##class(%REST.Impl).%SetStatusCode("400")
        return {"errormessage": "Client error"}
    }
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
	    if $isobject(%request.Content) s ppayloadBody=%request.Content
        s response = ##class(notes.RESTful.ManualApp.impl).CreateResource(.ppayloadBody)
        d ##class(%REST.Impl).%WriteResponse(response)
    } Catch (ex) {
        d ##class(%REST.Impl).%SetStatusCode("400")
        return {"errormessage": "Client error"}
    }
    q $$$OK
}

}
