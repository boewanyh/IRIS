Class notes.SOAPClient Extends %RegisteredObject
{

/// Create SOAPClient
ClassMethod CreateClient()
{
        s r = ##class(%SOAP.WSDL.Reader).%New()
        // s r.SSLCheckServerIdentity = 0 // 禁用SSL证书检查
        s url = "http://localhost:52773/csp/healthshare/boe/services/notes.SOAPService.cls?WSDL"
        s package = "notes.SOAPClients"
        s status = r.Process(url, package)
        i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
}

}
