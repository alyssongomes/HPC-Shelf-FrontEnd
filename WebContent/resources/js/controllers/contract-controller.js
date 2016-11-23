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
  	//$("#clean").button();
	$("#openComponent").click(function(){
		if($("#nameComp").find("h3").attr("value") == null ){
          	alert("Selecione um Componente!");
      	}else{
			loadComponentAbstract($("#containerDetailsComp").clone(true));
			$("#init").hide();
			$("#main").show("fast");
		}
	});
	
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
  /* FIM BOTÕES */
	
	initListComponents();
	loadCompModal();
}

function loadComponentAbstract(details){
	
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


	var units = $("#unit").find("tr:not(:first)");
	for (var i = 0; i < units.length; i++) {
		var linha = "<tr>"+
			"<td hidden value='"+units[i].childNodes.item(1).getAttribute("value")+"'><h3>"+units[i].childNodes.item(1).getAttribute("value")+"</h3></td>"+
			"<td value='"+units[i].childNodes.item(0).getAttribute("value")+"'><h3>"+units[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			//"<td><input type='file' class='jfilestyle' data-buttonText='Carregar código-fonte'></td>"
		"</tr>";
		$("#tabUniAbs").append(linha);
	}


	var nests = $("#nest").find("tr:not(:first)");
	if(nests.length != 0){
		$("#modalLoadContracts").modal({backdrop: 'static', keyboard: false});
		for (var i = 0; i < nests.length; i++) {
			getListContracts(parseInt(nests[i].childNodes.item(1).getAttribute("value")),function(list){
				var contracts = list;
				var opts = "";
				for (var j = 0; j < contracts.length; j++) {
					opts += "<option class ='ui-selectmenu-button' id='"+contracts[j].ccId+"' value='"+contracts[j].ccName+"'>"+contracts[j].ccName+"</option>";
				}
				var linha = "<tr>"+
					"<td style='width:200' value='"+nests[i].firstChild.getAttribute("value")+"'><h3>"+nests[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
					"<td style='width:50' value='"+nests[i].childNodes.item(1).getAttribute("value")+"'></td>"+
					"<td><select class='form-control' style='width:250'>"+opts+"</select></td>"
				+"</tr>";
				$("#tabCmpAni").append(linha);
				$("#modalLoadContracts").modal('hide');
			});
		}
	}


	var slices = $("#slices").find("tr:not(:first)");
	for (var i = 0; i < slices.length; i++) {
		var linha = "<tr>"+
			"<td value='"+slices[i].childNodes.item(0).getAttribute("value")+"'><h3>"+slices[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td hidden value='"+slices[i].childNodes.item(1).getAttribute("value")+"'><h3>"+slices[i].childNodes.item(1).getAttribute("value")+"</h3></td>"+
			"<td hidden value='"+slices[i].childNodes.item(2).getAttribute("value")+"'><h3>"+slices[i].childNodes.item(2).getAttribute("value")+"</h3></td>"+
		+"</tr>";
		$("#tabSlices").append(linha);
	}


	var qualities = $("#quality").find("tr:not(:first)");
	for (var i = 0; i < qualities.length; i++) {
		var linha = "<tr>"+
			"<td value='"+qualities[i].childNodes.item(0).getAttribute("value")+"'><h3>"+qualities[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td hidden value='"+qualities[i].childNodes.item(1).getAttribute("value")+"'><h3>"+qualities[i].childNodes.item(1).getAttribute("value")+"</h3></td>"+
			"<td hidden value='"+qualities[i].childNodes.item(2).getAttribute("value")+"'><h3>"+qualities[i].childNodes.item(2).getAttribute("value")+"</h3></td>"
		+"</tr>";
		$("#tabQuality").append(linha);
	}


	var costs = $("#cost").find("tr:not(:first)");
	for (var i = 0; i < costs.length; i++) {
		var linha = "<tr>"+
			"<td value='"+costs[i].childNodes.item(0).getAttribute("value")+"'><h3>"+costs[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td hidden hidden value='"+costs[i].childNodes.item(1).getAttribute("value")+"'><h3>"+costs[i].childNodes.item(1).getAttribute("value")+"</h3></td>"+
			"<td hidden value='"+costs[i].childNodes.item(2).getAttribute("value")+"'><h3>"+costs[i].childNodes.item(2).getAttribute("value")+"</h3></td>"
		+"</tr>";
		$("#tabCost").append(linha);
	}

	$(":file").jfilestyle({buttonText: "Carregar código-fonte", inputSize: "350px"});
}

function registerContract() {
	$("#modalSubmit").modal({backdrop: 'static', keyboard: false});
	var form = $("#formulario");
	var main = $("#main");
	var contractObj = {
		name: form.find("#ccNm").find("#ccName").val(),
		arguments: getContextArguments(form.find("#tabParCont")),
		component:getAbstractComponentRegister(main.find("#cmpSelected")),
		platformContract: getPlatform(),
		qualities: null,
		ranking: null,
		costs: null,
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
}

function downloadContract() {
	var form = $("#formulario");
	var main = $("#main");
	var contractObj = {
		name: form.find("#ccNm").find("#ccName").val(),
		arguments: getContextArguments(form.find("#tabParCont")),
		component:getAbstractComponentRegister(main.find("#cmpSelected")),
		platformContract: getPlatform(),
		qualities: null,
		ranking: null,
		costs: null,
		inners: getInnerComponents(form.find("#tabCmpAni"))
	};
	//downloadNewContract(contractObj);
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
	            loadDetaisComp($("#nameComp") ,this.firstChild.text,$("#parar"),$("#nest"),$("#unit"),$("#slices"),$("#quality"),$("#cost"));
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

function loadDetaisComp (viewComp, component, listParar, listNestedComp, listAbsUnit, listSlices, listQualities, listCosts) {
    listParar.find("tr:not(:first)").remove();
    listNestedComp.find("tr:not(:first)").remove();
    listAbsUnit.find("tr:not(:first)").remove();
    listCosts.find("tr:not(:first)").remove();
    listQualities.find("tr:not(:first)").remove();
    listSlices.find("tr:not(:first)").remove();
    
    var cmp = getAbstractComponent(component);
    console.log(cmp);
    
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
	        listParar.append("<tr>"+
	    		"<td id='"+parar[i].cpId+"' value='"+parar[i].name+"'>"+parar[i].name+"</td>"+
	    		"<td><p hidden id='bound' value='"+ccId+"'></p></td>"+
	        	"</tr>");
	    }
    }

    if(nested != null){
	    for (var i = 0; i < nested.length; i++) {
	        listNestedComp.append("<tr>"+
	        	"<td value='"+nested[i].name+"'>"+nested[i].name+"</td><td value='"+nested[i].idAc+"'>"+nested[i].idAc+"</td></tr>");
	    }
    }

    if(unit != null){
	    for (var i = 0; i < unit.length; i++) {
	        listAbsUnit.append("<tr>"+
	          "<td value='"+unit[i].auName+"'>"+unit[i].auName+"</td>"+
	          "<td value='"+unit[i].auId+"'>"+unit[i].auId+"</td>"
	        +"</tr>");
	    }
    }
    
    if(slice != null){
	    for (var i = 0; i < slice.length; i++) {
	        listSlices.append("<tr>"+
	          "<td value='"+slice[i].innerUnityName+"'>"+slice[i].innerUnityName+"</td>"+
	          "<td value='"+slice[i].sliceId+"'>"+slice[i].sliceId+"</td>"+
	          "<td value='"+slice[i].idCmp+"'>"+slice[i].idCmp+"</td>"
	        +"</tr>");
	    }
    }
    
    if(quality != null){
	    for (var i = 0; i < quality.length; i++) {
	        listQualities.append("<tr>"+
	          "<td value='"+quality[i].name+"'>"+quality[i].name+"</td>"+
	          "<td value='"+quality[i].qpId+"'>"+quality[i].qpId+"</td>"+
	          "<td value='"+quality[i].kindId+"'>"+quality[i].kindId+"</td>"
	        +"</tr>");
	    }
    }
    
    if(cost != null){
	    for (var i = 0; i < cost.length; i++) {
	        listCosts.append("<tr>"+
	          "<td value='"+cost[i].name+"'>"+cost[i].name+"</td>"+
	          "<td value='"+cost[i].copId+"'>"+cost[i].copId+"</td>"+
	          "<td value='"+cost[i].kindId+"'>"+cost[i].kindId+"</td>"
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
              "<td value='"+quality[i].qpId+"'>"+quality[i].qpId+"</td>"+
              "<td value='"+quality[i].kindId+"'>"+quality[i].kindId+"</td>"
            +"</tr>");
        };
    }
    
    if(cost != null){
    	for (var i = 0; i < cost.length; i++) {
            listCosts.append("<tr>"+
              "<td value='"+cost[i].name+"'>"+cost[i].name+"</td>"+
              "<td value='"+cost[i].copId+"'>"+cost[i].copId+"</td>"+
              "<td value='"+cost[i].kindId+"'>"+cost[i].kindId+"</td>"
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
		if(list[i].supertype === "Platform"){
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
		});

	}else {
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").find("td:nth(3)").remove();
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").append("<td style='padding-left: 10px;' ><input type='text' style='width:200px;' class='form-control' name='valor' placeholder='Valor'/></td>");
		$("#div-new-contract-platform").find("#parar").find("tr[id="+ind+"]").append("<td style='padding-left: 10px;' ><input type='text' style='width:200px;' class='form-control' name='dataType' placeholder='Tipo de valor'/></td>");
	}
}