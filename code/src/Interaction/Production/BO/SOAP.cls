Class Interaction.Production.BO.SOAP Extends Ens.BusinessOperation
{

Parameter ADAPTER = "EnsLib.SOAP.OutboundAdapter";

Parameter INVOCATION = "Queue";

Method Call(pRequest As Interaction.Production.Messages.Request, Output pResponse As Interaction.Production.Messages.Response) As %Status
{
    s pResponse = ##class(Interaction.Production.Messages.Response).%New()
    s Action = pRequest.MessageCode
    s InputStream = pRequest.InputStream

    s OutputStream = ##class(%Stream.GlobalCharacter).%New()
    if Action = "SOAP" {
      d OutputStream.Write("返回流")
    }
    if Action = "REST" {
      d OutputStream.Write("{""message"":""success""}")
    }
    s pResponse.OutputStream = OutputStream
    q $$$OK
}

XData MessageMap
{
<MapItems>
  <MapItem MessageType="Interaction.Production.Messages.Request">
    <Method>Call</Method>
  </MapItem>
</MapItems>
}

}
