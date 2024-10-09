function utf8(wide) { var c, s;var enc = "";var i = 0;while(i<wide.length) {
c= wide.charCodeAt(i++);
if (c>=0xDC00 && c<0xE000) continue;
if (c>=0xD800 && c<0xDC00) {if (i>=wide.length) continue;s= wide.charCodeAt(i++);if (s<0xDC00 || c>=0xDE00) continue;c= ((c-0xD800)<<10)+(s-0xDC00)+0x10000;}
if (c<0x80) enc += String.fromCharCode(c);
else if (c<0x800) enc += String.fromCharCode(0xC0+(c>>6),0x80+(c&0x3F));
else if (c<0x10000) enc += String.fromCharCode(0xE0+(c>>12),0x80+(c>>6&0x3F),0x80+(c&0x3F));
else enc += String.fromCharCode(0xF0+(c>>18),0x80+(c>>12&0x3F),0x80+(c>>6&0x3F),0x80+(c&0x3F));}
return enc;}
function getCookieVal(B){var A=document.cookie.indexOf(";",B);if(A==-1){A=document.cookie.length}
return unescape(document.cookie.substring(B,A))}
function getCookie(D){var B=D+"=";var F=B.length;var A=document.cookie.length;var E=0;while(E<A){var C=E+F;if(document.cookie.substring(E,C)==B){return getCookieVal(C)}
E=document.cookie.indexOf(" ",E)+1;if(E==0){break}}
return null}
function setCookie(C,E){var A=setCookie.arguments;var H=setCookie.arguments.length;var B=(2<H)?A[2]:null;var G=(3<H)?A[3]:null;var D=(4<H)?A[4]:null;var F=(5<H)?A[5]:null;document.cookie=C+"="+escape(E)
+((B==null)?" ":(";expires ="+B.toGMTString()))
+((G==null)?"  ":(";path = "+G))
+((D==null)?" ":(";domain ="+D))
+((F==true)?";secure":" ")}
var hexcase=1;var b64pad="";var chrsz=8;var mode=32;function preprocess(A){var B="";B+=A.verifycode.value;B=B.toUpperCase();A.p.value=md5(md5_3(A.p.value)+B);return true}
function md5_3(B){var A=new Array;A=core_md5(str2binl(B),B.length*chrsz);A=core_md5(A,16*chrsz);A=core_md5(A,16*chrsz);return binl2hex(A)}
function md5(A){return hex_md5(A)}
function hex_md5(A){return binl2hex(core_md5(str2binl(A),A.length*chrsz))}
function b64_md5(A){return binl2b64(core_md5(str2binl(A),A.length*chrsz))}
function str_md5(A){return binl2str(core_md5(str2binl(A),A.length*chrsz))}
function hex_hmac_md5(A,B){return binl2hex(core_hmac_md5(A,B))}
function b64_hmac_md5(A,B){return binl2b64(core_hmac_md5(A,B))}
function str_hmac_md5(A,B){return binl2str(core_hmac_md5(A,B))}
function md5_vm_test(){return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72"}
function core_md5(K,F){K[F>>5]|=128<<((F)%32);K[(((F+64)>>>9)<<4)+14]=F;var J=1732584193;var I=-271733879;var H=-1732584194;var G=271733878;for(var C=0;C<K.length;C+=16){var E=J;var D=I;var B=H;var A=G;J=md5_ff(J,I,H,G,K[C+0],7,-680876936);G=md5_ff(G,J,I,H,K[C+1],12,-389564586);H=md5_ff(H,G,J,I,K[C+2],17,606105819);I=md5_ff(I,H,G,J,K[C+3],22,-1044525330);J=md5_ff(J,I,H,G,K[C+4],7,-176418897);G=md5_ff(G,J,I,H,K[C+5],12,1200080426);H=md5_ff(H,G,J,I,K[C+6],17,-1473231341);I=md5_ff(I,H,G,J,K[C+7],22,-45705983);J=md5_ff(J,I,H,G,K[C+8],7,1770035416);G=md5_ff(G,J,I,H,K[C+9],12,-1958414417);H=md5_ff(H,G,J,I,K[C+10],17,-42063);I=md5_ff(I,H,G,J,K[C+11],22,-1990404162);J=md5_ff(J,I,H,G,K[C+12],7,1804603682);G=md5_ff(G,J,I,H,K[C+13],12,-40341101);H=md5_ff(H,G,J,I,K[C+14],17,-1502002290);I=md5_ff(I,H,G,J,K[C+15],22,1236535329);J=md5_gg(J,I,H,G,K[C+1],5,-165796510);G=md5_gg(G,J,I,H,K[C+6],9,-1069501632);H=md5_gg(H,G,J,I,K[C+11],14,643717713);I=md5_gg(I,H,G,J,K[C+0],20,-373897302);J=md5_gg(J,I,H,G,K[C+5],5,-701558691);G=md5_gg(G,J,I,H,K[C+10],9,38016083);H=md5_gg(H,G,J,I,K[C+15],14,-660478335);I=md5_gg(I,H,G,J,K[C+4],20,-405537848);J=md5_gg(J,I,H,G,K[C+9],5,568446438);G=md5_gg(G,J,I,H,K[C+14],9,-1019803690);H=md5_gg(H,G,J,I,K[C+3],14,-187363961);I=md5_gg(I,H,G,J,K[C+8],20,1163531501);J=md5_gg(J,I,H,G,K[C+13],5,-1444681467);G=md5_gg(G,J,I,H,K[C+2],9,-51403784);H=md5_gg(H,G,J,I,K[C+7],14,1735328473);I=md5_gg(I,H,G,J,K[C+12],20,-1926607734);J=md5_hh(J,I,H,G,K[C+5],4,-378558);G=md5_hh(G,J,I,H,K[C+8],11,-2022574463);H=md5_hh(H,G,J,I,K[C+11],16,1839030562);I=md5_hh(I,H,G,J,K[C+14],23,-35309556);J=md5_hh(J,I,H,G,K[C+1],4,-1530992060);G=md5_hh(G,J,I,H,K[C+4],11,1272893353);H=md5_hh(H,G,J,I,K[C+7],16,-155497632);I=md5_hh(I,H,G,J,K[C+10],23,-1094730640);J=md5_hh(J,I,H,G,K[C+13],4,681279174);G=md5_hh(G,J,I,H,K[C+0],11,-358537222);H=md5_hh(H,G,J,I,K[C+3],16,-722521979);I=md5_hh(I,H,G,J,K[C+6],23,76029189);J=md5_hh(J,I,H,G,K[C+9],4,-640364487);G=md5_hh(G,J,I,H,K[C+12],11,-421815835);H=md5_hh(H,G,J,I,K[C+15],16,530742520);I=md5_hh(I,H,G,J,K[C+2],23,-995338651);J=md5_ii(J,I,H,G,K[C+0],6,-198630844);G=md5_ii(G,J,I,H,K[C+7],10,1126891415);H=md5_ii(H,G,J,I,K[C+14],15,-1416354905);I=md5_ii(I,H,G,J,K[C+5],21,-57434055);J=md5_ii(J,I,H,G,K[C+12],6,1700485571);G=md5_ii(G,J,I,H,K[C+3],10,-1894986606);H=md5_ii(H,G,J,I,K[C+10],15,-1051523);I=md5_ii(I,H,G,J,K[C+1],21,-2054922799);J=md5_ii(J,I,H,G,K[C+8],6,1873313359);G=md5_ii(G,J,I,H,K[C+15],10,-30611744);H=md5_ii(H,G,J,I,K[C+6],15,-1560198380);I=md5_ii(I,H,G,J,K[C+13],21,1309151649);J=md5_ii(J,I,H,G,K[C+4],6,-145523070);G=md5_ii(G,J,I,H,K[C+11],10,-1120210379);H=md5_ii(H,G,J,I,K[C+2],15,718787259);I=md5_ii(I,H,G,J,K[C+9],21,-343485551);J=safe_add(J,E);I=safe_add(I,D);H=safe_add(H,B);G=safe_add(G,A)}
if(mode==16){return Array(I,H)}else{return Array(J,I,H,G)}}
function md5_cmn(F,C,B,A,E,D){return safe_add(bit_rol(safe_add(safe_add(C,F),safe_add(A,D)),E),B)}
function md5_ff(C,B,G,F,A,E,D){return md5_cmn((B&G)|((~B)&F),C,B,A,E,D)}
function md5_gg(C,B,G,F,A,E,D){return md5_cmn((B&F)|(G&(~F)),C,B,A,E,D)}
function md5_hh(C,B,G,F,A,E,D){return md5_cmn(B^G^F,C,B,A,E,D)}
function md5_ii(C,B,G,F,A,E,D){return md5_cmn(G^(B|(~F)),C,B,A,E,D)}
function core_hmac_md5(C,F){var E=str2binl(C);if(E.length>16){E=core_md5(E,C.length*chrsz)}
var A=Array(16),D=Array(16);for(var B=0;B<16;B++){A[B]=E[B]^909522486;D[B]=E[B]^1549556828}
var G=core_md5(A.concat(str2binl(F)),512+F.length*chrsz);return core_md5(D.concat(G),512+128)}
function safe_add(A,D){var C=(A&65535)+(D&65535);var B=(A>>16)+(D>>16)+(C>>16);return(B<<16)|(C&65535)}
function bit_rol(A,B){return(A<<B)|(A>>>(32-B))}
function str2binl(D){var C=Array();var A=(1<<chrsz)-1;for(var B=0;B<D.length*chrsz;B+=chrsz){C[B>>5]|=(D.charCodeAt(B/chrsz)&A)<<(B%32)}
return C}
function binl2str(C){var D="";var A=(1<<chrsz)-1;for(var B=0;B<C.length*32;B+=chrsz){D+=String.fromCharCode((C[B>>5]>>>(B%32))&A)}
return D}
function binl2hex(C){var B=hexcase?"0123456789ABCDEF":"0123456789abcdef";var D="";for(var A=0;A<C.length*4;A++){D+=B.charAt((C[A>>2]>>((A%4)*8+4))&15)
+B.charAt((C[A>>2]>>((A%4)*8))&15)}
return D}
function binl2b64(D){var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var F="";for(var B=0;B<D.length*4;B+=3){var E=(((D[B>>2]>>8*(B%4))&255)<<16)|(((D[B+1>>2]>>8*((B+1)%4))&255)<<8)|((D[B+2>>2]>>8*((B+2)%4))&255);for(var A=0;A<4;A++){if(B*8+A*6>D.length*32){F+=b64pad}else{F+=C.charAt((E>>6*(3-A))&63)}}}
return F};function $c(ascii){return String.fromCharCode(ascii);}
function dhc_cacheEncrypt(x){var constval=37,out="";if("undefined"==typeof x)return"";x=x.replace(/(\s*$)/g,"");var len;var ch,num;for(var i=1;i<=x.length;i++){ch=x.charAt(i-1)
if(ch=="D")ch=$c(2);if(ch=="p")ch=$c(3);if(ch=="d")ch=$c(4);if(ch=="t")ch=$c(5);num=ch.charCodeAt();num=(num-i+constval)%255;if(num>127)num=(num+128)%255;if(num<32)num=(num+40)%255;if($c(num)=="^")num++;out+=""+$c(num%255);}
len=out.length;for(var i=len;i<12;i++){ch=out.charAt(i-len);num=ch.charCodeAt();num=(num*2.345*constval*(constval-7))%255;if(num>127)num=(num+128)%255;if(num<32)num=(num+40)%255;if($c(num)=="^")num++;out+=""+$c(num%255);}
return out;};
if ("function"!=typeof websys_getMWToken){ 
	// Compatible with page that do not reference websys.js
	try{if ("function"==typeof parent.websys_getMWToken) websys_getMWToken = parent.websys_getMWToken;}catch(ex){}
}
$(document).ajaxSend(function(event, jqxhr, settings) {
	//request_headers["MW_TOKEN"] = websys_getSToken();
	var sessionId =  getCookie("sessionid");
	var token = "";
	if ("function"==typeof websys_getMWToken) token = websys_getMWToken();
	if (""!=token){sessionId=token;}
	jqxhr.setRequestHeader('MW_TOKEN', sessionId)
})
/**
*@author: wanghc
*@date: 2014-10-29
*@param: data    object             {ClassName:'',MethodName:'',QueryName:'',dataType:"json"|"text"|..., args}
*@param: success function|boolean   successCallback|async
*
*e.g:  
* $cm({
*  ClassName:"websys.DHCMessageReceiveType",
*  MethodName:"Save",
*  Code:CodeJObj.val(),
*  Desc:DescJObj.val(),
*  Id:ReceiveIdJObj.val()
* },function(){alert("success");})
*or 
* var rtn = $cm({...},false)
* $.q({ClassName:"web.Test",QueryName:"Find"},function(rtn){console.log(rtn)})
*/
var EXPLOGONWIN = null;
function $cm(data,success,error){
	if(!!$ && !$.extend){$ = jQuery; }
	if ("undefined"==typeof $){return false};
	var result,dataType="json",type="POST",global=true;
	if ('boolean'===typeof data.global){global = data.global;delete data.global;};
	if (data["dataType"]){
		dataType = data["dataType"];
	}
	/*IE7-ArrayObject not method of indexOf*/
	if (data["type"] && ("string"==typeof data["type"]) &&"POST^GET^PUT^DELETE^BEACON".indexOf(data["type"].toUpperCase())>-1){
		type = data["type"];
	}
	var sessionId =  getCookie("sessionid");
	var token = "";
	if ("function"==typeof websys_getMWToken) token = websys_getMWToken();
	if (""!=token){sessionId=token;}
	if (type=='BEACON'){
		if (navigator.sendBeacon && URLSearchParams){
			var burl = data.url;
			if (!burl) burl = 'websys.Broker.cls';
			delete data.url;delete data.type;
			var searchParams1 = new URLSearchParams();  // chrome49版不支持 json作为入参
			for (var myp in data){
				if (data.hasOwnProperty(myp)){
					searchParams1.append(myp,data[myp]);
				}
			}
			searchParams1.append('MWToken',sessionId);
			//navigator.sendBeacon("http://127.0.0.1/dthealth/web/csp/test.beacon.csp", searchParams1); 
			// navigator.sendBeacon(burl, searchParams1);// 测试发现chrome49不支持第二入参
			navigator.sendBeacon(burl+"?"+searchParams1.toString());
			return ;
		}
		delete data.type;
		type = 'POST';
	}
	for(var p in data){
		if ($.isArray(data[p])){
			var plen = data[p].length;
			for(var j=0; j<plen; j++){
				data[p+'_'+j] = data[p][j];
			}
			data[p+'_T'] = "ARRAY";
			data[p+'_C'] = plen;		
			delete data[p];
		}
	}
	var request_headers=data._headers||{};
	delete data._headers;
	if (data.ResultSetType && data.ResultSetType.toUpperCase()=="EXCELPLUGIN"){
		var clientAllowExcel = true;
		if(!!window.ActiveXObject||"ActiveXObject"in window){
			try{
				var o = new ActiveXObject("MSScriptControl.ScriptControl");
			}catch(e){
				clientAllowExcel=false;
				alert("1. Plase Add IP TrustList, 2. Allow ActiveX"); /*请把本站加入信任站点，且允许ActiveX运行*/
				return ;
			}
		}
		dataType = "script" //,scriptCharset:"utf-8"
		if (success===false) data["notReturn"]=0; 
	}
	//----add sign----
	request_headers["MW_TIME_STAMP"] = new Date().getTime(); 
	var sarr = [];for(var s in data){
		if (data[s]===undefined){ delete data[s];}
		else if (data[s]===null){ delete data[s];}
		else if (data[s].toString().length<10000) sarr.push(s+"="+data[s]);   //此处长度需与Broker一致
	};
	sarr.sort(function(a,b){
		var akey = a.split('=')[0];
		var bkey = b.split('=')[0];
		if (akey>bkey) return 1;
		return -1;
		//(a.localCompare(b))	
	});
	//console.log(sarr.join("&")+getCookie("sessionid"));
	//console.log(sarr.join("&").length);

	request_headers['MW_TOKEN']=sessionId;
	request_headers["MW_SIGNATURE"] = "$01$"+md5(utf8(sarr.join("&")+sessionId));
	
	//console.log(request_headers["MW_SIGNATURE"] );
	//-- end sign----
	var ajaxRtn = $.ajax({
		url:"websys.Broker.cls",
		data:data,
		type:type,
		global:global,
		headers:$.extend({},request_headers),
		async:success===false?false:true,
		dataType:dataType,
		success:function(rtn){
			if ((typeof rtn=="string") && (rtn.indexOf("window.open(\"dhc.logon.csp?RELOGON=1")>-1 ||rtn.indexOf("self.document.Login")>-1)){
				if (dataType=="text") rtn = '{"CSPSessionCookie":"","msg":"未找到会话,请先登录！","success":"0","code":"403","rows":[],"total":0,"op":"window.open(\"dhc.logon.csp?RELOGON=1\",\"RELOGON\",\"toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=yes\");"}';	
				if (dataType=="json") rtn = {"CSPSessionCookie":"","msg":"未找到会话,请先登录！","success":"0","code":"403","rows":[],"total":0,"op":"window.open(\"dhc.logon.csp?RELOGON=1\",\"RELOGON\",\"toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=yes\");"};	
			}
			if (('string'==typeof rtn && (rtn.indexOf("dhc.logon.csp")>-1)) || ('object'==typeof rtn && rtn.op && rtn.op.indexOf("dhc.logon.csp")>-1)){
				var MWToken = "";
				if ('function'==typeof websys_getMWToken) MWToken = websys_getMWToken();
				if (MWToken!=""){  /// 超时后自动锁屏
					var wintop = websys_getTop();
					if ('undefined'!==typeof wintop.lockScreenOpt && 'function'==typeof wintop.lockScreenOpt.lockScrn) {
						wintop.lockScreenOpt.lockScrn();
					}
				}else{
					$.messager.alert("提示","系统已超时,请关闭界面,重新登录!");
				}
				// 超时后也要去回调,让产品组知道超时了
			}
			if (success && success.call) {
				if (rtn.success) rtn.success= parseInt(rtn.success)
				success.call(this,rtn);
			}
			if (success===false) result = rtn;
		},
		error:function(data,textStatus){
			//textStatus还可能是"timeout", "error", "notmodified" 和 "parsererror"
			// readyStatus 0=>初始化 1=>载入 2=>载入完成 3=>解析 4=>完成
			// status      1xx：信息响应类，表示接收到请求并且继续处理,2xx：处理成功响应类，表示动作被成功接收、理解和接受,3xx：重定向响应类，为了完成指定的动作，必须接受进一步处理,4xx：客户端错误，客户请求包含语法错误或者是不能正确执行,5xx：服务端错误，服务器不能正确执行一个正确的请求
			if (textStatus=="abort"){return "";}
			if (textStatus=="error" && data.status==0){return "";} //chrome request abort geek
			if ("undefined"==typeof window.eval){return "";} 		//IE request abort geek
			var rtn = data.responseText;
			if ((typeof rtn=="string") && rtn.indexOf("window.open(\"dhc.logon.csp?RELOGON=1\",\"RELOGON\",\"toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no\"")>-1){
				top.window.open("dhc.logon.csp?RELOGON=1","RELOGON","toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no");
			}else if ((typeof rtn=="string") && rtn.indexOf("self.document.Login")>-1){
				top.window.open("dhc.logon.csp?RELOGON=1","RELOGON","toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no");
			}else{
				if (typeof error=="function"){
					error.apply(this,arguments);
				}else{
					//console.log(data.responseText)
					alert('Request Data Error.\nErrorType: "'+textStatus+'"\nReturnValue: '+data.responseText); 
				}
			}
		}
	});
	if (success===false) return result;
	return ajaxRtn;
};
function $q(data,success,error){
	return $cm(data,success,error);
};
function $m(data,success,error){
	$.extend(data,{dataType:"text"});
	return $cm(data,success,error);
};
function $LogStart(bizDesc,bizId){
	$m({ClassName:'websys.Processes',MethodName:'BizLog',BizDesc:bizDesc,BizId:bizId,BizNote:'Start'},false);
}
function $LogEnd(bizDesc,bizId){
	$m({ClassName:'websys.Processes',MethodName:'BizLog',BizDesc:bizDesc,BizId:bizId,BizNote:'End'},false);
}

(function($){
	if(!!$ && !$.extend){$ = jQuery; }
	if ("undefined"==typeof $){return false};
	$.cm = $cm;
	$.ajaxRunServerMethod = function(data,success,error){
		$.extend(data,{dataType:"text"});
		return $.cm(data,success,error);
	};
	$.m=$.ajaxRunServerMethod;
	$.ajaxRunServerQuery = function(data,success,error){
		return $.cm(data,success,error);
	};
	$.q = $.ajaxRunServerQuery;
	$.formatByJson = function(template,data){
		if ("string" == typeof data ){
			data = $.parseJSON(data);
		}
		// template + data生成数据html
		return template.replace(/\{(.+?)\}/ig,function(m,i,d){
				return data[i];
		}) ;
	}
	if (!$.browser){
		$.browser = {} ;
		$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());  
		$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());  
		$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());  
		$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	}
})(jQuery);
/**
* 新产品组使用
* 参数名sync 改成async  使实际调用表现和参数名意思一致
* datatype: 'json'|'text'|...   default:json
* async: true|false   defalut:true
*/
function runClassMethod(className,methodName,datas,successHandler,datatype,async){
	var opt;
	datas = datas||{};
	if(datas.IsQuery){
		opt = {ClassName:className,QueryName:methodName};
		$.extend(opt,datas);
		$cm(opt,successHandler);
	}else {
		if (arguments.length>4){
			opt = {ClassName:className,MethodName:methodName,dataType:datatype==''?'text':datatype};
		}else{
			opt = {ClassName:className,MethodName:methodName};
		}
		$.extend(opt,datas);
		if (typeof async=='undefined' || async){
			$cm(opt,successHandler);
		}else{
			return successHandler.call(this,$cm(opt,false));
		}
	}
}
function serverCall(className,methodName,datas){
	var ret="";
	runClassMethod(className,methodName,datas,function(retData){ret=retData},"",false);
	return ret;
}