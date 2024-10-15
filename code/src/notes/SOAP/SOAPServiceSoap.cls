Class notes.SOAP.SOAPServiceSoap Extends %SOAP.WebClient [ ProcedureBlock ]
{

/// This is the URL used to access the web service.
Parameter LOCATION = "http://localhost:52773/csp/healthshare/boe/services/notes.SOAP.SOAPService.cls";

/// This is the namespace used by the Service
Parameter NAMESPACE = "https://temuri.org";

/// This is the name of the Service
Parameter SERVICENAME = "SOAPService";

/// This is the SOAP version supported by the service.
Parameter SOAPVERSION = 1.1;

Method Test(Input As %String) As %String [ Final, ProcedureBlock = 1, SoapBindingStyle = document, SoapBodyUse = literal, WebMethod ]
{
 Quit ..WebMethod("Test").Invoke($this,"https://temuri.org/notes.SOAP.SOAPService.Test",.Input)
}

}
