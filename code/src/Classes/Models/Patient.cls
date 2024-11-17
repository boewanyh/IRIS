/// 注册类
Class Classes.Models.Patient Extends %Persistent
{

/// 类常量
Parameter CURRNTIME = {$ZDATETIME($HOROLOG, 3)};

/// 姓名
Property Name As %String [ Required ];

/// 身份证号
Property IDNumber As %String(PATTERN = "18N") [ Required ];

/// 出生日期
Property BirthDate As %Date;

/// 身高
Property HeightMeter As %Numeric;

/// 体重
Property WeightKg As %Numeric;

/// 家庭地址
Property HomeAddress As Classes.Models.Address;

/// 照片
Property image As %Stream.GlobalCharacter;

/// Index MainIDX On IDNumber [ Idkey ]; //将IDNumber作为表ID
Index IDNumberIndex On IDNumber [ Unique ];

/// Index for Name
Index NameIndex On Name;

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
<Value>HomeAddress</Value>
</Value>
<Value name="8">
<Value>image</Value>
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
