/// 
Class notes.Production.Clients.ns2.BOESecurity Extends %SOAP.Header [ ProcedureBlock ]
{

Parameter ELEMENTQUALIFIED = 1;

Parameter NAMESPACE = "https://temuri.org";

Parameter XMLFORMAT = "literal";

Parameter XMLNAME = "BOESecurity";

Parameter XMLSEQUENCE = 1;

Property AK As %String(MAXLEN = "", XMLNAME = "AK");

Property UUID As %String(MAXLEN = "", XMLNAME = "UUID");

Property Timestamp As %String(MAXLEN = "", XMLNAME = "Timestamp");

Property Sign As %String(MAXLEN = "", XMLNAME = "Sign");

}
