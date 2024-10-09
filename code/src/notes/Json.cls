Class notes.Json Extends (%RegisteredObject, %JSON.Adaptor)
{

/// JSON Object
ClassMethod JSONObject()
{
	/* 创建动态实例 */
	s person = {} //s person = ##class(%DynamicObject).%New()
	s person.Relationships = [] //s person.Relationships = ##class(%DynamicArray).%New()

	s person.IDNum = "342622199304055257" //d person.%Set("IDNum", "342622199304055257")
	s person.Name = "wanyh" 

	s Relationship = {}
    s Relationship.Relation = "father"
    s Relationship.Name = "wanxw"
	d person.Relationships.%Push(Relationship)
	
	s Relationship = {}
    s Relationship.Relation = "mother"
    s Relationship.Name = "tonggx"
	d person.Relationships.%Push(Relationship)

	/* 动态实例转为JSON字符串 */
	s jsonPerson = person.%ToJSON()
	w jsonPerson,!
	s jsonPersonStream = ##class(%Stream.GlobalCharacter).%New()
	d person.%ToJSON(jsonPersonStream)
	#; {"Relationships":[{"Relation":"father","Name":"wanxw"},{"Relation":"mother","Name":"tonggx"}],"IDNum":"342622199304055257","Name":"wanyh"}
	
	/* JSON字符串转为动态实例 */
	s person = {}.%FromJSON(jsonPerson)
	zw person
	s person = {}.%FromJSON(jsonPersonStream.ReadLineIntoStream())
	#; person={"Relationships":[{"Relation":"father","Name":"wanxw"},{"Relation":"mother","Name":"tonggx"}],"IDNum":"342622199304055257","Name":"wanyh"}  ; <DYNAMIC OBJECT>
	
	/* 解析动态实例 */
	w "IDNum:"_person.IDNum,! //w "IDNum:"_person.%Get("IDNum"),!
	w "Name:"_person.Name,!
	
	s itr = person.Relationships.%GetIterator()
	while itr.%GetNext(.key, .val){
		w "Relation:"_val.Relation,!
		w "Name:"_val."Name",!
	}
	#; IDNum:342622199304055257
	#; Name:wanyh
	#; Relation:father
	#; Name:wanxw
	#; Relation:mother
	#; Name:tonggx
}

/// %JSON.Adaptor
ClassMethod JSONAdaptor()
{
	/* 创建对象 */
	s person = ##class(model.Person).%New()
	s person.IDCard = "342622199304055257"
	s person.Name = "wanyh"
	
	s Relationship = ##class(model.Relationship).%New()
	s Relationship.Relation = "father"
	s Relationship.Name = "wanxw"
	d person.Relationships.Insert(Relationship)

	s Relationship = ##class(model.Relationship).%New()
	s Relationship.Relation = "mother"
	s Relationship.Name = "tonggx"
	d person.Relationships.Insert(Relationship)
	
	/* 对象导出为JSON字符串 */
	d person.%JSONExportToString(.jsonPerson)
	w jsonPerson,!
	d person.%JSONExportToStream(.jsonStreamPerson)
	#; {"IDNum":"342622199304055257","Name":"wanyh","Relationships":[{"Relation":"father","Name":"wanxw"},{"Relation":"mother","Name":"tonggx"}]}
	
	/* JSON字符串导入对象 */
	s person = ##class(model.Person).%New()
	d person.%JSONImport(jsonPerson)
	
	/* 解析JSON对象 */ 
	w "IDNum:"_person.IDCard,!
	w "Name:"_person.Name,!

	while person.Relationships.GetNext(.key){
		w "Relation:"_person.Relationships.GetAt(key).Relation,!
		w "Name:"_person.Relationships.GetAt(key).Name,! 
	}
	
	#; IDNum:342622199304055257
	#; Name:wanyh
	#; Relation:father
	#; Name:wanxw
	#; Relation:mother
	#; Name:tonggx
}

}
