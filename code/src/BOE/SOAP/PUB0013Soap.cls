Class BOE.SOAP.PUB0013Soap Extends %SOAP.WebClient [ ProcedureBlock ]
{

/// This is the URL used to access the web service.
Parameter LOCATION = "https://10.208.8.5:1443/csp/hsb/DHC.Published.PUB0013.BS.PUB0013.cls";

/// This is the namespace used by the Service
Parameter NAMESPACE = "http://www.dhcc.com.cn";

/// Use xsi:type attribute for literal types.
Parameter OUTPUTTYPEATTRIBUTE = 1;

/// Determines handling of Security header.
Parameter SECURITYIN = "ALLOW";

/// This is the name of the Service
Parameter SERVICENAME = "PUB0013";

/// This is the SOAP version supported by the service.
Parameter SOAPVERSION = 1.1;

Method HIPMessageServerWECHAT(action As %String, message As %Stream.GlobalCharacter) As %Stream.GlobalCharacter [ Final, ProcedureBlock = 1, SoapBindingStyle = document, SoapBodyUse = literal, WebMethod ]
{
 Quit ..WebMethod("HIPMessageServerWECHAT").Invoke($this,"http://www.dhcc.com.cn/DHC.Published.PUB0013.BS.PUB0013.HIPMessageServerWECHAT",.action,.message)
}

XData parameters
{
<parameters xmlns="http://www.intersystems.com/configuration" xmlns:cfg="http://www.intersystems.com/configuration">
  <method name="HIPMessageServerWECHAT">
    <request>
      <header name="OAuth2Header" class="BOE.SOAP.s0.OAuth2Header"/>
    </request>
  </method>
</parameters>
}

}
