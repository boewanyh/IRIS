/// 要访问测试页面，需切换至%SYS命名空间，运行:
/// set ^SYS("Security","CSP","AllowClass","/csp/healthshare/boe/services/","%SOAP.WebServiceInfo")=1
/// set ^SYS("Security","CSP","AllowClass","/csp/healthshare/boe/services/","%SOAP.WebServiceInvoke")=1
/// http://localhost:52773/csp/healthshare/boe/services/notes.SOAP.SOAPService.cls?WSDL
Class notes.SOAP.SOAPService Extends %SOAP.WebService
{

/// Name of the WebService.
Parameter SERVICENAME = "SOAPService";

/// TODO: change this to actual SOAP namespace.
/// SOAP Namespace for the WebService
Parameter NAMESPACE = "https://temuri.org";

/// Namespaces of referenced classes will be used in the WSDL.
Parameter USECLASSNAMESPACES = 1;

Method Div(Input1 As %String, Input2 As %String) As %String [ WebMethod ]
{
    q Input1_" / "_Input2_" = "_(Input1 / Input2)
}

}
