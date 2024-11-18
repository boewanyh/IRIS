/// 注册类
Class Classes.Models.Patient Extends %Persistent
{

/// 类常量
Parameter CURRNTIME = {$ZDATETIME($HOROLOG, 3)};

/// 姓名
Property Name As %String(MAXLEN = 500) [ Required ];

/// 性别
Property Sex As %String(VALUELIST = ",M,F");

/// 身份证号
Property IDNumber As %String(PATTERN = "18N") [ Required ];

/// 出生日期
Property BirthDate As %Date;

/// 年龄
Property Age As %Integer [ SqlComputeCode = {set {*}={BirthDate}}, SqlComputed ];

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
<Value>Sex</Value>
</Value>
<Value name="4">
<Value>IDNumber</Value>
</Value>
<Value name="5">
<Value>BirthDate</Value>
</Value>
<Value name="6">
<Value>Age</Value>
</Value>
<Value name="7">
<Value>HeightMeter</Value>
</Value>
<Value name="8">
<Value>WeightKg</Value>
</Value>
<Value name="9">
<Value>HomeAddress</Value>
</Value>
<Value name="10">
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
