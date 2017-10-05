var instantiator = org_example_instantiator;
var safearchitecture = org_example_safe_architecture_v4;
var safeWorkflow = org_example_safe_workflow_v4;

//load architecture of file xml
var context = new Jsonix.Context([instantiator,safearchitecture,safeWorkflow]);


//FUNÇÕES para ler e gerar o workflow/arquitetura 
function getArchitecture(string,callback){
    var unmarshaller = context.createUnmarshaller();
    callback(unmarshaller.unmarshalString(string));
}

function getWorkflow(string,callback){
    var unmarshaller = context.createUnmarshaller();
    callback(unmarshaller.unmarshalString(string));
}

function generateWorkflow(workflow, callback){
    var marshaller = context.createMarshaller();
    var doc = marshaller.marshalDocument({
        name:{
            namespaceURI: 'http:\/\/www.example.org\/SAFe_workflow_V4',
            localPart: 'workflow'
        },
        value:workflow
    });
    var oSerializer = new XMLSerializer();
    var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
    console.log(sXML);
    $.ajax({
    	url:"/workflow/download?work="+sXML,
    	data: sXML,
		dataType: "text",
		contentType: 'text/xml',
		type:"POST",
		success: function(data) {
			callback(data);
		}
	});
}