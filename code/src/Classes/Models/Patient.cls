Class Classes.Models.Patient Extends %Persistent
{

/// 主子表
Relationship ChildPatSub As Classes.Models.PatientSub [ Cardinality = children, Inverse = Parref ];

/// 类常量
Parameter CURRNTIME = {$ZDATETIME($HOROLOG, 3)};

/// 姓名
Property Name As %String(MAXLEN = 500) [ Required ];

/// 性别
Property Sex As %String(DISPLAYLIST = ",Male,Female", MAXLEN = 1, VALUELIST = ",M,F") [ SqlColumnNumber = 2, SqlFieldName = Gender ];

/// 身份证号
Property IDNumber As %String(PATTERN = "18N") [ Required ];

/// 出生日期
Property BirthDate As %Date;

/// 年龄
Property Age As %Integer [ SqlComputed ];

/// 身高
Property HeightMeter As %Numeric;

/// 体重
Property WeightKg As %Numeric;

/// 家庭地址
Property HomeAddress As Classes.Models.Address;

/// 介绍
Property Introduction As %Stream.GlobalCharacter;

/// Index MainIDX On IDNumber [ Idkey ]; //将IDNumber作为表ID
Index IDNumberIndex On IDNumber [ Unique ];

/// Index for Name
Index NameIndex On Name;

/// 年龄计算
ClassMethod AgeComputation(cols As %Library.PropertyHelper) As %String
{
  Return +$HOROLOG - cols.getfield("BirthDate")
}

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
<Value name="11">
<Value>Introduction</Value>
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
