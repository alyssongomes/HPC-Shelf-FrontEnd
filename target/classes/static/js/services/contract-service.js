var contextStorm = br_ufc_lia_storm;

function getListContracts(acId, callback, callerror) {
	console.log(acId);
	var listContract = new Array();
	$.ajax({
		contentType:"text/plain",
		url: "/contract/list?"+acId,
		data: ""+acId,
		type:"POST",
		success: function(data) {
			data = jQuery.parseXML(data);
			var str = new XMLSerializer().serializeToString(data);
			var context = new Jsonix.Context([contextStorm]);
			var unmarshaller = context.createUnmarshaller();
			listContract = unmarshaller.unmarshalString(str).value.contract;
			callback(listContract);
		},
		error: function(xhr){
			callerror(xhr);
		} 
	});
}

function saveNewContract(contractObj, callback, callerror) {
	console.log(contractObj);
  	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'context_contract'
		},
		value:{
			ccName: contractObj.name,
			contextArguments: contractObj.arguments,
			abstractComponent: contractObj.component,
			platform: { platformContract : contractObj.platformContract },
			qualityArguments: contractObj.qualities,
			rankingArguments: contractObj.ranking,
			costArguments: contractObj.costs,
			innerComponents: contractObj.inners,
		}
	});

	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+oSerializer.serializeToString(doc);
	//sXML = sXML.replace("<context_contract","<context_contract xmlns=\"http://storm.lia.ufc.br\"");
	console.log(sXML);
	$.ajax({
		contentType:"text/plain",
	    type: 'POST',
	    //async: false,
	    url: "/contract/save?"+sXML,
	    data: sXML,
	    success : function(result){
	    	result = jQuery.parseXML(result);
	        callback(result);
	    },
	    error: function(xhr){
	    	callerror(xhr);
	    }
	});
}

function downloadNewContract(contractObj, callback, callerror) {
	console.log(contractObj);
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'context_contract'
		},
		value:{
			ccName: contractObj.name,
			contextArguments: contractObj.arguments,
			abstractComponent: contractObj.component,
			platform: { platformContract : contractObj.platformContract },
			qualityArguments: contractObj.qualities,
			rankingArguments: contractObj.ranking,
			costArguments: contractObj.costs,
			innerComponents: contractObj.inners
		}
	});

	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+oSerializer.serializeToString(doc);
	//sXML = sXML.replace("<context_contract","<context_contract xmlns=\"http://storm.lia.ufc.br\"");
	console.log(sXML);
	$.ajax({
		contentType:"text/plain",
	    type: 'POST',
	    async: false,
	    url: "/contract/download?"+sXML,
	    data: sXML,
	    success : function(result){
	    	result = jQuery.parseXML(result);
	    	callback(result);
	    },
	    error: function(xhr){
	    	callerror(xhr);
	    }
	});
}
