var USER = null;
var COMPONENT = null;

$(document).ready(function(){
	init();
});

function init(){

	/*INICIO BOTÕES*/
	$("#save").click(function(){
		downloadContract();
	});
	$("#submit").click(function(){
		registerContract();
	});
	$("#submit").hide();
	$("#save").hide();
	
	$("#openComponent").click(function(){
		if($("#nameComp").find("h3").attr("value") == null ){
          	alert("Selecione um Componente!");
      	}else{
			loadComponentAbstract($("#containerDetailsComp").clone(true));
			$("#init").hide();
			$("#main").show("fast");
			getUserLogged(function(data){
				USER = data;
				$("#owner").append("<h4> Proprietário: "+USER.username+"</h4>");
			});
			$("#submit").show();
			$("#save").show();
		}
		//loadDetaisComp($("#nameComp"),"Name",$("#parar"),$("#nest"),$("#unit"),$("#slices"),$("#quality"),$("#cost"));
	});
	
	//$("#main").show("fast");
	
	$("#selectPlatform").click(function(){
		if($("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value") == null ){
            alert("Selecione uma Plataforma!");
        }else{
			$("#cmpPlt").find("h2[id=name-contract-platform]").remove();
		  	var form = $("#containerDetailsComp-plt");
			var op = form.find("#select-type").find("option:selected").attr("value");
			if(op == "new"){
				$("#cmpPlt").find("#platform").before("<h2 id='name-contract-platform'>"+$("#div-new-contract-platform").find("#name-new-contract").val()+"</h2>");
			}else{
				$("#cmpPlt").find("#platform").before("<h2 id='name-contract-platform'>"+form.find("#opstions-contract").find("option:selected").attr("value")+"</h2>");
			}
        }
	});
	
	$("#addParQuality").click(function(){
    	addParameterQuality();
    });
    
    $("#addParCost").click(function(){
    	addParameterCost();
    });
    
    $("#addParRanking").click(function(){
    	addParameterRanking();
    });
    /* FIM BOTÕES */
    
    /* INÍCIO - INPUT DAS FUNCTIONS */
    $("#function-value-ranking").keypress(function(e){
    	var v = [];
    	var func = $(this).val();
    	for(var i=0; i < func.length; i++){ 
    		if(func[i] === 'v'){
    			if(/\d{1,2}/.test(func[i+1])){
    				v.push('v'+func[i+1]);
    			}
    		}
    	}
    	updateTerms($("#termsRanking"), v);
    });
    $("#function-value-cost").keypress(function(e){
    	var v = [];
    	var func = $(this).val();
    	for(var i=0; i < func.length; i++){ 
    		if(func[i] === 'v'){
    			if(/\d{1,2}/.test(func[i+1])){
    				v.push('v'+func[i+1]);
    			}
    		}
    	}
    	updateTerms($("#termsCost"), v);
    });
    $("#function-value-quality").keypress(function(e){
    	var v = [];
    	var func = $(this).val();
    	for(var i=0; i < func.length; i++){ 
    		if(func[i] === 'v'){
    			if(/\d{1,2}/.test(func[i+1])){
    				v.push('v'+func[i+1]);
    			}
    		}
    	}
    	updateTerms($("#termsQuality"), v);
    });
    /* FIM - INPUT DAS FUNCTIONS */
	
	initListComponents();
	loadCompModal();
}

