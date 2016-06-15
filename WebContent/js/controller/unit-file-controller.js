/**
 *  Controlador da função de envio de arquivos
 */
var contextStorm = br_ufc_lia_storm;

$(document).ready(function(){
	init();
	
	var url   = window.location.search.replace("?", "");
	var items = url.split("&");
	if(items[0].split("=")[1] != undefined){
		alert(items[0].split("=")[1]);
	}
	
});

function init() {
	
	var form;
	$("input:file").jfilestyle({buttonText: "Carregar código-fonte", inputSize: "600px" });
	$(function() {
	     $("input:file").change(function (){
	       var fileName = $(this).get(0).files[0].name;
	       $("input[name=filextension]").val(fileName.split(".").pop());
	       $("input[name=filename]").val(fileName.replace("."+fileName.split(".").pop(),""));
	       //$("input[name=filesize]").val($(this).get(0).files[0].size+" bytes");
	       
	       form = new FormData();
	       form.append($(this).get(0).files[0]); // para apenas 1 arquivo
	     });
	});
	
	$("#submit").button();
	
	loadLinksComponents();
	
}

function loadLinksComponents() {
	$("#components").change(function() {
		$("#components option:selected").each(function() {
			var units = getListContracts($(this).attr("id"));
			$("#units").empty();
			$("#units").append("<option>Selecione a unidade</option>");
			for (var i = 0; i < units.length; i++) {
				for (var j = 0; j < units[i].concreteUnits.length; j++) {
					$("#units").append("<option id='"+units[i].concreteUnits[j].uId+"' value='"+units[i].concreteUnits[j].uId+"'>"+units[i].concreteUnits[j].uId+"</option>");
				}
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