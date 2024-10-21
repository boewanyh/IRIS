Class notes.Production.BO.SOAP Extends Ens.BusinessOperation
{

Parameter ADAPTER = "EnsLib.SOAP.OutboundAdapter";

Parameter INVOCATION = "Queue";

Method Call(pRequest As notes.Production.Messages.Request, Output pResponse As notes.Production.Messages.Response) As %Status
{
    s pResponse = ##class(notes.Production.Messages.Response).%New()
    s Action = pRequest.MessageCode
    s InputStream = pRequest.InputStream

    s OutputStream = ##class(%Stream.GlobalCharacter).%New()
    d OutputStream.Write("返回流")
    s pResponse.OutputStream = OutputStream
    q $$$OK
}

XData MessageMap
{
<MapItems>
  <MapItem MessageType="notes.Production.Messages.Request">
    <Method>Call</Method>
  </MapItem>
</MapItems>
}

}
