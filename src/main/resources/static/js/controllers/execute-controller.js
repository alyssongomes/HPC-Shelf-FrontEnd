/**
 *  Controlador da função de envio de arquivos
 */

var xml = null;
var candidatos = null;
var system = null;
var xmls = new XMLSerializer();
var contracts = null;
var contract = null;

$(document).ready(function(){
	init();
});

function init() {
	initList();
	$("#new").click(function(){
		if($(this).is(":checked"))
			$("#existing").attr("checked",false);
	});
	$("#existing").click(function(){
		if($(this).is(":checked"))
			$("#new").attr("checked",false);
	});
	$("input:file").jfilestyle({buttonText: "Carregar contrato contextual", inputSize: "400px" });
	
	$("#destroy").button().click(function(){
		$("#modalLoadDestroy").modal({backdrop: 'static', keyboard: false});
		destroy(system,function(result){
			$("#modalLoadDestroy").modal('hide');
			alert("Plataforma: "+result);
		});
	});
	
	$("#deploy").button().click(function(){
		$("#modalLoadDeploy").modal({backdrop: 'static', keyboard: false});
		resort();
		deploy(candidatos,function(computSystem){
			system = computSystem;
			if(system != null){
				$("#deployTab").append("<h4>Sessão:<b> "+system.value.session+"</b>; Endereço da Plataforma: <b>"+system.value.networkAddress+"</b></h4>");
				$("#linkComputacional").attr("href","../file/system.xml").attr("download","system.xml").tooltip();
			}
			var result = instantiate(system);//retorna string
			$("#status").append("<h3>"+result+"</h3>");
			$("#modalLoadDeploy").modal('hide');
		});//retorna obj computational_system
	});
	
	$("#resolve").button().click(function(){
		if($("#new").is(":checked")){
			if(xml != null){
				$("#modalLoadResolve").modal({backdrop: 'static', keyboard: false});
				resolve(xml,resolved);
			}else{
				alert("Envie um Contrato Contextual");
			}
		}else if($("#existing").is(":checked")){
			if(contracts != null){
				if(contract != null){
					$("#modalLoadResolve").modal({backdrop: 'static', keyboard: false});
					resolveObject(contract,resolved);
				}else{
					alert("Selecione um contrato!");
				}
			}else{
				alert("Selecione um componente!");
			}
		}else{
			alert("Selecione uma forma de especificar o contrato!");
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


function show(can){
	var parameters = can.abstractComponent.contextParameter;
	var arguments = can.contextArguments;
	var list = "<ul>";
	for (var i = 0; i < parameters.length; i++) {
		for (var j = 0; j < arguments.length; j++) {
			if(parameters[i].cpId === arguments[j].cpId){
				if(arguments[j].value != null)
					list += "<li>"+parameters[i].name+" : "+arguments[j].value.value+"</li>";
				else if(arguments[j].contextContract != null)
					list += "<li>"+parameters[i].name+" : "+arguments[j].contextContract.ccName+"</li>";
				else 
					list += "<li>"+parameters[i].name+" : "+arguments[j].sharedVariableCpId+"</li>";
			}
		}
	}
	
	list += "<li>Plataforma: "+can.platform.platformContract.ccName+"</li><ul>";
	parameters = can.platform.platformContract.abstractComponent.contextParameter;
	arguments = can.platform.platformContract.contextArguments;
	
	for (var i = 0; i < parameters.length; i++) {
		for (var j = 0; j < arguments.length; j++) {
			if(parameters[i].cpId === arguments[j].cpId){
				if(arguments[j].value != null){
					list += "<li>"+parameters[i].name+" : "+arguments[j].value.value+"</li>";
				}else if(arguments[j].contextContract != null){
					list += "<li>"+parameters[i].name+" : "+arguments[j].contextContract.ccName+"</li>";
					if(arguments[j].contextContract.contextArguments != null && arguments[j].contextContract.abstractComponent.contextParameter != null)
						list += expand(arguments[j].contextContract.abstractComponent.contextParameter,arguments[j].contextContract.contextArguments);
				}else{ 
					list += "<li>"+parameters[i].name+" : "+arguments[j].sharedVariableCpId+"</li>";
				}
			}
		}
	}
	list += "</ul></ul>";
	return list;
}

function expand(parameters, arguments){
	var list = "<ul>";	
	for (var i = 0; i < parameters.length; i++) {
		for (var j = 0; j < arguments.length; j++) {
			if(parameters[i].cpId === arguments[j].cpId){
				if(arguments[j].value != null){
					list += "<li>"+parameters[i].name+" : "+arguments[j].value.value+"</li>";
				}else if(arguments[j].contextContract != null){
					list += "<li>"+parameters[i].name+" : "+arguments[j].contextContract.ccName+"</li>";
					
					if(arguments[j].contextContract.contextArguments != null && arguments[j].contextContract.abstractComponent.contextParameter != null)
						list += expand(arguments[j].contextContract.abstractComponent.contextParameter,arguments[j].contextContract.contextArguments);
				}else{ 
					list += "<li>"+parameters[i].name+" : "+arguments[j].sharedVariableCpId+"</li>";
				}
			}
		}
	}	
	list += "</ul>";
	return list;
}

function resort(){
	var cans = $("#candidatos > li");
	var sort = [];
	for(var i = 0; i < cans.length; i++){
		sort.push(candidatos.value.candidate[parseInt(cans[i].id)]);
	}
	candidatos.value.candidate = sort;
}

function initList(){
	var list = getListAbstractComponents();
	var listComp = $("#components");
	listComp.append("<option>Selecione um componente</option>");
	for (var i = 0; i < list.length; i++) {
		listComp.append("<option id='"+list[i].acId+"' value='"+list[i].name+"'>"+list[i].name+"</option>");
	}
	
	$("#components").change(function() {
		$("#components option:selected").each(function() {
			$("#modalLoadContracts").modal({backdrop: 'static', keyboard: false});
			getListContracts($(this).attr("id"), function(list){
				if(list === undefined){
					alert("Este componente não possui contratos!");
				}else{
					contracts = list;
					$("#contracts").empty();
					$("#contracts").append("<option>Selecione um contrato</option>");
					for (var i = 0; i < contracts.length; i++) {
						$("#contracts").append("<option id='"+contracts[i].ccId+"' value='"+contracts[i].ccName+"'>"+contracts[i].ccName+"</option>");
					}
				}
				$("#modalLoadContracts").modal('hide');
			});
		});
	});
	
	$("#contracts").change(function(){
		$("#contracts option:selected").each(function() {
			for (var i = 0; i < contracts.length; i++) {
				if(parseInt($(this).attr("id")) === parseInt(contracts[i].ccId))
					contract = contracts[i];
			}
		});
	})
}

function resolved(listCandidates){
	candidatos = listCandidates;
	if(candidatos != null){
		$("#candidatos").empty();
		for(var i = 0; i < candidatos.value.candidate.length; i++){
			var can = candidatos.value.candidate[i];
			console.log(can);
			$("#candidatos").append("<li id='"+i+"'><div class='panel panel-default'><div class='panel-heading' style='background-color:#25BFE1'><h4 class='panel-title'><a data-toggle='collapse' href='#collapse"+i+"'><b> Candidato "+(i+1)+" - "+can.ccName+"</b></a></h4>"+
		      "</div><div id='collapse"+i+"' class='panel-collapse collapse'><div class='panel-body'>"+show(can)+"</div></div></div></li>");	
		}			
		$("#linkCandidates").attr("href","../file/candidates.xml").attr("download","candidates.xml").tooltip();
		$("#modalLoadResolve").modal('hide');
		$("#candidatos").sortable();
		$("#candidatos").disableSelection();
		$("#candidatos").tooltip();
	}else{
		alert("A lista de candidatos está vazia!");
		$("#modalLoadResolve").modal('hide');
	}
}