Import Basics

Class Classes.Method Extends %RegisteredObject
{

/// 创建保存实例
ClassMethod SavePatient() As %Status
{
  Kill ^Classes.Models.EmployeeD, ^Classes.Models.EmployeeI, ^Classes.Models.AddressD, ^Classes.Models.AddressI

  Set person = ##class(Classes.Models.Employee).%New() //创建一个对象并返回指向该对象的OREF，使用$ISOBJECT可判断是否包含OREF
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
  Write person.#CURRNTIME,! //使用引用类常量

  set status = person.%ValidateObject() //验证实例的属性
  do $system.OBJ.DisplayError(status)

  // 保存实例
  Set status = person.%Save()
  If $$$ISERR(status) {
    Do $SYSTEM.Status.DisplayError(status)
    Quit status
  }
  Quit status
}

/// 获取实例
ClassMethod GetPatientByIDNumber(IDNumber As %String) As %String
{
  // 索引
  Set id = $ORDER(^Classes.Models.EmployeeI("IDNumberIndex", " "_IDNumber, ""))
  // 打开实例
  Set person = ##class(Classes.Models.Employee).%OpenId(id) //类方法 ClssMethod
  Set name = person.Name
  Set bmi = person.GetBMI() //实例方法 Method

  write person.%ClassName(1),!, $CLASSNAME(person),! //返回实例的对象
  set NewPerson = person.%ConstructClone() //克隆对象 不同的OREF

  Quit name_"^"_bmi
}

/// 参数传递
ClassMethod Add(x As %Numeric, y As %Numeric, ByRef result As %Numeric)
{
  Set result = x + y
  Quit $$$OK
}

ClassMethod CreateObject(Output newObj As Classes.Models.Employee)
{
  Set newObj = ##class(Classes.Models.Employee).%New()
  Quit $$$OK
}

ClassMethod MultiArg(args... As %String)
{
    For i = 1 : 1 : args {
        Write "Argument[", i , "]:",  $GET(args(i), "<NULL>"), !
    }
}

ClassMethod Arguments()
{
  Do ..Add(3, 4, .result) //引用传递
  Write result,!

  Do ..CreateObject(.employee) //引用传递
  ZWrite employee

  Do ..MultiArg("a", "b", , "c") //多参数传递

  Set cls = "Classes.Method"
  Set clsmeth = "MultiArg"
  Do $CLASSMETHOD(cls, clsmeth, "a", "b") //执行方法
}

}
