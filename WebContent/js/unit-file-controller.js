/**
 *  Controlador da função de envio de arquivos
 */
var contextStorm = br_ufc_lia_storm;

$(document).ready(function(){
	init();
	
	var url   = window.location.search.replace("?", "");
	var items = url.split("&");
	alert(items[0].split("=")[1]);
	
});

function init() {
	
	var form;
	$("input:file").jfilestyle({buttonText: "Carregar código-fonte", inputSize: "400px" });
	$(function() {
	     $("input:file").change(function (){
	       var fileName = $(this).get(0).files[0].name;
	       $("input[name=filename]").val(fileName);
	       $("input[name=filextension]").val(fileName.split(".").pop());
	       //$("input[name=filesize]").val($(this).get(0).files[0].size+" bytes");
	       
	       form = new FormData();
	       form.append($(this).get(0).files[0]); // para apenas 1 arquivo
	     });
	});
	
	$("button").button();/*.click(function(){
         //sendFile(form);
    });*/
	
	loadLinksComponents();
	
}

/*
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
				uid:parseInt($("#units option:selected").attr("id")),
				version: parseInt($("#version").val()),
				buildCfg:$("#build").val(),
				filetype: parseInt($("#filetype").val()),
				path:$("#path").val(),
				
			}
		});

		var oSerializer = new XMLSerializer();
		xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
		xml = xml.replace("<unit_file","<unit_file xmlns=\"http://storm.lia.ufc.br\"");
		alert(xml);
		//window.location.reload();            

		
		$.ajax({
			url:"/HPC-Shelf-FrontEnd/unitFile?xml="+xml,
			async: false,
			data: "file="+form,
			type:"POST",
			success: function (data) {
				alert("Enviado!");
				//window.location.reload();
		    }
		});
	}
}*/

function loadLinksComponents() {
	$("#components").change(function() {
		$("#components option:selected").each(function() {
			var units = getAbstractUnitsComponent($(this).text());
			$("#units").empty();
			for (var i = 0; i < units.length; i++) {
				$("#units").append("<option id='"+units[i].id+"' value='"+units[i].name+"'>"+units[i].name+"</option>");
			}
		});
	});
	
	$("#units").change(function() {
		$("#units option:selected").each(function() {
			$("input[name=uid]").val("");
			$("input[name=uid]").val($(this).attr("id"));
		});
	});
}