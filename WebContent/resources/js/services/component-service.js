var contextStorm = br_ufc_lia_storm;

function getListAbstractComponents() {
	var abstractComponent = [];
	$.ajax({
		url:"/HPC-Shelf-FrontEnd-Core/abstractComponentCore?action=list",
		async: false,
		dataType: "xml",
		type:"POST",
		success: function (data) {
			for (var i = 0; i < data.getElementsByTagName("abstract_component").length; i++) {
				abstractComponent[i] = {
						acId: data.getElementsByTagName("abstract_component").item(i).getAttribute("ac_id"),
						name: data.getElementsByTagName("abstract_component").item(i).getAttribute("name"),
						path: data.getElementsByTagName("abstract_component").item(i).getAttribute("path"),
						supertype: data.getElementsByTagName("abstract_component").item(i).getAttribute("supertype")
				};
			}
	    }
	});
	return abstractComponent;
}

function getAbstractComponent(component){
	var abstractComponent = null;
	$.ajax({
		url:"/HPC-Shelf-FrontEnd-Core/abstractComponentCore?action=get&cmp="+component,
		async: false,
		dataType: "xml",
		type:"POST",
		success: function (data) {
			var str = new XMLSerializer().serializeToString(data);
			var context = new Jsonix.Context([contextStorm]);
			var unmarshaller = context.createUnmarshaller();
			abstractComponent = unmarshaller.unmarshalString(str).value;
	    }
	});
	return abstractComponent;
}

function saveNewAbstractComponent(componentObj, callback){
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'abstract_component'
		},
		value:{
			name: componentObj.name,
			supertype: componentObj.super,
			contextParameter: componentObj.parameters,
			innerComponents: componentObj.inners,
			abstractUnit: componentObj.units,
			slices: componentObj.slices
		}
	});
	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
	console.log(sXML);
	/*$.ajax({
	    type: 'post',
	    url : '/HPC-Shelf-FrontEnd-Core/abstractComponentCore?action=save',
	    data: 'cmp='+sXML,
	    dataType: "xml",
	    success : function(result){
	    	callback(result);
	    }
	});*/
}

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
