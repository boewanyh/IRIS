/// Purpose: This class store location data for airports.
Class Basics.Models.Location Extends %Persistent [ DdlAllowed ]
{

Property City As %String;

Property State As %String;

Storage Default
{
<Data name="LocationDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>City</Value>
</Value>
<Value name="3">
<Value>State</Value>
</Value>
</Data>
<DataLocation>^Basics.Models.LocationD</DataLocation>
<DefaultData>LocationDefaultData</DefaultData>
<IdLocation>^Basics.Models.LocationD</IdLocation>
<IndexLocation>^Basics.Models.LocationI</IndexLocation>
<StreamLocation>^Basics.Models.LocationS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