function loadComponentAbstract(details){
	
	$("#formulario").css("height","370px");
	
	$("#cmpSelected").append("<h2 id='name' value='"+$("#nameComp").find("h3").attr("value")+"'><b>"+$("#nameComp").find("h3").attr("value")+"</b></h2>");
	$("#cmpSelected").append("<p id='idAc' value='"+$("#nameComp").find("p[id=idAc]").attr("value")+"'></p>");
	$("#cmpSelected").append("<p id='idAcSuper' value='"+$("#nameComp").find("p[id=idSuper]").attr("value")+"'></p>");

	var param = $("#parar").find("tr:not(:first)");
	for (var i = 0; i < param.length; i++) {
		var linha = "<tr id='"+i+"'>"+
			"<td width='300px' id='"+param[i].childNodes.item(0).getAttribute("id")+"' value='"+param[i].childNodes.item(0).getAttribute("value")+"'><h3>"+param[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td width='250px'><select class='form-control' onclick='actionParameter("+i+")' id='"+param[i].childNodes.item(0).getAttribute("id")+"' style='width:250px'><optgroup label='"+i+"'><option optgroup='"+i+"' value='cp_id'>Identificador</option><option optgroup='"+i+"' value='contract'>Contrato Contextual</option><option optgroup='"+i+"' value='audi'>Valor</option></optgroup></select></td>"+
			"<td><p hidden id='bound' value='"+param[i].childNodes.item(1).childNodes.item(0).getAttribute("value")+"'></td>"+
		+"</tr>";
		$("#tabParCont").append(linha);
	}


	/*var units = $("#unit").find("tr:not(:first)");
	for (var i = 0; i < units.length; i++) {
		var linha = "<tr>"+
			"<td hidden value='"+units[i].childNodes.item(1).getAttribute("value")+"'><h3>"+units[i].childNodes.item(1).getAttribute("value")+"</h3></td>"+
			"<td value='"+units[i].childNodes.item(0).getAttribute("value")+"'><h3>"+units[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
		"</tr>";
		$("#tabUniAbs").append(linha);
	}*/


	var nests = $("#nest > tbody > tr");
	if(nests.length != 0){
		$("#modalLoadContracts").modal({backdrop: 'static', keyboard: false});
		for (var i = 0; i < nests.length; i++) {
			getListContracts(parseInt(nests[i].childNodes.item(1).getAttribute("value")),function(contracts){
				var acId = contracts[0].abstractComponent.idAc;
				var opts = "";
				for (var j = 0; j < contracts.length; j++) {
					opts += "<option class ='ui-selectmenu-button' id='"+contracts[j].ccId+"' value='"+contracts[j].ccName+"'>"+contracts[j].ccName+"</option>";
				}
				for(var k=0;k<nests.length;k++){
					if(parseInt(nests[k].childNodes.item(1).getAttribute("value")) === acId){
						var linha = "<tr>"+
							"<td width='300px' value='"+nests[k].firstChild.getAttribute("value")+"'><h3>"+nests[k].childNodes.item(0).getAttribute("value")+"</h3></td>"+
							"<td value='"+nests[k].childNodes.item(1).getAttribute("value")+"'></td>"+
							"<td><select class='form-control' style='width:250'>"+opts+"</select></td>"
							+"</tr>";
						$("#tabCmpAni").append(linha);
					}
				}
				
				$("#modalLoadContracts").modal('hide');
			}, function(error){
				alert("Não foi possível carregar os contratos!");
				console.log(error);
				$("#modalLoadContracts").modal('hide');
			});
		}
	}


	/*var slices = $("#slices").find("tr:not(:first)");
	for (var i = 0; i < slices.length; i++) {
		var linha = "<tr>"+
			"<td value='"+slices[i].childNodes.item(0).getAttribute("value")+"'><h3>"+slices[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td hidden value='"+slices[i].childNodes.item(1).getAttribute("value")+"'><h3>"+slices[i].childNodes.item(1).getAttribute("value")+"</h3></td>"+
			"<td hidden value='"+slices[i].childNodes.item(2).getAttribute("value")+"'><h3>"+slices[i].childNodes.item(2).getAttribute("value")+"</h3></td>"+
		+"</tr>";
		$("#tabSlices").append(linha);
	}*/


	var qualities = $("#quality").find("tr:not(:first)");
	for (var i = 0; i < qualities.length; i++) {
		var linha = "<tr id="+qualities[i].childNodes.item(1).getAttribute("value")+">"+
			"<td width='300px' value='"+qualities[i].childNodes.item(0).getAttribute("value")+"'><h3>"+qualities[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td width='150px' ><button class='btn btn-primary' onclick='addQuality("+qualities[i].childNodes.item(1).getAttribute("value")+")' >Inserir Argumento</button></td>"+
		+"</tr>";
		$("#tabQuality").append(linha);
	}


	var costs = $("#cost").find("tr:not(:first)");
	for (var i = 0; i < costs.length; i++) {
		var linha = "<tr id="+costs[i].childNodes.item(1).getAttribute("value")+">"+
			"<td width='300px' value='"+costs[i].childNodes.item(0).getAttribute("value")+"'><h3>"+costs[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td width='150px' ><button class='btn btn-primary' onclick='addCost("+costs[i].childNodes.item(1).getAttribute("value")+")' >Inserir Argumento</button></td>"+
			//"<td hidden value='"+costs[i].childNodes.item(2).getAttribute("value")+"'><h3>"+costs[i].childNodes.item(2).getAttribute("value")+"</h3></td>"
		+"</tr>";
		$("#tabCost").append(linha);
	}
	
	var ranking = $("#ranking").find("tr:not(:first)");
	for(var i=0; i < ranking.length; i++){
		var linha = "<tr id="+ranking[i].childNodes.item(1).getAttribute("value")+">"+
			"<td width='300px' value='"+ranking[i].childNodes.item(0).getAttribute("value")+"'><h3>"+ranking[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td width='150px' ><button class='btn btn-primary' onclick='addRanking("+ranking[i].childNodes.item(1).getAttribute("value")+")'>Inserir Argumento</button></td>"+
			//"<td hidden value='"+ranking[i].childNodes.item(2).getAttribute("value")+"'><h3>"+ranking[i].childNodes.item(2).getAttribute("value")+"</h3></td>"
		+"</tr>";
		$("#tabRanking").append(linha);
	}
	
	/*if(COMPONENT != null){
		$("#modalLoadComponent").modal({backdrop: 'static', keyboard: false});
		var cmp = getAbstractComponent(COMPONENT.supertype.name);
		$("#modalLoadComponent").modal('hide');
		
		for(var i=0; i< cmp.contextParameter.length; i++){
			$("#cp-argument-quality").append("<option value="+cmp.contextParameter[i].cpId+">"+cmp.contextParameter[i].name+"</option>");
			$("#cp-argument-cost").append("<option value="+cmp.contextParameter[i].cpId+">"+cmp.contextParameter[i].name+"</option>");
			$("#cp-argument-ranking").append("<option value="+cmp.contextParameter[i].cpId+">"+cmp.contextParameter[i].name+"</option>");
		}
	}*/

	//$(":file").jfilestyle({buttonText: "Carregar código-fonte", inputSize: "350px"});
}

function registerContract() {
	var form = $("#formulario");
	var main = $("#main");
	if(form.find("#ccNm").find("#ccName").val() != null && form.find("#ccNm").find("#ccName").val() != ""){
		$("#modalSubmit").modal({backdrop: 'static', keyboard: false});
		var contractObj = {
			name: form.find("#ccNm").find("#ccName").val(),
			arguments: getContextArguments(form.find("#tabParCont")),
			component:getAbstractComponentRegister(main.find("#cmpSelected")),
			platformContract: getPlatform(),
			qualities: getQualityParameters(),
			ranking: getRankingParameters(),
			costs: getCostParameters(),
			inners: getInnerComponents(form.find("#tabCmpAni"))
		};
		
		saveNewContract(contractObj,function(result){
			try{
				result = result.getElementsByTagName("result").item(0).getAttribute("value");
				console.log(result);
				alert(result);
				if(result === "true"){
					alert("Contrato Submetido com sucesso!");
				}else{
					alert("O contrato não foi Submetido com sucesso!");
				}
				$("#modalSubmit").modal('hide');
			}catch (e) {
				alert("[ERROR]: Não foi possível carregar a resposta - "+e);
			}
		});
	}else{
		alert("Insera um nome para o contrato!");
	}
}

function downloadContract() {
	var form = $("#formulario");
	var main = $("#main");
	if(form.find("#ccNm").find("#ccName").val() != null && form.find("#ccNm").find("#ccName").val() != ""){
		$("#modalSubmit").modal({backdrop: 'static', keyboard: false});
		var contractObj = {
			name: form.find("#ccNm").find("#ccName").val(),
			arguments: getContextArguments(form.find("#tabParCont")),
			component:getAbstractComponentRegister(main.find("#cmpSelected")),
			platformContract: getPlatform(),
			qualities: getQualityParameters(),
			ranking: getRankingParameters(),
			costs: getCostParameters(),
			inners: getInnerComponents(form.find("#tabCmpAni"))
		};
		downloadNewContract(contractObj, function(result){
			$("#modalSubmit").modal('hide');
	    	$("#modalDownload").modal("show");
		}, function(error){
			console.log(error);
			alert("Erro ao submeter o contrato");
		});
	}else{
		alert("Insera um nome para o contrato!");
	}
}

// GETS
function getPlatform(){
	var form = $("#containerDetailsComp-plt");
	var op = form.find("#select-type").find("option:selected").attr("value");
	if(op == "select"){
		var contextContract = {
			ccName: form.find("#opstions-contract").find("option:selected").attr("value"),
			ccId: parseInt(form.find("#opstions-contract").find("option:selected").attr("id"))
		}
		return contextContract;
	}else if(op == "new"){
		var contextContract = {
			ccName: $("#div-new-contract-platform").find("#name-new-contract").val(),
			contextArgumentsProvided: getContextArgumentsPlatform(),
			abstractComponent: {
				name: form.find("#nameComp").find("h3").attr("value"),
				idAc: parseInt(form.find("#nameComp").find("p[id=ccId]").attr("value")),
				supertype:{idAc:parseInt(form.find("#nameComp").find("p[id=idSuper]").attr("value"))}
			}
			/*platform: ,
			qualityArguments: ,
			rankingArguments: ,
			costArguments: ,
			innerComponents:*/ 
		};
		return contextContract;
	}else{
		return null;
	}
	
}

function getAbstractComponentRegister(formComponent){
	var component = {
		name:formComponent.find("#name").attr("value"),
		idAc: parseInt(formComponent.find("#idAc").attr("value")),
		supertype:{idAc:parseInt(formComponent.find("#idAcSuper").attr("value"))}
		/*abstractUnit:
		slices:*/
	};
	return component;
}

function getInnerComponents(formInnerComponents){
	var rows = formInnerComponents.find("tr");
	var components = Array();
	for (var i = 0; i < rows.length; i++) {
		var component = {
			ccName: rows[i].childNodes.item(2).childNodes.item(0).options[rows[i].childNodes.item(2).childNodes.item(0).options.selectedIndex].value ,
			ccId: parseInt(rows[i].childNodes.item(2).childNodes.item(0).options[rows[i].childNodes.item(2).childNodes.item(0).options.selectedIndex].id)
		};
		components[i] = component;
	}	
	return components;
}

function getContextArguments(formContextArguments){
	var rows = formContextArguments.find("tr");
	var arguments = Array();
	for (var i = 0; i < rows.length; i++) {
		var argument = {
			//cpId: parseInt(rows[i].childNodes.item(0).getAttribute("id")),
			//boundCcId: parseInt(rows[i].childNodes.item(2).childNodes.item(0).getAttribute("value")),
			//variableCpId: 0
		};
		var op = rows[i].childNodes.item(1).childNodes.item(0).options.selectedIndex;
		if(op === 0){
			//argument.cpId = parseInt(rows[i].childNodes.item(3).childNodes.item(0).options[rows[i].childNodes.item(3).childNodes.item(0).options.selectedIndex].id);
		}else if(op === 1){
			argument.contextContract = { 
				ccId: parseInt(rows[i].childNodes.item(3).childNodes.item(0).options[rows[i].childNodes.item(3).childNodes.item(0).options.selectedIndex].id), 
				ccName: rows[i].childNodes.item(3).childNodes.item(0).options[rows[i].childNodes.item(3).childNodes.item(0).options.selectedIndex].value
			};
			argument.value = null;
		}else{
			argument.value = {
				value: rows[i].childNodes.item(3).childNodes.item(0).value,
				dataType: rows[i].childNodes.item(4).childNodes.item(0).value
			};
		}
		arguments[i] = argument;
		arguments[i].cpId = parseInt(rows[i].childNodes.item(0).id);
		arguments[i].kind = 1;
	}
	return arguments;
}

function getContextArgumentsPlatform(){
	var rows = $("#div-new-contract-platform").find("#parar").find("tr:not(:first)");
	var arguments = Array();
	for (var i = 0; i < rows.length; i++) {
		var argument = {
			//cpId: parseInt(rows[i].childNodes.item(0).getAttribute("id")),
			//boundCcId: parseInt(rows[i].childNodes.item(2).childNodes.item(0).getAttribute("value")),
			//variableCpId: 0
		};
		var op = rows[i].childNodes.item(2).childNodes.item(0).options.selectedIndex;
		if(op === 0){
			argument.cpId = parseInt(rows[i].childNodes.item(3).childNodes.item(0).options[rows[i].childNodes.item(3).childNodes.item(0).options.selectedIndex].id);
		}else if(op === 1){
			argument.contextContract = { 
				ccId: parseInt(rows[i].childNodes.item(3).childNodes.item(0).options[rows[i].childNodes.item(3).childNodes.item(0).options.selectedIndex].id), 
				ccName: rows[i].childNodes.item(3).childNodes.item(0).options[rows[i].childNodes.item(3).childNodes.item(0).options.selectedIndex].value
			};
		}else{
			argument.value = {
				value: rows[i].childNodes.item(3).childNodes.item(0).value,
				dataType: rows[i].childNodes.item(4).childNodes.item(0).value
			};
		}
		arguments[i] = argument;
	}
	return arguments;
}

function getQualityParameters(){
	var arguments = [];
	var lines = $("#tabQuality > tbody > tr");
	for(var i=0; i < lines.length;i++){
		arguments.push(JSON.parse(lines[i].childNodes.item(2).dataset.json));
	}
	return arguments;
}

function getCostParameters(){
	var arguments = [];
	var lines = $("#tabCost > tbody > tr");
	for(var i=0; i < lines.length;i++){
		arguments.push(JSON.parse(lines[i].childNodes.item(2).dataset.json));
	}
	return arguments;
}

function getRankingParameters(){
	var arguments = [];
	var lines = $("#tabRanking > tbody > tr");
	for(var i=0; i < lines.length;i++){
		arguments.push(JSON.parse(lines[i].childNodes.item(2).dataset.json));
	}
	return arguments;
}

// FUNÇÕES PARA CARREGAR INFORMAÇÕES NA INTERFACE
function loadCompModal () {
	
	var listLinksComponents = $("#listComponents > li");	
	var listLinkComponentsPlatform = $("#listPltComponents").find("li");
	
	if(listLinkComponentsPlatform != null && listLinksComponents != null){
		for (var i = 0; i < listLinksComponents.length; i++) {
			listLinksComponents[i].onclick = function(){
				$("#nameComp > h3").remove();
	            $("#nameComp > p").remove();
	            $("#nameComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
	            $("#nameComp").append("<p id = 'idAc' value='"+this.firstChild.getAttribute("id")+"'></p>");
	            loadDetaisComp($("#nameComp") ,this.firstChild.text,$("#parar"),$("#nest"),$("#unit"),$("#slices"),$("#quality"),$("#cost"), $("#ranking"));
			};
		}
		
		for (var i = 0; i < listLinkComponentsPlatform.length; i++) {
			listLinkComponentsPlatform[i].onclick = function() {
				$("#containerDetailsComp-plt").find("#nameComp > h3").remove();
		        $("#containerDetailsComp-plt").find("#nameComp > p").remove();
		        $("#containerDetailsComp-plt").find("#div-select-contract").find("select").remove();
		        $("#select-type").css("visibility","hidden");
		        $("#div-new-contract-platform").css("visibility","hidden");
		        
		        $("#containerDetailsComp-plt").find("#nameComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
		        $("#containerDetailsComp-plt").find("#nameComp").append("<p id='ccId' value='"+this.firstChild.getAttribute("id")+"'></p>");
		        $("#select-type").css("visibility","visible");
		        var combPlt = document.getElementById("select-type");
		        combPlt.onclick = function(){
		        	if(combPlt.selectedIndex === 1){
		        		selectContractPlt();
		        	}else if(combPlt.selectedIndex === 2 ){
		        		newContractPlt();
		        	}
		        }
			}
		}
	}

}

function loadDetaisComp (viewComp, component, listParar, listNestedComp, listAbsUnit, listSlices, listQualities, listCosts, listRanking) {
	$("#modalLoadComponent").modal({backdrop: 'static', keyboard: false});
	
	listParar.empty();
    listNestedComp.empty();
    listAbsUnit.empty();
	listSlices.empty();
    listQualities.empty();
    listCosts.empty();
    listRanking.empty();
    
    var cmp = getAbstractComponent(component);
    COMPONENT = cmp;
    console.log(cmp);
    $("#modalLoadComponent").modal('hide');
    
    
    var parar = cmp.contextParameter;
    var nested = cmp.innerComponents;
    var unit = cmp.abstractUnit;
	var slice = cmp.slices;
    var quality = cmp.qualityParameters;
    var cost = cmp.costParameters;
    var rank = cmp.rankingParameters;

    viewComp.append("<p id='idSuper' value='"+cmp.supertype.idAc+"'></p>");
    
    if(parar != null){
    	listParar.append("<thead><tr><td><b>Nome</b></td></tr></thead>");
	    for (var i = 0; i < parar.length; i++) {
	    	var ccId = parar[i].bound == null ? "": parar[i].bound.ccId;
	        listParar.append("<tr>"+
	    		"<td id='"+parar[i].cpId+"' value='"+parar[i].name+"'>"+parar[i].name+"</td>"+
	    		"<td><p hidden id='bound' value='"+ccId+"'></p></td>"+
	        	"</tr>");
	    }
    }

    if(nested != null){
    	listNestedComp.append("<thead><tr><td><b>Nome</b></td></tr></thead>");
	    for (var i = 0; i < nested.length; i++) {
	        listNestedComp.append("<tr>"+
	        	"<td value='"+nested[i].name+"'>"+nested[i].name+"</td><td value='"+nested[i].idAc+"'>"+nested[i].idAc+"</td></tr>");
	    }
    }

    if(unit != null){
    	listAbsUnit.append("<thead><tr><td><b>Nome</b></td></tr></thead>");
	    for (var i = 0; i < unit.length; i++) {
	        listAbsUnit.append("<tr>"+
	          "<td value='"+unit[i].auName+"'>"+unit[i].auName+"</td>"+
	          "<td value='"+unit[i].auId+"'>"+unit[i].auId+"</td>"
	        +"</tr>");
	    }
    }
    
    if(slice != null){
    	console.log(slice);
    	listSlices.append("<thead><tr><td><b>Nome</b></td></tr></thead>");
	    for (var i = 0; i < slice.length; i++) {
	        listSlices.append("<tr>"+
	          "<td value='"+slice[i].innerUnityName+"'>"+slice[i].innerUnityName+"</td>"+
	          "<td value='"+slice[i].sliceId+"'>"+slice[i].sliceId+"</td>"+
	          "<td value='"+slice[i].idCmp+"'>"+slice[i].idCmp+"</td>"
	        +"</tr>");
	    }
    }
    
    if(quality != null){
    	listQualities.append("<thead><tr><td><b>Nome</b></td></tr></thead>");
	    for (var i = 0; i < quality.length; i++) {
	        listQualities.append("<tr>"+
	          "<td value='"+quality[i].name+"'>"+quality[i].name+"</td>"+
	          "<td colspan='2' value='"+quality[i].calcId+"'>"+quality[i].calcId+"</td>"+
	        +"</tr>");
	    }
    }
    
    if(cost != null){
    	listCosts.append("<thead><tr><td><b>Nome</b></td></tr></thead>");
	    for (var i = 0; i < cost.length; i++) {
	        listCosts.append("<tr>"+
	          "<td value='"+cost[i].name+"'>"+cost[i].name+"</td>"+
	          "<td colspan='2' value='"+cost[i].calcId+"'>"+cost[i].calcId+"</td>"+
	        +"</tr>");
	    }
    }
    
    if(rank != null){
    	listRanking.append("<thead><tr><td><b>Nome</b></td></tr></thead>");
    	for(var i=0; i < rank.length;i++){
    		listRanking.append("<tr>"+
				"<td value='"+rank[i].name+"'>"+rank[i].name+"</td>"+
				"<td colspan='2' value='"+rank[i].calcId+"'>"+rank[i].calcId+"</td>"+ 
			+"</tr>");
    	}
    }
    
    
}

function loadDetaisCompPlatform (viewComp, component, listParar, listNestedComp, listAbsUnit, listSlices, listQualities, listCosts) {
    listParar.find("tr:not(:first)").remove();
    listNestedComp.find("tr:not(:first)").remove();
    listAbsUnit.find("tr:not(:first)").remove();
    listCosts.find("tr:not(:first)").remove();
    listQualities.find("tr:not(:first)").remove();
    listSlices.find("tr:not(:first)").remove();
    
    var cmp = getAbstractComponent(component);
    
    var parar = cmp.contextParameter; 
    var nested = cmp.innerComponents;
    var unit = cmp.abstractUnit;
	var slice = cmp.slices;
    var quality = cmp.qualityParameters;
    var cost = cmp.costParameters;

    viewComp.append("<p id='idSuper' value='"+cmp.supertype.idAc+"'></p>");
    
    if(parar != null){
    	for (var i = 0; i < parar.length; i++) {
        	var ccId = parar[i].bound == null ? "": parar[i].bound.ccId;
            listParar.append("<tr id="+i+">"+
        		"<td id='"+parar[i].cpId+"' value='"+parar[i].name+"'>"+parar[i].name+"</td>"+
        		"<td><p hidden id='bound' value='"+ccId+"'></p></td>"+
        		"<td width='200px'><select onclick='actionParameterPlt("+i+")' id='"+parar[i].cpId+"' style='width:200px' class='form-control'><optgroup  label='"+i+"'><option optgroup='"+i+"' value='cp_id'>Identificador</option><option optgroup='"+i+"' value='contract'>Contrato Contextual</option><option optgroup='"+i+"' value='audi'>Valor</option></optgroup></select></td>"+    		
            	"</tr>");
        };
    }
    
    if(nested != null){
    	for (var i = 0; i < nested.length; i++) {
            listNestedComp.append("<tr>"+
            	"<td value='"+nested[i].name+"'>"+nested[i].name+"</td><td value='"+nested[i].id+"'>"+nested[i].id+"</td></tr>");
        };
    }

    if(unit != null){
    	for (var i = 0; i < unit.length; i++) {
            listAbsUnit.append("<tr>"+
              "<td value='"+unit[i].name+"'>"+unit[i].name+"</td>"+
              "<td value='"+unit[i].id+"'>"+unit[i].id+"</td>"
            +"</tr>");
        };
    }
    
    if(slice != null){
    	for (var i = 0; i < slice.length; i++) {
            listSlices.append("<tr>"+
              "<td value='"+slice[i].name+"'>"+slice[i].name+"</td>"+
              "<td value='"+slice[i].sliceId+"'>"+slice[i].sliceId+"</td>"+
              "<td value='"+slice[i].idCmp+"'>"+slice[i].idCmp+"</td>"
            +"</tr>");
        };
    }
    
    if(quality != null){
    	for (var i = 0; i < quality.length; i++) {
            listQualities.append("<tr>"+
              "<td value='"+quality[i].name+"'>"+quality[i].name+"</td>"+
              //"<td value='"+quality[i].qpId+"'>"+quality[i].qpId+"</td>"+
              //"<td value='"+quality[i].kindId+"'>"+quality[i].kindId+"</td>"
            +"</tr>");
        };
    }
    
    if(cost != null){
    	for (var i = 0; i < cost.length; i++) {
            listCosts.append("<tr>"+
              "<td value='"+cost[i].name+"'>"+cost[i].name+"</td>"+
              //"<td value='"+cost[i].copId+"'>"+cost[i].copId+"</td>"+
              //"<td value='"+cost[i].kindId+"'>"+cost[i].kindId+"</td>"
            +"</tr>");
        };
    }
    
}

function initListComponents(){
	var list = getListAbstractComponents();
	var listOps = $("#listComp-ops");
	var listComp = $("#listComponents");
	var listPlt = $("#listPltComponents");
	
	for (var i = 0; i < list.length; i++) {
		listOps.append($("<option>",{id:list[i].acId , value:list[i].name, text:list[i].name}));
		listComp.append($("<li>",{class:"ui-state-default"}).append($("<a>",{id:list[i].acId , value:list[i].name, text:list[i].name, href:"#"})));
		if(list[i].path.search("Platform") > -1){
			listPlt.append($("<li>",{class:"ui-state-default"}).append($("<a>",{id:list[i].acId , value:list[i].name, text:list[i].name, href:"#"})));
		}
	}
}

function selectContractPlt() {
	$("#div-select-contract > br").remove();
	$("#div-select-contract > select").remove();
	
	var select = $("<select>",{class:"form-control",id:"opstions-contract",style:"width:250px;"});
	$("#modalLoadContracts").modal({backdrop: 'static', keyboard: false});
	getListContracts($("#containerDetailsComp-plt").find("#nameComp").find("p[id=ccId]").attr("value"),function(list){
		if(list != undefined){
			var contracts = list;
			for (var i = 0; i < contracts.length; i++) {
				select.append($("<option>",{text:contracts[i].ccName ,value:contracts[i].ccName ,id:contracts[i].ccId}));
			};
			
			$("#div-select-contract").append("<br>");
			$("#div-select-contract").append(select);
			$("#div-new-contract-platform").css("visibility","hidden");
		}else{
			alert("Este componente não possui contratos!");
		}
		$("#modalLoadContracts").modal('hide');
	}, function(error){
		alert("Não foi possível carregar os contratos!");
		console.log(error);
		$("#modalLoadContracts").modal('hide');
	});
}

function newContractPlt(){
	$("#div-new-contract-platform").css("visibility","visible");
	$("#div-select-contract > br").remove();
	$("#div-select-contract > select").remove();
	loadDetaisCompPlatform($("#containerDetailsComp-plt").find("#nameComp") ,
			$("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value"),
			$("#containerDetailsComp-plt").find("#parar"),
			$("#containerDetailsComp-plt").find("#nest"),
			$("#containerDetailsComp-plt").find("#unit"),
			$("#containerDetailsComp-plt").find("#slices"),
			$("#containerDetailsComp-plt").find("#quality"),
			$("#containerDetailsComp-plt").find("#cost"));
}

function actionParameter(ind){
	var opt = $("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(1)").find("select option:selected").val();
	if(opt === 'cp_id'){
		$("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(3)").remove();
		$("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(3)").remove();
		var colum = $("<td/>",{style:"width:250px; padding-left:10px;"});
		var select = $("#listComp-ops").clone(true);
		select.addClass("form-control");
		colum.append(select.css("visibility","visible"));
		$("#tabParCont").find("tr[id='"+ind+"']").append(colum);

		//select.selectmenu();//.selectmenu("menuWidget");//.addClass("overflow");
	}else if(opt === 'contract'){
		$("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(3)").remove();
		$("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(3)").remove();
		var op = $("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(1)").find("select").attr("id");
		$("#modalLoadContracts").modal({backdrop: 'static', keyboard: false});
		getListContracts(op, function(list){
			if(list != undefined){
				var listContract = list;
				
				var select = $("<select/>",{id:"listContracts", style:"width:250px", class:"form-control"});
				//select.find("option").remove();
				if(listContract === null){
					alert("Não possui contratos!");
				}else{
					for (var i = 0; i < listContract.length; i++) {
						select.append("<option id='"+listContract[i].ccId+"' value='"+listContract[i].ccName+"'>"+listContract[i].ccName+"</option>");
					}
					var colum = $("<td/>",{style:"width:250px; padding-left:10px;"});
					colum.append(select.css("visibility","visible"));
					$("#tabParCont").find("tr[id='"+ind+"']").append(colum);
				}
			}else{
				alert("Este parâmetro não possui contratos");
			}
			$("#modalLoadContracts").modal('hide');
		}, function(error){
			alert("Não foi possível carregar os contratos!");
			console.log(error);
			$("#modalLoadContracts").modal('hide');
		});
	}else {
		$("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(3)").remove();
		$("#tabParCont").find("tr[id='"+ind+"']").find("td:nth(3)").remove();
		$("#tabParCont").find("tr[id='"+ind+"']").append("<td style='width:200px; padding-left: 10px;' ><input type='text' class='form-control' name='valor' placeholder='Valor'/></td>");
		$("#tabParCont").find("tr[id='"+ind+"']").append("<td style='width:200px; padding-left: 10px;' ><input type='text' class='form-control' name='dataType' placeholder='Tipo de valor'/></td>");
	}
}

function actionParameterPlt(ind){
	var opt = $("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(2)").find("select option:selected").val();
	if(opt === 'cp_id'){
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		var colum = $("<td/>",{style:"width:250px; padding-left:10px;"});
		var select = $("#listComp-ops").clone(true);
		select.addClass("form-control");
		colum.append(select.css("visibility","visible"));
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").append(colum);

		//select.selectmenu();//.selectmenu("menuWidget");//.addClass("overflow");
	}else if(opt === 'contract'){
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		var op = $("#div-new-contract-platform").find("#parar").find("tr[id='"+ind+"']").find("td:nth(2)").find("select").attr("id");
		$("#modalLoadContracts").modal({backdrop: 'static', keyboard: false});
		getListContracts(op,function(list){
			if(list != undefined){
				var listContract = list;
				var select = $("<select/>",{id:"listContracts", style:"width:250px", class:"form-control"});
				//select.find("option").remove();
				if(listContract === null){
					alert("Não possui contratos!");
				}else{
					for (var i = 0; i < listContract.length; i++) {
						select.append("<option id='"+listContract[i].ccId+"' value='"+listContract[i].ccName+"'>"+listContract[i].ccName+"</option>");
					}
					var colum = $("<td/>",{style:"width:250px; padding-left:10px;"});
					colum.append(select.css("visibility","visible"));
					$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").append(colum);
				}
			}else{
				alert("Este parâmetro não possui contratos!");
			}
			$("#modalLoadContracts").modal('hide');
		}, function(error){
			alert("Não foi possível carregar os contratos!");
			console.log(error);
			$("#modalLoadContracts").modal('hide');
		});

	}else {
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").append("<td style='padding-left: 10px;' ><input type='text' style='width:200px;' class='form-control' name='valor' placeholder='Valor'/></td>");
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").append("<td style='padding-left: 10px;' ><input type='text' style='width:200px;' class='form-control' name='dataType' placeholder='Tipo de valor'/></td>");
	}
}


function addQuality(pq_id){
	$("#modalParamQuality").modal();
	for(var i=0; i < COMPONENT.qualityParameters.length; i++){
		if(COMPONENT.qualityParameters[i].calcId === pq_id){
			$("#nameParQuality").text(COMPONENT.qualityParameters[i].name);
			$("#indexParQuality").remove();
			$("#nameParQuality").append("<input id='indexParQuality' hidden='true' value="+pq_id+" />");
			if($("#tabQuality > tbody > tr[id="+pq_id+"]").children()[1].firstChild.className.search("success") > -1){
				var argument = JSON.parse($("#tabQuality > tbody > tr[id="+pq_id+"]").children()[2].dataset.json);
				$("#value-argument-quality").val(argument.value);
			}
		}
	}
}

function addCost(pc_id){
	$("#modalParamCost").modal();
	for(var i=0; i < COMPONENT.costParameters.length; i++){
		if(COMPONENT.costParameters[i].calcId === pc_id){
			$("#nameParCost").text(COMPONENT.costParameters[i].name);
			$("#indexParCost").remove();
			$("#nameParCost").append("<input id='indexParCost' hidden='true' value="+pc_id+" />");
			if($("#tabCost > tbody > tr[id="+pc_id+"]").children()[1].firstChild.className.search("success") > -1){
				var argument = JSON.parse($("#tabCost > tbody > tr[id="+pc_id+"]").children()[2].dataset.json);
				$("#value-argument-cost").val(argument.value);
			}
		}
	}
}

function addRanking(pr_id){
	$("#modalParamRanking").modal();
	for(var i=0; i < COMPONENT.rankingParameters.length; i++){
		if(COMPONENT.rankingParameters[i].calcId === pr_id){
			$("#nameParRanking").text(COMPONENT.rankingParameters[i].name);
			$("#indexParRanking").remove();
			$("#nameParRanking").append("<input id='indexParRanking' hidden='true' value="+pr_id+" />");
			if($("#tabRanking > tbody > tr[id="+pr_id+"]").children()[1].firstChild.className.search("success") > -1){
				var argument = JSON.parse($("#tabRanking > tbody > tr[id="+pr_id+"]").children()[2].dataset.json);
				$("#value-argument-ranking").val(argument.value);
			}
		}
	}
}

function addParameterQuality(){
	var name = $("#value-argument-quality").val();
	if(name != ""){
		//Object Parameter Quality
		var quality = {
			cpId: parseInt($("#indexParQuality").val()), 
			//kindId:$("#kind-quality").val()==null? undefined:parseInt($("#kind-quality").val()),
			//calculatedArgument:{
				value:$("#value-argument-quality").val()==null? undefined:parseFloat($("#value-argument-quality").val())
				//kindId:$("#kind-argument-quality").val()==null? undefined:parseInt($("#kind-argument-quality").val()),
				//cpId:$("#cp-argument-quality").val()==null? undefined:parseInt($("#cp-argument-quality").val()),
				//'function':{
					//functionValue:$("#function-value-quality").val()==null? undefined: $("#function-value-quality").val(),
					//cpId: $("#cp-function-quality").val()==null? undefined:parseInt($("#cp-function-quality").val()),
					//ccId: $("#contract-function-quality").val()==null? undefined: parseInt($("#contract-function-quality").val()),
					//functionParameters:[],
					//functionArguments:[]
				//}
			//}
		};
		/*var table = $("#termsQuality > tbody > tr");
		for(var i=0;i<table.length;i++){
			var select = table[i].cells[1].firstChild.selectedIndex;
			quality.calculatedArgument['function'].functionParameters.push({
				order:parseInt(table[i].cells[0].firstChild.nodeValue.replace("v",""))+1,
				cpId:parseInt(table[i].cells[1].firstChild.options[select].value)
			});
		}*/
		
		var col = "<td data-json='"+JSON.stringify(quality)+"'></td>";
		var tabQuality = $("#tabQuality > tbody > tr");
		for(var i=0; i < tabQuality.length; i++){
			if(parseInt(tabQuality[i].id) === parseInt($("#indexParQuality").val())){
				if($("#tabQuality > tbody > tr[id="+tabQuality[i].id+"]").children()[2] != undefined){$("#tabQuality > tbody > tr[id="+tabQuality[i].id+"]").children()[2].remove()}; //removendo json desatualizado
				$("#tabQuality > tbody > tr[id="+tabQuality[i].id+"]").append(col);
				$("#tabQuality > tbody > tr[id="+tabQuality[i].id+"]").children()[1].firstChild.className = "btn btn-success";
				$("#tabQuality > tbody > tr[id="+tabQuality[i].id+"]").children()[1].firstChild.innerHTML = "Editar argumento";
			}
		}
		
		
		//LIMPAR CAMPOS
		cleanField($("#name-par-quality"), $("#function-value-quality"), $("#kind-quality"), $("#value-argument-quality"), $("#kind-argument-quality"), $("#cp-argument-quality"), $("#contract-function-quality"),$("#cp-function-quality"),$("#termsQuality > tbody > tr"));
	}else{
		alert("Informe um argumento para o parâmetro!");
	}
}

function addParameterCost(){
	var name = $("#value-argument-cost").val();
	//Object Parameter Cost
	if(name != ""){
		var cost = {
			cpId: parseInt($("#indexParCost").val()),
			//kindId: $("#kind-cost").val()==null? undefined:parseInt($("#kind-cost").val()),
			//calculatedArgument:{
				value:$("#value-argument-cost").val()==null? undefined:parseFloat($("#value-argument-cost").val())
				//kindId: $("#kind-argument-cost").val()==null? undefined:parseInt($("#kind-argument-cost").val()),
				//cpId: $("#cp-argument-cost").val()==null? undefined:parseInt($("#cp-argument-cost").val()),
				//'function':{
					//functionValue:$("#function-value-cost").val()==null? undefined:$("#function-value-cost").val(),
					//ccId: $("#contract-function-cost").val()==null? undefined: parseInt($("#contract-function-cost").val()),
					//cpId: $("#cp-function-quality").val()==null? undefined:parseInt($("#cp-function-quality").val()),
					//functionParameters:[],
					//functionArguments:[]
				//}
			//}
		};
		/*var table = $("#termsCost > tbody > tr");
		for(var i=0;i<table.length;i++){
			var select = table[i].cells[1].firstChild.selectedIndex;
			cost.calculatedArgument['function'].functionParameters.push({
				order:parseInt(table[i].cells[0].firstChild.nodeValue.replace("v",""))+1,
				cpId:parseInt(table[i].cells[1].firstChild.options[select].value)
			});
		}*/
		
		
		var col = "<td data-json='"+JSON.stringify(cost)+"'></td>";
		var tabCost = $("#tabCost > tbody > tr");
		for(var i=0; i < tabCost.length; i++){
			if(parseInt(tabCost[i].id) === parseInt($("#indexParCost").val())){
				if($("#tabCost > tbody > tr[id="+tabCost[i].id+"]").children()[2] != undefined){$("#tabCost > tbody > tr[id="+tabCost[i].id+"]").children()[2].remove()}; //removendo json desatualizado
				$("#tabCost > tbody > tr[id="+tabCost[i].id+"]").append(col);
				$("#tabCost > tbody > tr[id="+tabCost[i].id+"]").children()[1].firstChild.className = "btn btn-success";
				$("#tabCost > tbody > tr[id="+tabCost[i].id+"]").children()[1].firstChild.innerHTML = "Editar argumento";
			}
		}
		
		//LIMPAR CAMPOS
		cleanField($("#name-par-cost"), $("#function-value-cost"), $("#kind-cost"), $("#value-argument-cost"), $("#kind-argument-cost"), $("#cp-argument-cost"), $("#contract-function-cost"),$("#cp-function-cost"),$("#termsCost > tbody > tr"));
	}else{
		alert("Informe um argumento para o parâmetro!");
	}
}

function addParameterRanking(){
	var name = $("#value-argument-ranking").val();
	if(name != ""){
		//Object Parameter Ranking
		var ranking = {
			cpId: parseInt($("#indexParRanking").val()),
			//kindId: $("#kind-ranking").val()==null? undefined:parseInt($("#kind-ranking").val()),
			//calculatedArgument:{
				value:$("#value-argument-ranking").val()==null? undefined:parseFloat($("#value-argument-ranking").val())
				//kindId: $("#kind-argument-ranking").val()==null? undefined:parseInt($("#kind-argument-ranking").val()),
				//cpId: $("#cp-argument-ranking").val()==null? undefined:parseInt($("#cp-argument-ranking").val()),
				//'function':{
					//functionValue:$("#function-value-ranking").val()==null? undefined:$("#function-value-ranking").val(),
					//ccId: $("#contract-function-ranking").val()==null? undefined:parseInt($("#contract-function-ranking").val()),
					//cpId: $("#cp-function-ranking").val()==null? undefined:parseInt($("#cp-function-ranking").val()),
					//functionParameters:[],
					//functionArguments:[]
				//}
			//}
		};
		/*var table = $("#termsRanking > tbody > tr");
		for(var i=0;i<table.length;i++){
			var select = table[i].cells[1].firstChild.selectedIndex;
			ranking.calculatedArgument['function'].functionParameters.push({
				order:parseInt(table[i].cells[0].firstChild.nodeValue.replace("v",""))+1,
				cpId:parseInt(table[i].cells[1].firstChild.options[select].value)
			});
		}*/
		
		
		var col = "<td data-json='"+JSON.stringify(ranking)+"'></td>";
		var tabRanking = $("#tabRanking > tbody > tr");
		for(var i=0; i < tabRanking.length; i++){
			if(parseInt(tabRanking[i].id) === parseInt($("#indexParRanking").val())){
				if($("#tabRanking > tbody > tr[id="+tabRanking[i].id+"]").children()[2] != undefined){$("#tabRanking > tbody > tr[id="+tabRanking[i].id+"]").children()[2].remove()}; //removendo json desatualizado
				$("#tabRanking > tbody > tr[id="+tabRanking[i].id+"]").append(col);
				$("#tabRanking > tbody > tr[id="+tabRanking[i].id+"]").children()[1].firstChild.className = "btn btn-success";
				$("#tabRanking > tbody > tr[id="+tabRanking[i].id+"]").children()[1].firstChild.innerHTML = "Editar argumento";
			}
		}
		
		//LIMPAR CAMPOS
		cleanField($("#name-par-ranking"), $("#function-value-ranking"), $("#kind-ranking"), $("#value-argument-ranking"), $("#kind-argument-ranking"), $("#cp-argument-ranking"), $("#contract-function-ranking"),$("#cp-function-ranking"),$("#termsRanking > tbody > tr"));
	}else{
		alert("Informe um argumento para o parâmetro!");
	}
}

function updateTerms(table, terms){
	table.find("tbody > tr").remove();
	for(var i=0;i<terms.length;i++){
		table.find("tbody").append("<tr><td>"+terms[i]+"</td><td><select class='form-control'><option value='1'>SMP</option></select></td></tr>");
	}
}

function cleanField(name, functionValue, kind, valueArgument, kindArgument, cpArgument, contractFunction, cpFunction, lineTerms){
	name.val("");
	functionValue.val("");
	kind.val("");
	valueArgument.val("");
	kindArgument.val("");
	cpArgument.val("");
	contractFunction.val("");
	cpFunction.val("");
	lineTerms.remove();
}