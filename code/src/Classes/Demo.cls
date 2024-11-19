Import Basics

Class Classes.Demo Extends %RegisteredObject
{

/// 创建保存实例
ClassMethod SavePatient() As %Status
{
  Kill ^Classes.Models.PatientD, ^Classes.Models.PatientI, ^Classes.Models.PatientS, ^Classes.Models.AddressD

  // 创建一个对象并返回指向该对象的OREF
  Set person = ##class(Classes.Models.Patient).%New() 
  Set person.Name = "wanyh"
  Set person.Sex = "M"
  Set person.IDNumber = "342622199304055257"
  Set person.HeightMeter = 1.77
  Set person.WeightKg = 53
  #; Set person.HomeAddress = ##class(Classes.Models.Address).%OpenId(1)
  Set person.HomeAddress = ##class(Classes.Models.Address).%New()
  Set person.HomeAddress.Province = "安徽省"
  Set person.HomeAddress.City = "合肥市"
  Set person.HomeAddress.Country = "肥西县"

  // 使用引用类常量
  Write person.#CURRNTIME,! 

  // 流属性 ^Classes.Models.PatientS
  // %Stream.GlobalCharacter, %Stream.GlobalBinary, %Stream.FileCharacter, %Stream.FileBinary
  Set introduction = ##class(%Stream.GlobalCharacter).%New()
  Do introduction.Write("person's introduction!")
  Do person.Introduction.CopyFrom(introduction)

  //验证实例的属性
  Set status = person.%ValidateObject()

  // 保存实例
  Set status = person.%Save()
  If $$$ISERR(status) {
    Do $SYSTEM.Status.DisplayError(status)
    Quit status
  }
  Quit status
}

/// 获取实例
ClassMethod GetPatientByIDNumber(IDNumber As %String = "342622199304055257") As %String
{
  // 索引
  Set id = $ORDER(^Classes.Models.PatientI("IDNumberIndex", " "_IDNumber, ""))
  // 打开实例
  Set person = ##class(Classes.Models.Patient).%OpenId(id)

  // 判断是否包含OREF
  Set status = $ISOBJECT(person) 
  
  // 获取属性
  Set name = person.Name
  Set sex = person.Sex

  // 流属性
  Set introduction = person.Introduction
  Write introduction.Size,! //流大小
  Write introduction.FindAt(1, "in"),! //查找字符串位置
  Do introduction.MoveTo(10) //移动到流的给定位置
  Do introduction.MoveToEnd() //移动到流的末尾
  Do introduction.Write("New Strings!") //从当前位置附加至流
  Do introduction.Rewind() //移至流的开头
  While 'introduction.AtEnd { //流末尾时true
    Set len = 10
    Write introduction.Read(.len) //读取流
  }

  // 调用实例方法
  Set bmi = person.GetBMI()

  // 对象其他操作
  //Do person.%DeleteId(id) //删除实例
  Write person.%Id(),! //对象 ID 值
  Write person.%Oid(),! //对象 OID 值
  Write ##class(Classes.Models.Patient).%ExistsId(1),! //检查指定的ID是否存在
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

  Set cls = "Classes.Demo"
  Set clsmeth = "MultiArg"
  Do $CLASSMETHOD(cls, clsmeth, "a", "b") //执行方法
}

}
