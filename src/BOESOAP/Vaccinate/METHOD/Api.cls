Class BOESOAP.Vaccinate.METHOD.Api Extends %RegisteredObject
{

/// 推送订单收费状态 		111	  
/// w ##class(BOESOAP.Vaccinate.METHOD.Api).SendChargeStatus("3462606^1")
/// 触发点 收费 ##class(web.DHCBillCons12).CompleteCharge() 退费 ##class(web.udhcOPRefEdit1).RefundReceipt()
ClassMethod SendChargeStatus(Input)
{
	s $zt = "Exception"
	
	s PrtRowID = $p(Input,"^",1)
	s payStatus = $p(Input,"^",2)
	s OEORIStr = ##class(web.DHCBL.CIDefine.OEORIDefine).GetOEORIStrByINVPRTStr(PrtRowID,"0")
	s OEORI = $p(OEORIStr,"^",1)
	q:OEORI="" 0
	
	s id = $O(^User.DHCORDSContrastI("IndexOfContrastOrdId"," "_OEORI,""))
	q:id="" 0
	s ContrastID = $O(^User.DHCORDSContrastI("IndexOfContrastOrdId"," "_OEORI,id,""))
	s CompanyName = $lg(^User.DHCORDSContrastD(ContrastID),5)
	q:CompanyName'="VACCINATE" 0
	
	s id = $tr(id," ","")
	
	
	s Status = {}
	s Status.localCode = "175"
	s Status.id = id //登记单id
	s Status.payStatus = payStatus //支付状态 0-已退费；1已支付
	
	//增加狂犬疫苗
	s OEORIRecDepDR = $p(^OEORD(+OEORI,"I",$p(OEORI,"||",2),3),"^",6)
	if OEORIRecDepDR = 489 s Status.localCode = "390"
	
	s inputStream=##class(%GlobalCharacterStream).%New()
	d Status.%ToJSON(inputStream)
	s soap = ##class(BOESOAP.Soap.PUB0063Soap).%New()
	
	//增加狂犬疫苗
	if OEORIRecDepDR = 489  d soap.AsyncSendData("BOE0487-2",inputStream)
	else  d soap.AsyncSendData("BOE0487",inputStream)
	
	q 0

Exception
	q "-1^"_$ze
}

/// Creator：wanyh
/// CreatDate：2024-05-20
/// Description：接收疫苗接种系统患者、疫苗等信息
/// BOE0486 W00000407
/// w ##class(BOESOAP.Vaccinate.METHOD.Api).ReceiveChargeInfo("{""method"":""PushPresp"",""hospcode"":""386"",""data"":{""id"":""1901542145391595531"",""patientName"":""张利安"",""patientGender"":""1"",""birthday"":""1996-06-03"",""registerDoctorName"":""李小冬"",""phone"":""18720703573"",""address"":""广东省深圳市南山区沙河街道白石洲西二坊15号602室"",""idcard"":""362532199606036116"",""chilCode"":""340603030129960016"",""billNum"":""1742197950973"",""billDate"":""2025-03-17"",""age"":28,""vaccAmount"":1,""FeeDetail"":[{""vaccCode"":""2802"",""vaccName"":""狂犬病(Vero冻干)"",""vaccBatch"":""202404032A-1"",""vaccMfst"":""长春卓谊"",""vaccExpDate"":""2027-04-10"",""vaccCount"":""1"",""vaccMfstCode"":""76"",""inocStandard"":""0.5ml/瓶"",""hisDosage"":""0.5ml"",""hisStandard"":""0.5ml/瓶"",""hisInocWay"":1,""hisInocWayName"":""肌内"",""purchasePrice"":""102"",""index"":1}],""HISDoctorCode"":""9527"",""HISOfficeCode"":""386"",""habiAddress"":""广东省深圳市南山区沙河街道"",""guardianname"":"""",""guardianphone"":""18720703573""}}")
ClassMethod ReceiveChargeInfo(Input As %GlobalCharacterStream) As %GlobalCharacterStream
{
	
	set $zt="Exception"
	
	s OutputObject = {}
	
	s InputObject = {}.%FromJSON(Input)
	
	s method = InputObject.method //PushPresp:新增 EditPresp:修改 DeletePresp:删除
	s data = InputObject.data
	s id = data.id //登记单id 唯一标识
	s patientName = data.patientName //姓名
	s patientGender = data.patientGender //性别
	s birthday = data.birthday //出生日期
	s phone = data.phone //手机号
	s address = data.address //地址
	s idcard = data.idcard //身份证号
	s:idcard="888888888888888888" idcard = ""
	s HISDoctorCode = data.HISDoctorCode //医生编码
	s HISOfficeCode = data.HISOfficeCode //科室编码
	
	
	//0. 作废医嘱
	if (method = "DeletePresp") {
		s OEOrd = "", rtn = 0
		for {
			s OEOrd = $O(^User.DHCORDSContrastI("IndexOfContrast"," VACCINATE"," "_$$ALPHAUP^SSUTIL4(id),OEOrd))
			q:OEOrd=""
			s OEOrdID = $tr(OEOrd," ","")
			s OEORIItemStatDR = $p(^OEORD(+OEOrdID,"I",$p(OEOrdID,"||",2),1),"^",13)
			continue:((OEORIItemStatDR="2") || (OEORIItemStatDR="12") || (OEORIItemStatDR="4"))
			s OEORIDoctorDR = $p(^OEORD(+OEOrdID,"I",$p(OEOrdID,"||",2),1),"^",11)
			s CTPCPCode = $p(^CTPCP(OEORIDoctorDR,1),"^",1)
			s UserId = $o(^SSU("SSUSR",0,"SSUSR_Initials",$$ALPHAUP^SSUTIL4(CTPCPCode),""))
			s rtn = ##class(appcom.OEOrdItem).UnUse(OEOrdID,UserId)
		}
		if rtn = 0{
			s OutputObject.applystate = "1"
			s OutputObject.error = "success"
			s OutputStream = ##class(%Stream.GlobalCharacter).%New()
			d OutputObject.%ToJSON(OutputStream)
			q OutputStream
		}else {
			s OutputObject.applystate = "0"
			s OutputObject.error = "作废订单失败"
			s OutputStream = ##class(%Stream.GlobalCharacter).%New()
			d OutputObject.%ToJSON(OutputStream)
			q OutputStream
		}
	}

	if (method = "EditPresp") {
		s OEOrd = "", rtn = 0
		for {
			s OEOrd = $O(^User.DHCORDSContrastI("IndexOfContrast"," VACCINATE"," "_$$ALPHAUP^SSUTIL4(id),OEOrd))
			q:OEOrd=""
			s OEOrdID = $tr(OEOrd," ","")
			s OEORIItemStatDR = $p(^OEORD(+OEOrdID,"I",$p(OEOrdID,"||",2),1),"^",13)
			continue:((OEORIItemStatDR="2") || (OEORIItemStatDR="12") || (OEORIItemStatDR="4"))
			s OEORIDoctorDR = $p(^OEORD(+OEOrdID,"I",$p(OEOrdID,"||",2),1),"^",11)
			s CTPCPCode = $p(^CTPCP(OEORIDoctorDR,1),"^",1)
			s UserId = $o(^SSU("SSUSR",0,"SSUSR_Initials",$$ALPHAUP^SSUTIL4(CTPCPCode),""))
			s rtn = ##class(appcom.OEOrdItem).UnUse(OEOrdID,UserId)
		}
		if rtn '= 0{
			s OutputObject.applystate = "0"
			s OutputObject.error = "修改订单失败"
			s OutputStream = ##class(%Stream.GlobalCharacter).%New()
			d OutputObject.%ToJSON(OutputStream)
			q OutputStream
		}
	}
	
	

	//1. 获取登记号
	s PATPatientID = ""
	#; 1.1 查询MDM里患者信息
	s CardTypeID = ""
	s PatientCard = ""
	s birthday = ##class(websys.Conversions).DateHtmlToLogical(birthday)
	s IDTypeID = 20 //默认身份证
	s UserID = ##class(DHCExternalService.RegInterface.GetRelate).GetUser(HISDoctorCode)
	s QueryMDMInfo = "^"_CardTypeID_$c(1)_PatientCard_"^"_IDTypeID_$c(1)_idcard_"^"_patientName_"^"_patientGender_"^"_phone_"^"_birthday
	
	s Rtn = ##class(web.DHCDocMDMInterfaceCommon).QueryMDMPatInfo(QueryMDMInfo,UserID)
	
	
	i (+Rtn=0){
		s PatMDMInfo=$p(Rtn,"^",2)
		s PLen = $l(PatMDMInfo,$c(1))
		for i = 1 : 1 : PLen {
			s PatInfo=$p(PatMDMInfo,$c(1),i)
			s MDMPatRegNo=$p(PatInfo,$c(2),1)
			s PATSimilarScore=$p(PatInfo,$c(2),2)		//MDM相似度
			if PATSimilarScore >= 1 {
				s PATPatientID = MDMPatRegNo
			}
		}		
	}
	
	s:PATPatientID="020000753355" PATPatientID="020000593467"
	s:PATPatientID="020000756437" PATPatientID="020000250550"
	s:PATPatientID="020000788314" PATPatientID="020000761794"
	#; 1.2 MDM建档
	if PATPatientID = "" {
		s CurrentDateStr=##class(web.DHCDocOrderCommon).GetCurrentDateTime(3,1)
		s CurrentDate=$p(CurrentDateStr,"^",3),CurrentTime=$p(CurrentDateStr,"^",4)
		s IdentityInfoList=idcard_$c(4)_""_$c(4)_IDTypeID
		s HISMDMPatInfo=patientName_$c(2)_""_$c(2)_birthday_$c(2)_patientGender_$c(2)_""_$c(2)_""_$c(2)_""_$c(2)_phone
		s HISMDMPatInfo=HISMDMPatInfo_$c(2)_""_$c(2)_""_$c(2)_""_$c(2)_""_$c(2)_""_$c(2)_""_$c(2)_""_$c(2)_""
		s HISMDMPatInfo=HISMDMPatInfo_$c(2)_2_$c(2)_UserID_$c(2)_CurrentDate_$c(2)_CurrentTime_$c(2)_""_$c(2)_IdentityInfoList_$c(2)_""_$c(2)_""
		
		s Rtn = ##class(DHCExternalService.DocMDMInterface.Service.GetMDMCommonInfo).AddMDMMainInfo(HISMDMPatInfo)
		if (+Rtn'=0){
			s OutputObject.applystate = "0"
			s OutputObject.error = Rtn
			s OutputStream = ##class(%Stream.GlobalCharacter).%New()
			d OutputObject.%ToJSON(OutputStream)
			q OutputStream	
		}
		s PATPatientID = $p(Rtn,"^",3)
	}
	
	#; 1.3 HIS建档
	if ('$d(^PAPERi("PAPMI_PatNo",PATPatientID))) {
		#; 建卡
		set InfoObj=##class(DHCExternalService.CardInterface.Entity.PatInfo).%New()
		set InfoObj.Address=data.address
		set InfoObj.CardTypeCode="01"
		set InfoObj.DOB=data.birthday 
		set InfoObj.IDType="01" //默认身份证
		set InfoObj.IDNo=idcard
		set InfoObj.Mobile=data.phone
		set InfoObj.PatientCard=""
		set InfoObj.PatientType = "01"
		set InfoObj.PatientName=data.patientName
		set InfoObj.Sex=data.patientGender
		set InfoObj.TelephoneNo=data.phone
		set InfoObj.UserID=UserID
		
		set InfoObj.PatientID=PATPatientID
		
		s rtn = ##class(DHCExternalService.CardInterface.CardManager).CardInsert(InfoObj,"")
		i +rtn'=0{
			s OutputObject.applystate = "0"
			s OutputObject.error = "HIS建卡失败"
			s OutputStream = ##class(%Stream.GlobalCharacter).%New()
			d OutputObject.%ToJSON(OutputStream)
			q OutputStream
		}
		
		#;虚拟卡建卡需要增加卡信息到MDM系统
		s CardInfoList=PATPatientID_$c(4)_"Y"_$c(4)_1_$c(4)_""_$c(4)_"N"_$c(4)_$P($h,",",1)_$c(4)_""_$c(4)_UserID
		s ModifyMDMCardInfo=PATPatientID_$c(2)_2_$c(2)_CardInfoList
		s Rtn=##class(DHCExternalService.DocMDMInterface.Service.GetMDMCommonInfo).ModifyMDMMainCardInfo(ModifyMDMCardInfo)
	}
	
	//2. 自动挂号
	s Adm = "" ,Locid = ""
	
	#; 2.1 查询当日就诊
	s PatId = $O(^PAPERi("PAPMI_PatNo",PATPatientID,""))
	
	//增加狂犬疫苗->急诊医学科-动物致伤门诊号 
	if HISOfficeCode = "390" {
		//急诊医学科-动物致伤门诊号
		s AdmRowid = ""
		for {
			s AdmRowid = $O(^PAPERdr(PatId,"ADM","E",AdmRowid))
			q:((AdmRowid="")||(Adm'=""))
			s AdmDate = $p(^PAADM(AdmRowid),"^",6)
			continue:AdmDate'=+$H
			s Locid=$p(^PAADM(AdmRowid),"^",4)
			s VisitStatus=$p(^PAADM(AdmRowid),"^",20)   //状态
			//号别
			s RegistId = $O(^User.DHCRegistrationFeeI("ADM"," "_AdmRowid,""))
			continue:RegistId=""
			s RegfeeDocDr = $lg(^User.DHCRegistrationFeeD(RegistId),14)
			
			if ((Locid=36) && (RegfeeDocDr="2553") && (VisitStatus="A")){
				s Adm = AdmRowid
			}	
		}
		
		if Adm = "" {
		
			#; 2.2 查询排班
			s XMLRequest = "<Request><TradeCode>1004</TradeCode><HospitalCode>HFJDFYY</HospitalCode><UserCode>"_HISDoctorCode_"</UserCode><DeptCode>36</DeptCode><StartDate>"_$zd(+$H,3)_"</StartDate><EndDate>"_$zd(+$H,3)_"</EndDate><DayPartingFlag>0</DayPartingFlag></Request>"
			s rtn=##class(DHCExternalService.RegInterface.SelfRegMethods).QueryAdmSchedule(XMLRequest)
			if (rtn.ResultCode = -1) {
				
				s OutputObject.applystate = "0"
				s OutputObject.error = "挂号失败"
				s OutputStream = ##class(%Stream.GlobalCharacter).%New()
				d OutputObject.%ToJSON(OutputStream)
				q OutputStream
			} elseif (rtn.RecordCount = 0){
				s OutputObject.applystate = "0"
				s OutputObject.error = "号已挂完"
				s OutputStream = ##class(%Stream.GlobalCharacter).%New()
				d OutputObject.%ToJSON(OutputStream)
				q OutputStream
			}
			
			s count = rtn.Schedules.Count()

			for i=1:1:count {
				q:Adm'=""
				s ScheduleItemCode = rtn.Schedules.GetAt(i).ScheduleItemCode
				s AvailableLeftNum = rtn.Schedules.GetAt(i).AvailableLeftNum
				continue:AvailableLeftNum<1
				continue:rtn.Schedules.GetAt(i).DoctorCode'=2553

				#; 2.3 挂号
				s TransactionId = "Vaccinate"
				s XMLRequest = "<Request><TradeCode>10015</TradeCode><TransactionId>"_TransactionId_"</TransactionId><ScheduleItemCode>"_ScheduleItemCode_"</ScheduleItemCode><UserCode>"_HISDoctorCode_"</UserCode><PATPatientID>"_PATPatientID_"</PATPatientID><PayModeCode>CPP</PayModeCode><PayFee>0.00</PayFee></Request>"
				s Regrtn = ##class(DHCExternalService.RegInterface.SelfRegMethods).OPRegister(XMLRequest)
				s ResultCode = Regrtn.ResultCode
				s:ResultCode="0" Adm = Regrtn.AdmNo
			}

		   	if Adm = "" {
			   	s OutputObject.applystate = "0"
				s OutputObject.error = "挂号失败"
				s OutputStream = ##class(%Stream.GlobalCharacter).%New()
				d OutputObject.%ToJSON(OutputStream)
				q OutputStream
			}
		}
		
	}else {
		//预防接种门诊
		s AdmRowid = ""
		for {
			s AdmRowid = $O(^PAPERdr(PatId,"ADM","O",AdmRowid))
			q:((AdmRowid="")||(Adm'=""))
			s AdmDate = $p(^PAADM(AdmRowid),"^",6)
			continue:AdmDate'=+$H
			s Locid=$p(^PAADM(AdmRowid),"^",4)
			s VisitStatus=$p(^PAADM(AdmRowid),"^",20)   //状态
	
			if ((Locid=251) && (VisitStatus="A")){
				s Adm = AdmRowid
			}
			
		}
		
		#; 20240911 国际医疗部门诊接种流程：线下挂号 -> 医生开医嘱 -> 线下缴费 -> 接种门诊接口
		#; 直接返回登记号，不再插入医嘱
		if ((Adm'="") && ((Locid = "252")||(Locid = "9"))) {
			s OutputObject.applystate = "0"
			s OutputObject.error = "success"
			s OutputStream = ##class(%Stream.GlobalCharacter).%New()
			s OutputObject.PatientID = PATPatientID
			d OutputObject.%ToJSON(OutputStream)
			q OutputStream
		}
		
		
		if Adm = "" {
		
			#; 2.2 查询排班
			s XMLRequest = "<Request><TradeCode>1004</TradeCode><HospitalCode>HFJDFYY</HospitalCode><UserCode>"_HISDoctorCode_"</UserCode><DeptCode>251</DeptCode><StartDate>"_$zd(+$H,3)_"</StartDate><EndDate>"_$zd(+$H,3)_"</EndDate><DayPartingFlag>0</DayPartingFlag></Request>"
			set rtn=##class(DHCExternalService.RegInterface.SelfRegMethods).QueryAdmSchedule(XMLRequest)
			if (rtn.ResultCode = -1) {
				
				s OutputObject.applystate = "0"
				s OutputObject.error = "挂号失败"
				s OutputStream = ##class(%Stream.GlobalCharacter).%New()
				d OutputObject.%ToJSON(OutputStream)
				q OutputStream
			} elseif (rtn.RecordCount = 0){
				s OutputObject.applystate = "0"
				s OutputObject.error = "号已挂完"
				s OutputStream = ##class(%Stream.GlobalCharacter).%New()
				d OutputObject.%ToJSON(OutputStream)
				q OutputStream
			}
			
			set count = rtn.Schedules.Count()
			for i=1:1:count {
				q:Adm'=""
				s ScheduleItemCode = rtn.Schedules.GetAt(i).ScheduleItemCode
				s AvailableLeftNum = rtn.Schedules.GetAt(i).AvailableLeftNum
				continue:AvailableLeftNum<1
				s StartTime = rtn.Schedules.GetAt(i).StartTime
				;continue:((($p($H,",",2)<43200) && ($zth(StartTime)>=43200))  || (($p($H,",",2)>=43200) && ($zth(StartTime)<43200)))

				#; 2.3 挂号
				s TransactionId = "Vaccinate"
				s XMLRequest = "<Request><TradeCode>10015</TradeCode><TransactionId>"_TransactionId_"</TransactionId><ScheduleItemCode>"_ScheduleItemCode_"</ScheduleItemCode><UserCode>"_HISDoctorCode_"</UserCode><PATPatientID>"_PATPatientID_"</PATPatientID><PayModeCode>CPP</PayModeCode><PayFee>0.00</PayFee></Request>"
				s Regrtn = ##class(DHCExternalService.RegInterface.SelfRegMethods).OPRegister(XMLRequest)
				s ResultCode = Regrtn.ResultCode
				s:ResultCode="0" Adm = Regrtn.AdmNo
			}

		   	if Adm = "" {
			   	s OutputObject.applystate = "0"
				s OutputObject.error = "挂号失败"
				s OutputStream = ##class(%Stream.GlobalCharacter).%New()
				d OutputObject.%ToJSON(OutputStream)
				q OutputStream
			}
		}
	
	}
	
   	//3. 补录医嘱
   	s tmpMainStr = "",vaccBatchErr = 0
   	
   	//预防接种门诊 -> 预防接种药房
	s kaidanLoc = "175"
	s jieshouLoc = "178"
	//急诊医学科 -> 动物致伤门诊药房
	if HISOfficeCode = "390" {
		s kaidanLoc = "036"
		s jieshouLoc = "390"
	}
		
	s itr = data.FeeDetail.%GetIterator()
	while itr.%GetNext(.key, .val){
		
		// 用批号识别医嘱code
		//s vaccCode = val.vaccCode //医嘱编码
		s vaccBatch = val.vaccBatch //批号
		s INCIId = $O(^INCI("IB_NO",$$ALPHAUP^SSUTIL4(vaccBatch),""),-1)
		//s:vaccBatch="202212019B" INCIId="91807"
		
		if INCIId = "" {
			s vaccBatchErr = 1	
			q
		}
		s vaccCode = $p(^INCI(INCIId,1),"^",1)
		
		s vaccCount = val.vaccCount //医嘱数量

		s SubOrdInfo=Adm_"^"_id_"^"_"NORM"_"^"_vaccCode_"^"_""      //1-5
		s SubOrdInfo=SubOrdInfo_"^"_vaccCount _"^"_"ONCE"_"^"_""_"^"_""_"^"_""   //6-10
		s SubOrdInfo=SubOrdInfo_"^"_kaidanLoc_"^"_jieshouLoc_"^"_HISDoctorCode_"^"_HISDoctorCode_"^"_$zd(+$H,3)     //11-15
		s SubOrdInfo=SubOrdInfo_"^"_$zt($P($H,",",2))_"^"_""_"^"_"VACCINATE"_"^"_""_"^"_""    //16-20
		s SubOrdInfo=SubOrdInfo_"^"_""_"^"_$zd(+$H,3)_"^"_$zt($P($H,",",2))_"^"_""_"^"_1_"^"_""_"^"_""_"^"_"V" // 21-28
		s SubOrdInfo=SubOrdInfo_"^"_""_"^"_""_"^"_""_"^"_0_"^"_"" //29-33
		s SubOrdInfo=SubOrdInfo_"^"_""_"^"_""_"^"_""_"^"_"" //34-37
		
		

		
		if tmpMainStr = "" {
			s tmpMainStr = SubOrdInfo
		}else {
			s tmpMainStr = tmpMainStr_"@"_SubOrdInfo
		}
		

	}
	
	if vaccBatchErr = "1" {
	   	s OutputObject.applystate = "0"
		s OutputObject.error = "批号HIS不存在"
		s OutputStream = ##class(%Stream.GlobalCharacter).%New()
		d OutputObject.%ToJSON(OutputStream)
		q OutputStream
	}
	
	if tmpMainStr'="" {
   		s RowId = ##class(web.DHCENS.STBLL.ORDER.METHOD.AddOrdItems).AddOrderItemMutil(tmpMainStr)
	}
 	
 	if ($p(RowId,"^")<0) {
	 	s OutputObject.applystate = "0"
		s OutputObject.error = RowId
		s OutputStream = ##class(%Stream.GlobalCharacter).%New()
		d OutputObject.%ToJSON(OutputStream)
		q OutputStream
	}else {
		s ResultCount=$l(RowId,"^")	
		for tmpResultCount=1:1:ResultCount
		{
			s tmpRowId=$p(RowId,"^",tmpResultCount)
			s tmpExtRowID=""
			s tmpExtRowID=$p(tmpRowId,"*",1)
			i tmpExtRowID'="" {
				s OeordRowID=$p(tmpRowId,"*",2)
				i $p(tmpRowId,"*",5)="" s $p(tmpRowId,"*",5)=$p(SubOrdInfo,"^",2)
				s ContrastStr=OeordRowID_"^"_tmpExtRowID_"^"_"VACCINATE"_"^"_$p(tmpRowId,"*",5)
				// 添加信息到DHC_ORDSContrast，进行信息对照
	    		s SQLCODE = ##class(web.DHCENS.STBLL.ORDER.METHOD.AddOrdItems).InsertDHCORDSContrast(ContrastStr)
			}
		}
	}
 	
 	
	s OutputObject.applystate = "1"
	s OutputObject.error = "success"
	s OutputObject.PatientID = PATPatientID
	s OutputStream = ##class(%Stream.GlobalCharacter).%New()
	d OutputObject.%ToJSON(OutputStream)
	q OutputStream

	
Exception
	s OutputObject.applystate = "0"
	s OutputObject.error = $ze
	s OutputStream = ##class(%Stream.GlobalCharacter).%New()
	d OutputObject.%ToJSON(OutputStream)
	q OutputStream
}

}
