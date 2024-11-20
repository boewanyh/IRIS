/// 
Class BOE.SOAP.s0.OAuth2Header Extends %SOAP.Header [ ProcedureBlock ]
{

Parameter ELEMENTQUALIFIED = 1;

Parameter NAMESPACE = "http://www.dhcc.com.cn";

Parameter XMLFORMAT = "literal";

Parameter XMLNAME = "OAuth2Header";

Parameter XMLSEQUENCE = 1;

Property %apiaccesskey As %String(MAXLEN = "", XMLNAME = "_api_access_key");

Property %apiname As %String(MAXLEN = "", XMLNAME = "_api_name");

Property %apiversion As %String(MAXLEN = "", XMLNAME = "_api_version");

Property %apitimestamp As %String(MAXLEN = "", XMLNAME = "_api_timestamp");

Property %apinonce As %String(MAXLEN = "", XMLNAME = "_api_nonce");

Property %apisignature As %String(MAXLEN = 32767, XMLNAME = "_api_signature");

Property Authorization As %String(MAXLEN = 32767, XMLNAME = "Authorization") [ SqlFieldName = _Authorization ];

}
