var contextStorm = br_ufc_lia_storm;

function getListContracts(acId, callback) {
	var listContract = new Array();
	$.ajax({
		url:"/HPC-Shelf-FrontEnd-Core/contextContract?action=list&acid="+acId,
		dataType: "xml",
		type:"GET",
		success: function(data) {
			var str = new XMLSerializer().serializeToString(data);
			var context = new Jsonix.Context([contextStorm]);
			var unmarshaller = context.createUnmarshaller();
			listContract = unmarshaller.unmarshalString(str).value.contract;
			callback(listContract);
		}
	});
}

function saveNewContract(contractObj, callback) {
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
	    type: 'post',
	    //async: false,
	    url : '/HPC-Shelf-FrontEnd-Core/contextContract?action=save',
	    data: 'con='+sXML,
	    success : function(result){
	        callback(result);
	    }
	});
}

function downloadNewContract(contractObj) {
	console.log(contractObj);
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			//namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'context_contract'
		},
		value:{
			ccName: contractObj.name,
			contextArguments: contractObj.arguments,
			abstractComponent: contractObj.component,
			platform: contractObj.platform,
			qualityArguments: contractObj.qualities,
			rankingArguments: contractObj.ranking,
			costArguments: contractObj.costs,
			innerComponents: contractObj.inners
		}
	});

	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+oSerializer.serializeToString(doc);
	sXML = sXML.replace("<context_contract","<context_contract xmlns=\"http://storm.lia.ufc.br\"");
	alert(sXML);
	$.ajax({
	    type: 'post',
	    async: false,
	    url : '/HPC-Shelf-FrontEnd-Core/contextContract?action=download',
	    data: 'con='+sXML,
	    success : function(result){	   
	    	$("#main").append("<a href=\"/HPC-Shelf-FrontEnd/file/contrato.xml\" download>Click para baixar o ARQUIVO</a>");
	    }
	});
}
