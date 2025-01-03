Class Interaction.Production.Production Extends Ens.Production
{

XData ProductionDefinition
{
<Production Name="Interaction.Production.Production" TestingEnabled="true" LogGeneralTraceEvents="false">
  <Description></Description>
  <ActorPoolSize>2</ActorPoolSize>
  <Item Name="Interaction.Production.BS.SOAP" Category="" ClassName="Interaction.Production.BS.SOAP" PoolSize="0" Enabled="true" Foreground="false" Comment="" LogTraceEvents="false" Schedule="">
  </Item>
  <Item Name="Interaction.Production.BP.BP1" Category="" ClassName="Interaction.Production.BP.BP1" PoolSize="1" Enabled="true" Foreground="false" Comment="" LogTraceEvents="false" Schedule="">
  </Item>
  <Item Name="Interaction.Production.BO.SOAP" Category="" ClassName="Interaction.Production.BO.SOAP" PoolSize="1" Enabled="true" Foreground="false" Comment="" LogTraceEvents="false" Schedule="">
  </Item>
  <Item Name="Interaction.Production.BS.REST" Category="" ClassName="Interaction.Production.BS.REST" PoolSize="1" Enabled="true" Foreground="false" Comment="" LogTraceEvents="false" Schedule="">
  </Item>
</Production>
}

}
