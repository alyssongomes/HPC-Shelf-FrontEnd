/**
 *  Controlador da função de envio de arquivos
 */
var contextStorm = br_ufc_lia_storm;

$(document).ready(function(){
	init();
});

function init() {
	
	var form;
	$("input:file").jfilestyle({buttonText: "Carregar código-fonte", inputSize: "400px" });
	$(function() {
	     $("input:file").change(function (){
	       var fileName = $(this).get(0).files[0].name;
	       $("#filename").text(fileName);
	       $("#filextension").text(fileName.split(".").pop());
	       $("#filesize").text($(this).get(0).files[0].size+" bytes");
	       
	       form = new FormData();
	       form.append('file', event.target.files[0]); // para apenas 1 arquivo
	     });
	});
	
	$("button").button().click(function(){
         sendFile(form);
    });
	
}

function sendFile(form) {
	if(form == null){
		alert("Selecione um arquivo!");
	}else{
		var xml = "";
		var context = new Jsonix.Context([contextStorm]);
		var marshaller = context.createMarshaller();
		var doc = marshaller.marshalDocument({
			name:{
				localPart: 'unit_file'
			},
			value:{
				filename:$("#filename").text(),
				extension:$("#filextension").text(),
				version: parseInt($("#version").val()),
				buildCfg:$("#build").val(),
				filetype: parseInt($("#filetype").val()),
				path:$("#path").val()
			}
		});

		var oSerializer = new XMLSerializer();
		xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
		xml = xml.replace("<unit_file","<unit_file xmlns=\"http://storm.lia.ufc.br\"");
		alert(xml);
		
		$.ajax({
			url:"/HPC-Shelf-FrontEnd/unitFile?xml="+xml,
			async: false,
			data: "file="+form,
			type:"post",
			success: function (data) {
				alert("Enviado!");
		    }
		});
	}
}