Class Interaction.Production.Clients.SOAPSoap Extends %SOAP.WebClient [ ProcedureBlock ]
{

/// This is the URL used to access the web service.
Parameter LOCATION = "http://localhost:52773/csp/healthshare/boe/services/Interaction.Production.BS.SOAP.cls";

/// This is the namespace used by the Service
Parameter NAMESPACE = "http://tempuri.org";

/// This is the name of the Service
Parameter SERVICENAME = "SOAP";

/// This is the SOAP version supported by the service.
Parameter SOAPVERSION = 1.1;

Method Send(Action As %String, pInput As %Stream.GlobalCharacter) As %Stream.GlobalCharacter [ Final, ProcedureBlock = 1, SoapBindingStyle = document, SoapBodyUse = literal, WebMethod ]
{
 Quit ..WebMethod("Send").Invoke($this,"http://tempuri.org/Interaction.Production.BS.SOAP.Send",.Action,.pInput)
}

XData parameters
{
<parameters xmlns="http://www.intersystems.com/configuration" xmlns:cfg="http://www.intersystems.com/configuration">
  <method name="Send">
    <request>
      <header name="Security" class="Interaction.Production.Clients.ns2.Security"/>
    </request>
  </method>
</parameters>
}

}
