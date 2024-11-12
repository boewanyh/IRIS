Class Classes.Models.Patient Extends %RegisteredObject
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

Index IDNumberIndex On IDNumber [ Unique ];

/// 计算BMI
/// 实例方法
Method GetBMI() As %Numeric
{
  Set bmi = ..WeightKg / (..HeightMeter**2)
  Quit bmi
}

}
