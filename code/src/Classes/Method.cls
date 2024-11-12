/// 注册类
Class Classes.Method Extends %RegisteredObject
{

/// 创建保存实例
ClassMethod SavePatient() As %Status
{
  Kill ^Classes.Models.EmployeeD
  Kill ^Classes.Models.EmployeeI
  Kill ^Classes.Models.AddressD
  Kill ^Classes.Models.AddressI
   // 创建对象
  Set person = ##class(Classes.Models.Employee).%New()
  Set person.Name = "wanyh"
  Set person.IDNumber = "342622199304055257"
  Set person.HeightMeter = 1.77
  Set person.WeightKg = 53
  Set person.Salary = 10000
  Set person.Department = "IT"
  Set address = ##class(Classes.Models.Address).%New()
  Set address.Province = "安徽省"
  Set address.City = "合肥市"
  Set address.Country = "肥西县"
  Set person.HomeAddress = address
  // 保存实例
  Set status = person.%Save()
  If $$$ISERR(status) {
    Do $SYSTEM.Status.DisplayError(status)
    Quit status
  }
  Quit status
}

/// 获取实例
ClassMethod GetPatient() As %String
{
  // 打开实例
  Set person = ##class(Classes.Models.Employee).%OpenId(1) //类方法 ClssMethod
  Set name = person.Name
  Set bmi = person.GetBMI() //实例方法 Method
  Quit name_"^"_bmi
}

}
