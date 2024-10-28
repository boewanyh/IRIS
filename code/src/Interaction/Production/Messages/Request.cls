Class Interaction.Production.Messages.Request Extends Ens.Request
{

/// 消息代码
Property MessageCode As %String;

/// 输入字符串
Property InputString As %String;

/// 输入字符流
Property InputStream As %Stream.GlobalCharacter;

Storage Default
{
<Data name="RequestDefaultData">
<Subscript>"Request"</Subscript>
<Value name="1">
<Value>MessageCode</Value>
</Value>
<Value name="2">
<Value>InputString</Value>
</Value>
<Value name="3">
<Value>InputStream</Value>
</Value>
</Data>
<DefaultData>RequestDefaultData</DefaultData>
<Type>%Storage.Persistent</Type>
}

}
