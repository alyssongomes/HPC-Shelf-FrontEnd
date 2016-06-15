/**
 *  Controlador da função de envio de arquivos
 */

var xml = null;
var candidatos = null;
var system = null;
var xmls = new XMLSerializer();

$(document).ready(function(){
	init();
});

function init() {
	
	$("input:file").jfilestyle({buttonText: "Carregar código-fonte", inputSize: "600px" });
	$("#destroy").button().click(function(){
		alert("Plataforma: "+destroy(xmls.serializeToString(system)));
	});
	$("#deploy").button().click(function(){
		
		system = deploy(xmls.serializeToString(candidatos));//retorna xml
		if(system != null){
			for (var i = 0; i < system.getElementsByTagName("computational_system").length; i++) {
				$("#deployTab").append("<tr bgcolor='#6495ED'>" +
						"<td>"+system.getElementsByTagName("computational_system").item(0).getAttribute("session")+"</td>"+
						"<td>"+system.getElementsByTagName("computational_system").item(0).getAttribute("network_address")+"</td>"+
						"</tr>");
			}
			$("#linkComputacional").attr("href","/HPC-Shelf-FrontEnd/file/system.xml").attr("download","system.xml").tooltip();
		}
		var result = instantiate(xmls.serializeToString(system));//retorna string
		$("#status").append("<h3>"+result+"</h3>");
	});
	$("#resolve").button().click(function(){
		candidatos = resolve(xml);//retornar xml
		if(candidatos != null){
			$("#contratos tr:not(#contratos tr:first)").remove();
			for(var i = 0; i < candidatos.getElementsByTagName("candidate").length; i++){
				$("#contratos").append("<tr bgcolor='#6495ED' id="+candidatos.getElementsByTagName("candidate").item(i).getAttribute("cc_id")+">" +
						"<td>"+candidatos.getElementsByTagName("candidate").item(i).getAttribute("cc_name")+"</td>"+
						"<td>"+candidatos.getElementsByTagName("candidate").item(i).getAttribute("cc_id")+"</td>"+
						"</tr>");
			}
			$("#linkCandidates").attr("href","/HPC-Shelf-FrontEnd/file/candidates.xml").attr("download","candidates.xml").tooltip();
		}else{
			alert("Faça o upload de um contrato!");
		}
	});
	
	$(function() {
	     $("input:file").change(function (){
	       var file = $(this).get(0).files[0];
	       
	       var reader = new FileReader();
	       reader.onload = function (e) {
	           xml = e.target.result;
	       };
	       reader.readAsText(file);
	     });
	});
	
}

