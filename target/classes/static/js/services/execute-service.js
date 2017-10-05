var contextStorm = br_ufc_lia_storm;

function resolve(xml,callback){
	var listContract = null;
	$.ajax({
		contentType:"text/plain",
		url:"/contract/resolve",
		data: ""+xml,
		type:"POST",
		success: function(data) {
			if(data === null){
				callback(null);
			}else{
				data = jQuery.parseXML(data);
				var str = new XMLSerializer().serializeToString(data);
				var context = new Jsonix.Context([contextStorm]);
				var unmarshaller = context.createUnmarshaller();
				listContract = unmarshaller.unmarshalString(str);
				callback(listContract);
			}
		}
	});
}

function resolveObject(object,callback){
	
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'context_contract'
		},
		value: object
	});
	var oSerializer = new XMLSerializer();
	var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+oSerializer.serializeToString(doc);
	console.log(xml);
	
	var listContract = null;
	$.ajax({
		contentType:"text/plain",
		url:"/contract/resolve",
		data: xml,
		type:"POST",
		success: function(data) {
			if(data === null){
				callback(null);
			}else{
				try{
					data = jQuery.parseXML(data);
					var str = new XMLSerializer().serializeToString(data);
					var context = new Jsonix.Context([contextStorm]);
					var unmarshaller = context.createUnmarshaller();
					listContract = unmarshaller.unmarshalString(str);
					callback(listContract);
				}catch (e) {
					alert(data);
				}
			}
		}
	});
}

function deploy(candidateList, callback){
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'candidate_list'
		},
		value: candidateList.value
	});
	var oSerializer = new XMLSerializer();
	candidateList = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
	console.log(candidateList);
	
	var computationSystem = null;
	$.ajax({
		url:"/contract/deploy?"+xml,
		data: xml,
		type:"POST",
		success: function(data) {
			console.log(data);
			if(data != null){
				data = jQuery.parseXML(data);
				var str = new XMLSerializer().serializeToString(data);
				var context = new Jsonix.Context([contextStorm]);
				var unmarshaller = context.createUnmarshaller();
				computationSystem = unmarshaller.unmarshalString(str);
				callback(computationSystem);
			}else{
				callback(null);
			}
		}
	});
}

function instantiate(computationalSystem){
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'computational_system'
		},
		value: computationalSystem.value
	});
	var oSerializer = new XMLSerializer();
	computationalSystem = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
	
	var terminal = null;
	$.ajax({
		url:"/contract/instantiate?"+computationalSystem,
		data: computationalSystem,
		async: false,
		type:"POST",
		success: function(data) {
			console.log(data)
			if(data != null){
				terminal = data;
			}
		}
	});
	return terminal;
}

function destroy(computationalSystem, callback){
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'computational_system'
		},
		value: computationalSystem.value
	});
	var oSerializer = new XMLSerializer();
	computationalSystem = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
	
	var result = "";
	$.ajax({
		url:"/contract/destroy?"+computationalSystem,
		data: computationalSystem,
		type:"POST",
		success: function(data) {
			callback(data);
		}
	});
}