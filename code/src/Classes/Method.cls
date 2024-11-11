Class Classes.Method Extends %RegisteredObject
{

/// 创建保存实例
ClassMethod SavePatient() As %Status
{
  // 创建对象
  Set patient = ##class(Classes.Models.Patient).%New() //实例方法
  Set patient.Name = "wanyh"
  Set patient.IDNumber = "342622199304055257"
  // 保持实例
  Set status = patient.%Save()
  If $$$ISERR(status) {
    Do $SYSTEM.Status.DisplayError(status)
    Quit status
  }
  Quit status
  // ^Classes.Models.PatientD=1
  // ^Classes.Models.PatientD(1)=$lb("","wanyh","342622199304055257",....)
  // ^Classes.Models.PatientI("IDNumberIndex"," 342622199304055257",1)=""
}

ClassMethod GetPatient() As %String
{
  // 打开实例
  Set patient = ##class(Classes.Models.Patient).%OpenId(1) //类方法 ClssMethod
  Set name = patient.Name
  Set bmi = patient.GetBMI() //实例方法 Method
  Quit 0
}

}
