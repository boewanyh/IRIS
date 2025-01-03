Class Interaction.SOAP.Client.DivServiceSoap Extends %SOAP.WebClient [ ProcedureBlock ]
{

/// This is the URL used to access the web service.
Parameter LOCATION = "http://localhost:52773/csp/healthshare/boe/services/Interaction.SOAP.Service.cls";

/// This is the namespace used by the Service
Parameter NAMESPACE = "https://temuri.org";

/// This is the name of the Service
Parameter SERVICENAME = "DivService";

/// This is the SOAP version supported by the service.
Parameter SOAPVERSION = 1.1;

Method Div(Input1 As %String, Input2 As %String) As %String [ Final, ProcedureBlock = 1, SoapBindingStyle = document, SoapBodyUse = literal, WebMethod ]
{
 Quit ..WebMethod("Div").Invoke($this,"https://temuri.org/Interaction.SOAP.Service.Div",.Input1,.Input2)
}

XData parameters
{
<parameters xmlns="http://www.intersystems.com/configuration" xmlns:cfg="http://www.intersystems.com/configuration">
  <method name="Div">
    <request>
      <header name="Security" class="Interaction.SOAP.Client.Security"/>
    </request>
  </method>
</parameters>
}

}
