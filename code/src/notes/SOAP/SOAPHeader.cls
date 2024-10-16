/// 自定义加密服务消息头
Class notes.SOAP.SOAPHeader Extends %SOAP.Header
{

Parameter NAMESPACE = "https://temuri.org";

Parameter XMLNAME = "BOESecurity";

/// 用户名
Property AK As %String(MAXLEN = "");

/// UUID
Property UUID As %String(MAXLEN = "");

/// 时间戳
Property Timestamp As %String(MAXLEN = "");

/// Sign
Property Sign As %String(MAXLEN = "");

}
