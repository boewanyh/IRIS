Class model.Person Extends (%RegisteredObject, %XML.Adaptor, %JSON.Adaptor)
{

/// Person's IDCard number.
Property IDCard As %String;

/// Name of the person.
Property Name As %String;

/// Person's Relationships.
Property Relationships As list Of model.Relationship;

}
