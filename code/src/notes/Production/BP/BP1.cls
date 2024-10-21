/// 
Class notes.Production.BP.BP1 Extends Ens.BusinessProcessBPL
{

/// BPL Definition
XData BPL [ XMLNamespace = "http://www.intersystems.com/bpl" ]
{
<process language='objectscript' request='Ens.Request' response='Ens.Response' height='2000' width='2000' >
<sequence xend='200' yend='350' >
<call name='SOAPBO' target='notes.Production.BO.SOAP' async='0' xpos='200' ypos='250' >
<request type='notes.Production.Messages.Request' >
<assign property="callrequest" value="request" action="set" />
</request>
<response type='notes.Production.Messages.Response' >
<assign property="response" value="callresponse" action="set" />
</response>
</call>
</sequence>
</process>
}

Storage Default
{
<Type>%Storage.Persistent</Type>
}

}
