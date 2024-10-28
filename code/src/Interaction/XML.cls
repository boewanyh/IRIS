Class Interaction.XML Extends (%RegisteredObject, %XML.Adaptor)
{

/// %XML.Writer
ClassMethod XMLWrite()
{
	s obj = ##class(Interaction.Models.Person).%New()
	s obj.IDCard = "340124202003054873"
	s obj.Name = "wansk"
	s rObj = ##class(Interaction.Models.Relationship).%New()
	s rObj.Name = "wanyh"
	s rObj.Relation = "father"
	d obj.Relationships.Insert(rObj)
	s rObj = ##class(Interaction.Models.Relationship).%New()
	s rObj.Name = "lumia"
	s rObj.Relation = "mother"
	d obj.Relationships.Insert(rObj)

	//1. 对象写入XML输出
	// 创建实例
	s writer = ##class(%XML.Writer).%New()
	s writer.Indent = 1 //设置缩进
	
	// 读取对象
	#;	d writer.OutputToString()
	#;	d writer.RootObject(obj)
	#;	s xml = writer.GetXMLString()
	#;	w xml ,!
	s stream = ##class(%Stream.GlobalCharacter).%New()
	s status = writer.OutputToStream(.stream)
	i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
	s status = writer.RootObject(obj)
	i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
	w stream.Read() ,!

	// XMLExportToStream
	#;	d obj.XMLExportToStream(.Stream)
	
	//2. 手动编写XML输出
	set xml=##class(%XML.Writer).%New()
	s xml.Indent = 1
	d xml.OutputToStream(.stream)
	d xml.RootElement("Person")
		d xml.Element("IDCard"), xml.Write("340124202003054873") ,xml.EndElement()
		d xml.Element("Name"), xml.Write("wansk") ,xml.EndElement()
		d xml.Element("Relationships")
			d xml.Element("Relationship")
				d xml.Element("Relation"), xml.Write("father") ,xml.EndElement()
				d xml.Element("Name"), xml.Write("wanyh") ,xml.EndElement()
			d xml.EndElement()
			d xml.Element("Relationship")
				d xml.Element("Relation"), xml.Write("mother") ,xml.EndElement()
				d xml.Element("Name"), xml.Write("lumina") ,xml.EndElement()
			d xml.EndElement()
		d xml.EndElement()
	d xml.EndRootElement()
	w stream.Read() ,!
}

/// %XML.Reader
ClassMethod XMLReader()
{
	s str =			"<Person>"
	s str =	str _		"<IDCard>340124202003054873</IDCard>"			
	s str =	str _		"<Name>wansk</Name>"
    s str =	str _		"<Relationships>"
    s str =	str _			"<Relationship>"
    s str =	str _				"<Relation>father</Relation>"
    s str =	str _				"<Name>wanyh</Name>"
    s str =	str _			"</Relationship>"
    s str =	str _			"<Relationship>"
    s str =	str _				"<Relation>mother</Relation>"
    s str =	str _				"<Name>lumina</Name>"
    s str =	str _			"</Relationship>"
    s str =	str _		"</Relationships>"
	s str =	str _	"</Person>"
	
	#; 1. XMLReader
	// 创建实例,导入XML
	s reader = ##class(%XML.Reader).%New()
	s status = reader.OpenString(str)
	#; status = reader.OpenStream(Stream)
	i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
	
	// 将XML导入对象
	d reader.CorrelateRoot("Interaction.Models.Person")
	d reader.Next(.object, .status)
	i $$$ISERR(status) {d $System.Status.DisplayError(status) q}
	
	w "IDCard：", object.IDCard ,!
	w "Name：",  object.Name ,!
	w "RelationshipCount：",  object.Relationships.Count() ,!
	for i = 1 : 1 : object.Relationships.Count() {
		w "Relation:"_object.Relationships.GetAt(i).Relation ,!
		w "Name:"_object.Relationships.GetAt(i).Name ,!
	}
	
	#; 2. %XML.XPATH.Document
	s tSC = ##class(%XML.XPATH.Document).CreateFromString(str,.tDocument)
	#; s tSC = ##class(%XML.XPATH.Document).CreateFromStream(Input,.tDocument)
	i $$$ISERR(tSC) {d $System.Status.DisplayError(tSC) q}
	s tSC = tDocument.EvaluateExpression("/Person/IDCard","text()",.tRes)
	if ($$$ISOK(tSC) && (tRes.GetAt(1) '= "")){    
    	s fieldValue = tRes.GetAt(1).Value
    	s IDCard = $tr(fieldValue,$c(0),"")
    	w "IDCard：", IDCard ,!
   	}
   	s tSC = tDocument.EvaluateExpression("/Person/Name","text()",.tRes)
	if ($$$ISOK(tSC) && (tRes.GetAt(1) '= "")){    
    	s fieldValue = tRes.GetAt(1).Value
    	s Name = $tr(fieldValue,$c(0),"")
    	w "Name：", Name ,!
   	}
   	
   	s tSC = tDocument.EvaluateExpression("/Person/Relationships","count(Relationship)",.tRes)
   	if ($$$ISOK(tSC) && (tRes.GetAt(1) '= "")){
 		s hsCount = tRes.GetAt(1).Value
 		w "RelationshipCount：", hsCount ,!
		for i = 1 : 1 : hsCount {
			s tSC = tDocument.EvaluateExpression("/Person/Relationships/Relationship["_i_"]/Relation","text()",.tRes)                    
			if ($$$ISOK(tSC) && (tRes.GetAt(1) '= "")){    
         		s fieldValue = tRes.GetAt(1).Value
         		s Relation = $tr(fieldValue,$c(0),"")
      			w "Relation：", Relation ,!
       		} 
      		s tSC = tDocument.EvaluateExpression("/Person/Relationships/Relationship["_i_"]/Name","text()",.tRes)                    
    		if ($$$ISOK(tSC) && (tRes.GetAt(1) '= "")){    
        		s fieldValue = tRes.GetAt(1).Value
      			s Name = $tr(fieldValue,$c(0),"")
            	w "Name：", Name ,!
        	} 
    	}
   	}
}

}
