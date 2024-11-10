Class Classes.Models.Patient Extends %RegisteredObject
{

/// 类常量
Parameter MONTH = 12;

/// 姓名
Property Name As %String;

/// 身份证号
Property IDNumber As %String;

/// 出生日期
Property BirthDate As %Date;

/// 手机号
Property PhoneNum As %String;

/// 家庭地址
Property HomeAddress As Classes.Models.Address;

Index IDNumberIndex On IDNumber [ Unique ];

}
