Class Interaction.Production.BS.REST Extends EnsLib.HTTP.Service
{

Parameter ADAPTER = "EnsLib.HTTP.InboundAdapter";

Method OnProcessInput(pStreamIn As %CharacterStream, Output pStreamOut As %CharacterStream) As %Status
{
    s request = ##class(Interaction.Production.Messages.Request).%New()
    s request.MessageCode = "REST"
    s request.InputStream = pStreamIn

    s tSc = ..SendRequestSync("Interaction.Production.BP.BP1",request,.tResponse) //同步调用
    //s tSC = ..SendRequestAsync("Interaction.Production.BP.BP1",request) //异步调用

    s pStreamOut = tResponse.OutputStream

	Quit $$$OK
}

}
