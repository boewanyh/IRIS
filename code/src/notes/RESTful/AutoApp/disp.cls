/// Dispatch class defined by RESTSpec in notes.RESTful.AutoApp.spec
Class notes.RESTful.AutoApp.disp Extends %CSP.REST [ GeneratedBy = notes.RESTful.AutoApp.spec.cls, ProcedureBlock ]
{

/// The class containing the RESTSpec which generated this class
Parameter SpecificationClass = "notes.RESTful.AutoApp.spec";

/// Ignore any writes done directly by the REST method.
Parameter IgnoreWrites = 1;

/// By default convert the input stream to Unicode
Parameter CONVERTINPUTSTREAM = 1;

/// The default response charset is utf-8
Parameter CHARSET = "utf-8";

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
  <Route Url="/resource" Method="get" Call="GetResourceById" />
  <Route Url="/resource" Method="post" Call="CreateResource" />
</Routes>
}

ClassMethod GetResourceById() As %Status
{
    Try {
        Set response=##class(notes.RESTful.AutoApp.impl).GetResourceById()
        Do ##class(notes.RESTful.AutoApp.impl).%WriteResponse(response)
    } Catch (ex) {
        Do ##class(%REST.Impl).%ReportRESTError(..#HTTP500INTERNALSERVERERROR,ex.AsStatus(),$parameter("notes.RESTful.AutoApp.impl","ExposeServerExceptions"))
    }
    Quit $$$OK
}

ClassMethod CreateResource() As %Status
{
    Try {
        If $isobject(%request.Content) Set ppayloadBody=%request.Content
        Set response=##class(notes.RESTful.AutoApp.impl).CreateResource(.ppayloadBody)
        Do ##class(notes.RESTful.AutoApp.impl).%WriteResponse(response)
    } Catch (ex) {
        Do ##class(%REST.Impl).%ReportRESTError(..#HTTP500INTERNALSERVERERROR,ex.AsStatus(),$parameter("notes.RESTful.AutoApp.impl","ExposeServerExceptions"))
    }
    Quit $$$OK
}

}
