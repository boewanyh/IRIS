Class notes.SOAP.SOAPClient Extends %RegisteredObject
{

/// Create SOAPClient
ClassMethod CreateClient()
{
        s r = ##class(%SOAP.WSDL.Reader).%New()
        #; s r.SSLCheckServerIdentity = 0 // 禁用SSL证书检查
        s url = "http://localhost:52773/csp/healthshare/boe/services/notes.SOAP.SOAPService.cls?WSDL"
        s package = "notes.SOAP"
        s status = r.Process(url, package)
        i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
}

ClassMethod UsingClient()
{
        s client = ##class(notes.SOAP.SOAPServiceSoap).%New()
        #; s client.Location = "url" // 替换
        #; s client.SSLConfiguration = "SSL" // SSL证书
        #; s client.SSLCheckServerIdentity = "0" // 禁用SSL证书检查
        s out = client.Test("1")
        w out ,!
}

}
