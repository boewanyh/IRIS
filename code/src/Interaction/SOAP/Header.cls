/// 自定义加密服务消息头
Class Interaction.SOAP.Header Extends %SOAP.Header
{

Parameter NAMESPACE = "https://temuri.org";

Parameter XMLNAME = "Security";

/// 用户名
Property AK As %String;

/// UUID
Property UUID As %String;

/// 时间戳
Property Timestamp As %String;

/// Sign
Property Sign As %String;

}
