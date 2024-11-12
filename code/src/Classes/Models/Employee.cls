/// 持久类：是%RegisteredObject的子类，增加将对象保存到磁盘、重新打开等功能
Class Classes.Models.Employee Extends (%Persistent, Patient) [ SqlTableName = MyAppEmployee ]
{

/// 薪资
Property Salary As %Integer;

/// 部门
Property Department As %String;

Index IDNumberIndex On IDNumber [ Unique ];

Storage Default
{
<Data name="EmployeeDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Salary</Value>
</Value>
<Value name="3">
<Value>Department</Value>
</Value>
<Value name="4">
<Value>IDNumber</Value>
</Value>
<Value name="5">
<Value>BirthDate</Value>
</Value>
<Value name="6">
<Value>HeightMeter</Value>
</Value>
<Value name="7">
<Value>WeightKg</Value>
</Value>
<Value name="8">
<Value>HomeAddress</Value>
</Value>
<Value name="9">
<Value>Name</Value>
</Value>
</Data>
<DataLocation>^Classes.Models.EmployeeD</DataLocation>
<DefaultData>EmployeeDefaultData</DefaultData>
<IdLocation>^Classes.Models.EmployeeD</IdLocation>
<IndexLocation>^Classes.Models.EmployeeI</IndexLocation>
<StreamLocation>^Classes.Models.EmployeeS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
