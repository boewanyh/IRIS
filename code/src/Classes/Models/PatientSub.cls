Class Classes.Models.PatientSub Extends %Persistent
{

/// 主子表
Relationship Parref As Classes.Models.Patient [ Cardinality = parent, Inverse = ChildPatSub ];

Property test1 As %String;

Storage Default
{
<Data name="PatientSubDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>test1</Value>
</Value>
</Data>
<DataLocation>{%%PARENT}("ChildPatSub")</DataLocation>
<DefaultData>PatientSubDefaultData</DefaultData>
<IdLocation>^Classes.Models.PatientC("ChildPatSub")</IdLocation>
<IndexLocation>^Classes.Models.PatientSubI</IndexLocation>
<StreamLocation>^Classes.Models.PatientSubS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
