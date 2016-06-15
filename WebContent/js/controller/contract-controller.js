var contextStorm = br_ufc_lia_storm;

function getListContracts(acId) {
	var listContract = new Array();
	$.ajax({
		url:"/HPC-Shelf-FrontEnd/contextContract?action=list&acid="+acId,
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
			var contracts = data.getElementsByTagName("contract");
			for (var i = 0; i < contracts.length; i++) {
				listContract[i] = {
					ccName: contracts.item(i).getAttribute("cc_name"),
					ccId: contracts.item(i).getAttribute("cc_id"),
					concreteUnits: getConcreteUnits(data.getElementsByTagName("concrete_units"))
				};
			}
		}
	});
	return listContract;
}

function getConcreteUnits(concreteUnits){
	var listConcreteUnits = new Array();
    for (var i = 0; i < concreteUnits.length; i++) {
    	listConcreteUnits[i] = {
    		auId: concreteUnits.item(i).getAttribute("au_id"),
      		uId: concreteUnits.item(i).getAttribute("u_id"),
      		ccId: concreteUnits.item(i).getAttribute("cc_id")
      	};
    }
	return listConcreteUnits;
}

function saveNewContract(contractObj) {
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
			innerComponents: contractObj.inners,
		}
	});

	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+oSerializer.serializeToString(doc);
	sXML = sXML.replace("<context_contract","<context_contract xmlns=\"http://storm.lia.ufc.br\"");
	alert(sXML);
	$.ajax({
	    type: 'post',
	    async: false,
	    url : '/HPC-Shelf-FrontEnd/contextContract?action=save',
	    data: 'con='+sXML,
	    success : function(result){
	        alert("Arquivo escrito! Resultado: "+result.getElementsByTagName("result").item(0).getAttribute("value")); 
	    }
	});
}

function downloadNewContract(contractObj) {
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
	    url : '/HPC-Shelf-FrontEnd/contextContract?action=download',
	    data: 'con='+sXML,
	    success : function(result){	   
	    	$("#main").append("<a href=\"/HPC-Shelf-FrontEnd/file/contrato.xml\" download>Click para baixar o ARQUIVO</a>");
	    }
	});
}
