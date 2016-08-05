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
		resolve(xml, function(candidatos){
			if(candidatos != null){
				$("#candidatos").empty();
				console.log(candidatos);
				for(var i = 0; i < candidatos.value.candidate.length; i++){
					var can = candidatos.value.candidate[i];
					$("#candidatos").append("<h3 id="+can.ccId+">"+can.ccName+" - "+can.ccId+"</h3>");
					/*var items = [];
					$.each(can, function(key, val) {
					   if(typeof val === 'object'){
						   var ul = "<ul>";
						   $.each(val, function(key, val) {
							   if(key != 'TYPE_NAME')
								   ul += "<li>"+key+" : "+val+"</li>";
						   });
						   ul += "</ul>";
						   items.push(ul);
					   }
					   if(key != 'TYPE_NAME')
						   items.push('<li id="' + key + '">'+ key+" : "+val +'</li>');
					});*/
					$('<ul/>', {
					  'class': 'my-new-list',
					  html: show(can)
					}).appendTo('#candidatos');
				}
				
				$("#candidatos").accordion({
				      collapsible: true,
				      autoHeight: false,
				      active: false,
			    });
				$("#candidatos").accordion("refresh");
				
				
				$("#linkCandidates").attr("href","/HPC-Shelf-FrontEnd/file/candidates.xml").attr("download","candidates.xml").tooltip();
			}else{
				alert("A lista de candidatos está vazia!");
			}
		});
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



function show(can){
	var list = "<ul>";
	$.each(can, function(key, val) {
		 if(key != 'TYPE_NAME')
			   list += '<li id="' + key + '">'+ key+" : "+val +'</li>';
		 
		 if(typeof val === 'object'){
			 list += "<ul>"+show(val)+"</ul>";
		 }
	});
	return list;
}

