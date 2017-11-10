var instantiator = org_example_instantiator;
var safeArchiteture = org_example_safe_architecture_v4;

function getApplication(callback){
	var context = new Jsonix.Context([instantiator,safeArchiteture]);
	var unmarshaller = context.createUnmarshaller();
	//unmarshaller.unmarshalURL('/js/services/mr-arch-novo.xml',function(unmarshalled){
	unmarshaller.unmarshalURL('/js/services/tutorial-arch.xml',function(unmarshalled){
		callback(unmarshalled);
	});
}

function registerApplication(architeture, callback){
	var context = new Jsonix.Context([instantiator,safeArchiteture]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			namespaceURI: 'http:\/\/www.example.org\/SAFe_architecture_V4',
			localPart: 'architecture'
		},
		value:architeture
	});
	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
	$.ajax({
		contentType:"text/plain",
    	url:"/architecture/download?"+sXML,
    	data: sXML,
		type:"POST",
		success: function(data) {
			callback(data);
		}
	});
}