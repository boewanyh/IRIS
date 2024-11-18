Import Basics

Class Classes.Method Extends %RegisteredObject
{

/// 创建保存实例
ClassMethod SavePatient() As %Status
{
  Kill ^Classes.Models.PatientD, ^Classes.Models.PatientI, ^Classes.Models.PatientS, ^Classes.Models.AddressD

  //创建一个对象并返回指向该对象的OREF，使用$ISOBJECT可判断是否包含OREF
  Set person = ##class(Classes.Models.Patient).%New() 
  Set person.Name = "wanyh"
  Set person.IDNumber = "342622199304055257"
  Set person.HeightMeter = 1.77
  Set person.WeightKg = 53
  Set address = ##class(Classes.Models.Address).%New()
  Set address.Province = "安徽省"
  Set address.City = "合肥市"
  Set address.Country = "肥西县"
  Set person.HomeAddress = address
  Write person.#CURRNTIME,! //使用引用类常量

  // 流属性 ^Classes.Models.PatientS
  Set image = ##class(%Stream.GlobalCharacter).%New()
  Do image.Write("person's image!")
  Do person.image.CopyFrom(image)

  Set status = person.%ValidateObject() //验证实例的属性
  Do $SYSTEM.OBJ.DisplayError(status)

  // 保存实例
  Set status = person.%Save()
  If $$$ISERR(status) {
    Do $SYSTEM.Status.DisplayError(status)
    Quit status
  }
  Quit status

    Quit status

  #; ID BirthDate HeightMeter HomeAddress IDNumber            Name  WeightKg  image
  #; 1            1.77        1           342622199304055257  wanyh 53.00     person's image!

  #; ^Classes.Models.PatientD	=	1
  #; ^Classes.Models.PatientD(1)	=	$lb("","wanyh","342622199304055257","",1.77,53,"1","1")
  #; ^Classes.Models.PatientI("IDNumberIndex"," 342622199304055257",1)	=	""
  #; ^Classes.Models.PatientI("NameIndex"," WANYH",1)
  #; ^Classes.Models.PatientS	=	1
  #; ^Classes.Models.PatientS(1)	=	"1,15" //下标事image的Id，不是patient的Id
  #; ^Classes.Models.PatientS(1,1)	=	"person's image!"
  #; ^Classes.Models.AddressD	=	1
  #; ^Classes.Models.AddressD(1)	=	$lb("","安徽省","合肥市","肥西县")
}

/// 获取实例
ClassMethod GetPatientByIDNumber(IDNumber As %String) As %String
{
  // 索引
  Set id = $ORDER(^Classes.Models.PatientI("IDNumberIndex", " "_IDNumber, ""))
  // 打开实例
  Set person = ##class(Classes.Models.Patient).%OpenId(id) //类方法 ClssMethod
  Set name = person.Name
  Set bmi = person.GetBMI() //实例方法 Method

  Write person.%ClassName(1),!, $CLASSNAME(person),! //返回实例的对象
  Set NewPerson = person.%ConstructClone() //克隆对象 不同的OREF

  Quit name_"^"_bmi
}

/// 参数传递
ClassMethod Add(x As %Numeric, y As %Numeric, ByRef result As %Numeric)
{
  Set result = x + y
  Quit $$$OK
}

ClassMethod CreateObject(Output newObj As Classes.Models.Patient)
{
  Set newObj = ##class(Classes.Models.Patient).%New()
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
