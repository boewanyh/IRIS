Class Classes.Models.Patient Extends %Persistent
{

/// 类常量
Parameter MONTH = 12;

/// 姓名
Property Name As %String;

/// 身份证号
Property IDNumber As %String;

/// 出生日期
Property BirthDate As %Date;

/// 身高
Property HeightMeter As %String;

/// 体重
Property WeightKg As %String;

/// 手机号
Property PhoneNum As %String;

/// 家庭地址
Property HomeAddress As Classes.Models.Address;

Index IDNumberIndex On IDNumber [ Unique ];

/// 计算BMI
/// 实例方法
Method GetBMI() As %Numeric
{
  Set bmi = ..WeightKg / (..HeightMeter**2)
  Quit bmi
}

Storage Default
{
<Data name="PatientDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Name</Value>
</Value>
<Value name="3">
<Value>IDNumber</Value>
</Value>
<Value name="4">
<Value>BirthDate</Value>
</Value>
<Value name="5">
<Value>HeightMeter</Value>
</Value>
<Value name="6">
<Value>WeightKg</Value>
</Value>
<Value name="7">
<Value>PhoneNum</Value>
</Value>
<Value name="8">
<Value>HomeAddress</Value>
</Value>
</Data>
<DataLocation>^Classes.Models.PatientD</DataLocation>
<DefaultData>PatientDefaultData</DefaultData>
<IdLocation>^Classes.Models.PatientD</IdLocation>
<IndexLocation>^Classes.Models.PatientI</IndexLocation>
<StreamLocation>^Classes.Models.PatientS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
