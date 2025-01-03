Class Classes.Models.Address Extends %Persistent [ SqlTableName = PatientAddress ]
{

/// 省
Property Province As %String;

/// 市
Property City As %String;

/// 县
Property Country As %String;

Storage Default
{
<Data name="AddressDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Province</Value>
</Value>
<Value name="3">
<Value>City</Value>
</Value>
<Value name="4">
<Value>Country</Value>
</Value>
</Data>
<DataLocation>^Classes.Models.AddressD</DataLocation>
<DefaultData>AddressDefaultData</DefaultData>
<IdLocation>^Classes.Models.AddressD</IdLocation>
<IndexLocation>^Classes.Models.AddressI</IndexLocation>
<StreamLocation>^Classes.Models.AddressS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
