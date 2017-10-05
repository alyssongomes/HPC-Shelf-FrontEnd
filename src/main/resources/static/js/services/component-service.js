var contextStorm = br_ufc_lia_storm;

function getListAbstractComponents() {
	var abstractComponent = [];
	$.ajax({
		//url:"/HPC-Shelf-FrontEnd-Core/abstractComponentCore?action=list",
		url:"/component/list",
		async: false,
		type:"GET",
		success: function (data) {
			try{
				data = jQuery.parseXML(data);
				for (var i = 0; i < data.getElementsByTagName("abstract_component").length; i++) {
					abstractComponent[i] = {
							acId: data.getElementsByTagName("abstract_component").item(i).getAttribute("ac_id"),
							name: data.getElementsByTagName("abstract_component").item(i).getAttribute("name"),
							path: data.getElementsByTagName("abstract_component").item(i).getAttribute("path"),
							supertype: data.getElementsByTagName("abstract_component").item(i).getAttribute("supertype")
					};
				}
			}catch (e) {
				alert("Não foi possível carregar a lista de componentes!");
			}
	    }
	});
	return abstractComponent;
}

function getAbstractComponent(component){
	var abstractComponent = null;
	$.ajax({
		contentType:"text/plain",
		url:"/component/get?"+component,
		async: false,
		data: component,
		type:"POST",
		success: function (data) {
			try{
				data = jQuery.parseXML(data);
				var str = new XMLSerializer().serializeToString(data);
				var context = new Jsonix.Context([contextStorm]);
				var unmarshaller = context.createUnmarshaller();
				abstractComponent = unmarshaller.unmarshalString(str).value;
			}catch (e) {
				alert("Não foi possível carregar o componente "+component);
			}
	    }
	});
	return abstractComponent;
}

function saveNewAbstractComponent(componentObj, callback, callerror){
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'abstract_component'
		},
		value:{
			name: componentObj.name,
			kind: componentObj.kind,
			path: componentObj.path,
			supertype: componentObj.super,
			contextParameter: componentObj.parameters,
			innerComponents: componentObj.inners,
			abstractUnit: componentObj.units,
			slices: componentObj.slices,
			qualityParameters:componentObj.qualityParameters,
			costParameters:componentObj.costParameters,
			rankingParameters:componentObj.rankingParameters
		}
	});
	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
	console.log(sXML);
	$.ajax({
		contentType:"text/plain",
	    type: 'POST',
	    url: "/component/save?"+sXML,
	    data: sXML,
	    success : function(result){
	    	try{
		    	result = jQuery.parseXML(result);
		    	callback(result);
	    	}catch (e) {
				callerror(e);
			}
	    }
	});
}
/*
function addContextParameter(component, callback){
	$.ajax({
		url:"/HPC-Shelf-FrontEnd-Core/abstractComponentCore?action=addContextParameter&cmp="+component,
		//async: false,
		dataType: "xml",
		type:"POST",
		success: function (data) {
			callback(data);
	    }
	});
}

function addAbstractUnit(component, callback){
	$.ajax({
		url:"/HPC-Shelf-FrontEnd-Core/abstractComponentCore?action=addAbstractUnit&cmp="+component,
		//async: false,
		dataType: "xml",
		type:"POST",
		success: function (data) {
			callback(data);
	    }
	});
}
*/
