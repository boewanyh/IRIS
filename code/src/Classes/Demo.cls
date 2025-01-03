Class Classes.Demo Extends %RegisteredObject
{

/// 创建保存实例
ClassMethod SavePatient() As %Status
{

  // 创建一个对象并返回指向该对象的OREF
  Set person = ##class(Classes.Models.Patient).%New() 
  Set person.Name = "wanyh"
  Set person.Sex = "M"
  Set person.IDNumber = "342622199304055257"
  Set person.BirthDate = $ZDATEH("1993-04-05",3)
  Set person.HeightMeter = 1.77
  Set person.WeightKg = 53
  Set person.HomeAddress = ##class(Classes.Models.Address).%OpenId(1)

  // 流属性 ^Classes.Models.PatientS
  // %Stream.GlobalCharacter, %Stream.GlobalBinary
  // %Stream.FileCharacter, %Stream.FileBinary
  Set introduction = ##class(%Stream.GlobalCharacter).%New()
  Do introduction.Write("person's introduction!")
  Do person.Introduction.CopyFrom(introduction)

  // 保存实例
  Set status = person.%Save()

  // 主子表
  Set personSub = ##class(Classes.Models.PatientSub).%New()
  Set personSub.Parref = person
  Set personSub.test1 = "test1"
  Set status = personSub.%Save()

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
  
  // 获取属性
  Set name = person.Name
  Set birthDate = $ZDATE(person.BirthDate,3)
  Set Age = person.Age
  Set HomeAddress = ##class(Classes.Models.Address).%OpenId(1)
  Set Province = HomeAddress.Province

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

  // 使用引用类常量
  Write person.#CURRNTIME,! 

  // 调用实例方法
  Set bmi = person.GetBMI()

  // 对象其他操作
  //Do person.%DeleteId(id) //删除实例
  Write person.%Id(),! //对象 ID 值
  Write ##class(Classes.Models.Patient).%ExistsId(1),! //检查指定的ID是否存在
  Write person.%ClassName(1),!, $CLASSNAME(person),! //返回实例的对象
  Set NewPerson = person.%ConstructClone() //克隆对象 不同的OREF

  // 主子表
  Set sub = 0
  For {
    Set sub = $ORDER(^Classes.Models.PatientD(id,"ChildPatSub",sub))
    Quit:sub=""
    Set test1 = $LISTGET(^Classes.Models.PatientD(id,"ChildPatSub",sub),2)
  }

  Quit name_"^"_bmi
}

/// 参数传递
ClassMethod Arguments()
{
  Do ..Add(3, 4, .result) //引用传递
  Write result,!

  Do ..CreateObject(.employee) //引用传递
  ZWrite employee

  Do ..MultiArg("a", "b", , "c") //多参数传递
}

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

/// 使用类查询
ClassMethod UseQuery()
{
  Set statement = ##class(%SQL.Statement).%New()
  Set status = statement.%PrepareClassQuery("Classes.ClassQueries","ByName")
  Set rset = statement.%Execute("wanyh")
  While rset.%Next()
  {
    Write !, rset.%Get("Name")
  }
}

/// 基本类查询 %SQLQuery
/// d ##class(%ResultSet).RunQuery("Classes.Demo", "ByName", "wanyh")
/// CALL Classes.Patient_By_Name("wanyh")
Query ByName(name As %String = "") As %SQLQuery(CONTAINID = 1, ROWSPEC = "ID:%Integer,Name,IDNumber", SELECTMODE = "RUNTIME") [ SqlName = Patient_By_Name, SqlProc ]
{
  SELECT ID, Name, IDNumber
    FROM Classes_Models.Patient
    WHERE Name =:name
}

/// 自定义类查询 %Query
/// d ##class(%ResultSet).RunQuery("Classes.Demo", "ByIDNumber", "342622199304055257")
/// CALL Classes.Patient_By_IDNumber("342622199304055257")
Query ByIDNumber(IDNumber As %String = "") As %Query(ROWSPEC = "ID:%String,Name:%String,IDNumber:%String") [ SqlName = Patient_By_IDNumber, SqlProc ]
{
}

ClassMethod ByIDNumberExecute(ByRef qHandle As %Binary, IDNumber As %String = "") As %Status
{
  Set dataList = []
	Set qHandle = dataList.%GetIterator()
	
	Set id = $ORDER(^Classes.Models.PatientI("IDNumberIndex", " "_IDNumber, ""))
	Set person = ##class(Classes.Models.Patient).%OpenId(id)
	Set name = person.Name
	Do dataList.%Push($LISTBUILD(id,name,IDNumber))
		
  Quit $$$OK
}

ClassMethod ByIDNumberFetch(ByRef qHandle As %Binary, ByRef Row As %List, ByRef AtEnd As %Integer = 0) As %Status [ PlaceAfter = ByIDNumberExecute ]
{
  If 'qHandle.%GetNext(.key,.Row) Set AtEnd=1
	Quit $$$OK
}

/// 列表和数组
ClassMethod ListAndArray()
{
  // 定义集合
  Set dataList = ##class(%ListOfDataTypes).%New()
  Set objList = ##class(%ListOfObjects).%New()
  Set dataArray = ##class(%ArrayOfDataTypes).%New()
  Set objArray = ##class(%ArrayOfObjects).%New()

  // 使用列表
  Do dataList.Insert("Red")
  Do dataList.Insert("Green")
  Do dataList.InsertAt("Yellow",2) //插入到指定位置
  Do dataList.SetAt("Blue",1) //修改指定位置
  Do dataList.RemoveAt(2) //删除指定位置
  For i = 1 : 1 : dataList.Count() {
    Write dataList.GetAt(i),! //获取指定位置
  }

  // 使用数组
  Do dataArray.SetAt("red","color")
  Do dataArray.SetAt("large","size")
  Do dataArray.SetAt("expensive","price")
  Do dataArray.RemoveAt("price")
  Write dataArray.GetAt("color")
  Set key = ""
  For {
    Set value = dataArray.GetNext(.key)
    Quit:key=""
    Write !,key," = ",value
  }

  // Lists
  Set mail = $LISTBUILD("One Memorial Drive", "Cambridge", "MA", "02142")
  Write !,$LISTLENGTH(mail)
  Write !,$LIST(mail, 2)
  Write !,$LIST(mail, *-1)
  Write !,$LISTFIND(mail, "MA")
  Write !,$LISTTOSTRING(mail, "^")
  Set pmail = $LISTFROMSTRING("One Memorial Drive^Cambridge^MA^02142", "^")
}

/// 使用 XData 块
ClassMethod GetXData() As %Status
{
  Set xdataID="Classes.Demo||SexDict"
  #; Set xdataID="Classes.Demo||SexJson"
  Set compiledXdata=##class(%Dictionary.CompiledXData).%OpenId(xdataID)
  Set tStream=compiledXdata.Data
  If '$ISOBJECT(tStream) Set tSC=%objlasterror Quit
  Do ##class(%XML.XPATH.Document).CreateFromStream(tStream,.tDocument)
  Do tDocument.EvaluateExpression("/table","count(row)",.tRes)
  Set count = tRes.GetAt(1).Value
  For i = 1 : 1 : count {
    Do tDocument.EvaluateExpression("/table/row["_i_"]","text()",.tRes)
    Set fieldValue = tRes.GetAt(1).Value
    Set key = $PIECE(fieldValue,"^",1)
    Set value = $PIECE(fieldValue,"^",2)
    Write key,":",value,!
  }

  #; Set dynObject = {}.%FromJSON(tStream)
  #; Write dynObject.%ToJSON()
}

/// sex 字典
XData SexDict
{
<table>
  <row>M^男</row>
  <row>F^女</row>
</table>
}

XData SexJson [ MimeType = application/json ]
{
{
    "M": "男",
    "F": "女"
  }
}

}
