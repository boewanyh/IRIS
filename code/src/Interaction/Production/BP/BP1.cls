/// 
Class Interaction.Production.BP.BP1 Extends Ens.BusinessProcessBPL
{

Storage Default
{
<Type>%Storage.Persistent</Type>
}

/// BPL Definition
XData BPL [ XMLNamespace = "http://www.intersystems.com/bpl" ]
{
<process language='objectscript' request='Ens.Request' response='Ens.Response' height='2000' width='2000' >
<sequence xend='200' yend='350' >
<call name='SOAPBO' target='Interaction.Production.BO.SOAP' async='0' xpos='200' ypos='250' >
<request type='Interaction.Production.Messages.Request' >
<assign property="callrequest" value="request" action="set" />
</request>
<response type='Interaction.Production.Messages.Response' >
<assign property="response" value="callresponse" action="set" />
</response>
</call>
</sequence>
</process>
}

}
