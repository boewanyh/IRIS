Class Interaction.Production.Messages.Response Extends Ens.Response
{

/// 输出字符串
Property OutputString As %String;

/// 输出字符流
Property OutputStream As %Stream.GlobalCharacter;

Storage Default
{
<Data name="ResponseDefaultData">
<Subscript>"Response"</Subscript>
<Value name="1">
<Value>OutputString</Value>
</Value>
<Value name="2">
<Value>OutputStream</Value>
</Value>
</Data>
<DefaultData>ResponseDefaultData</DefaultData>
<Type>%Storage.Persistent</Type>
}

}
