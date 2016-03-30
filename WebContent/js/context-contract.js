$(document).ready(function(){
	init();
});

function init(){
  /* INICIO MODAIS */
  	var dialogComp = $( "#dialog-cmp" ).dialog({
	    autoOpen: false,
	    height: 500,
	    width: 600,
	    modal: true,
	    buttons: {
          	"Selecionar": function(){
              	if($("#nameComp").find("h3").attr("value") == null ){
                  	alert("Selecione um Componente!");
              	}else{
					loadComponentAbstract($("#containerDetailsComp").clone(true));
					dialogComp.dialog( "close" );
				}
          	},
          	Cancel: function() {
              	dialogComp.dialog( "close" );
				//window.history.back();
          	}
    	}
 	});

  	dialogComp.dialog("open");

	var dialogPla = $( "#dialog-plt" ).dialog({
		  autoOpen: false,
		  height: 500,
		  width: 850,
		  modal: true,
		  buttons: {
		      "Selecionar": function(){
		          if($("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value") == null ){
		              alert("Selecione uma Plataforma!");
		          }else{
						/*$("#cmpPlt").find("h3[id=namePlt]").remove();
						$("#cmpPlt").find("p[id=ccId]").remove();
						$("#cmpPlt").find("select").remove();
						$("#cmpPlt").find("br").remove();
						$("#cmpPlt").find("#platform").before("<h3 style='color:black;' id='namePlt' value="+$("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value")+">"+$("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value")+"</h3>");
						$("#cmpPlt").find("#platform").before("<p hidden id='idAc' value="+$("#containerDetailsComp-plt").find("#nameComp").find("p[id=ccId]").attr("value")+"></h3>");
						var select = $("<select>",{style:"width:250px;"});
						var contracts = getListContracts(parseInt($("#containerDetailsComp-plt").find("#nameComp").find("p[id=ccId]").attr("value")));
						for (var i = 0; i < contracts.length; i++) {
							select.append($("<option>",{text:contracts[i].ccName ,value:contracts[i].ccName ,id:contracts[i].ccId}));
						};
						$("#cmpPlt").find("#platform").before(select);
						$("#cmpPlt").find("#platform").before("<br><br>");*/
		        	  	$("#cmpPlt").find("h2[id=name-contract-platform]").remove();
		        	  	var form = $("#containerDetailsComp-plt");
		        		var op = form.find("#select-type").find("option:selected").attr("value");
		        		if(op == "new"){
		        			$("#cmpPlt").find("#platform").before("<h2 id='name-contract-platform'>"+$("#div-new-contract-platform").find("#name-new-contract").val()+"</h2>");
		        		}else{
		        			$("#cmpPlt").find("#platform").before("<h2 id='name-contract-platform'>"+form.find("#opstions-contract").find("option:selected").attr("value")+"</h2>");
		        		}
						dialogPla.dialog( "close" );
					}
		      },
		      Cancel: function() {
		        dialogPla.dialog( "close" );
		      }
		  }
  	});
  /* FIM MODAIS */

  /*INICIO BOTÕES*/
	$("#submet").button().click(function(){
		registerContract();
	});
  	$("#clean").button();
	$("#platform").button().click(function() {
		dialogPla.dialog("open");
	});
  /* FIM BOTÕES */

	loadCompModal();
}

function loadComponentAbstract(details){
	$("#cmpSelected").append("<h2 id='name' value='"+details.find("#nameComp").find("h3").attr("value")+"'>"+details.find("#nameComp").find("h3").attr("value")+"</h2>");
	$("#cmpSelected").append("<p id='idAc' value='"+details.find("#nameComp").find("p[id=idAc]").attr("value")+"'></p>");
	$("#cmpSelected").append("<p id='idAcSuper' value='"+details.find("#nameComp").find("p[id=idSuper]").attr("value")+"'></p>");

	var param = $("#parar").find("tr:not(:first)");
	for (var i = 0; i < param.length; i++) {
		var linha = "<tr id='"+i+"'>"+
			"<td id='"+param[i].childNodes.item(0).getAttribute("id")+"' value='"+param[i].childNodes.item(0).getAttribute("value")+"'><h3>"+param[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td width='250px'><select id='"+param[i].childNodes.item(0).getAttribute("id")+"' style='width:250px'><optgroup hidden label='"+i+"'><option optgroup='"+i+"' class ='ui-selectmenu-button' value='cp_id'>Identificador</option><option optgroup='"+i+"' value='contract'>Contrato Contextual</option><option optgroup='"+i+"' value='audi'>Valor</option></optgroup></select></td>"+
			"<td><p hidden id='bound' value='"+param[i].childNodes.item(1).childNodes.item(0).getAttribute("value")+"'></td>"+
		+"</tr>";
		$("#tabParCont").append(linha);
		$("#tabParCont").find("tr[id='"+i+"']").find("td:nth(1)").find("select").selectmenu({
			change: function( event, data ) {
				if(data.item.value === 'cp_id'){
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					var colum = $("<td/>",{style:"width:250px"});
					var select = $("#listComp-ops").clone(true);
					colum.append(select.css("visibility","visible"));
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").append(colum);

					//select.selectmenu();//.selectmenu("menuWidget");//.addClass("overflow");
				}else if(data.item.value === 'contract'){
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					var listContract = getListContracts(this.getAttribute("id"));
					var select = $("<select/>",{id:"listContracts", style:"width:250px"});
					//select.find("option").remove();
					for (var i = 0; i < listContract.length; i++) {
						select.append("<option id='"+listContract[i].ccId+"' value='"+listContract[i].ccName+"'>"+listContract[i].ccName+"</option>");
					}
					var colum = $("<td/>",{style:"width:250px"});
					colum.append(select.css("visibility","visible"));
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").append(colum);

				}else {
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").append("<td><input type='text' name='valor' value='Valor'/></td>");
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").append("<td><input type='text' name='dataType' value='Tipo de valor'/></td>");
				}
			}
		});
	}


	var units = $("#unit").find("tr:not(:first)");
	for (var i = 0; i < units.length; i++) {
		var linha = "<tr>"+
			"<td hidden value='"+units[i].childNodes.item(1).getAttribute("value")+"'><h3>"+units[i].childNodes.item(1).getAttribute("value")+"</h3></td>"+
			"<td value='"+units[i].childNodes.item(0).getAttribute("value")+"'><h3>"+units[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td><input type='file' class='jfilestyle' data-buttonText='Carregar código-fonte'></td>"
		+"</tr>";
		$("#tabUniAbs").append(linha);
	}


	var nests = $("#nest").find("tr:not(:first)");
	for (var i = 0; i < nests.length; i++) {
		var contracts = getListContracts(parseInt(nests[i].childNodes.item(1).getAttribute("value")));
		var opts = "";
		for (var j = 0; j < contracts.length; j++) {
			opts += "<option class ='ui-selectmenu-button' id='"+contracts[j].ccId+"' value='"+contracts[j].ccName+"'>"+contracts[j].ccName+"</option>";
		}
		var linha = "<tr>"+
			"<td style='width:200' value='"+nests[i].firstChild.getAttribute("value")+"'><h3>"+nests[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td style='width:50' value='"+nests[i].childNodes.item(1).getAttribute("value")+"'></td>"+
			"<td><select style='width:250'>"+opts+"</select></td>"
			//"<td value='"+param[i].childNodes.item(0).getAttribute("value")+"'><h2>"+param[i].childNodes.item(0).getAttribute("value")+"</h2><td>"
		+"</tr>";
		$("#tabCmpAni").append(linha);
		$("#tabCmpAni").find("select").selectmenu();
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
	var form = $("#formulario");
	var contractObj = {
		name: form.find("#ccNm").find("#ccName").val(),
		arguments: getContextArguments(form.find("#tabParCont")),
		component:getAbstractComponentRegister(form.find("#cmpSelected")),
		platform: getPlatform(),
		qualities: null,
		ranking: null,
		costs: null,
		inners: getInnerComponents(form.find("#tabCmpAni"))
	};
	console.log(contractObj);
	saveNewContract(contractObj);
}

// GETS
function getPlatform(){
	var platform = null;
	var form = $("#containerDetailsComp-plt");
	var op = form.find("#select-type").find("option:selected").attr("value");
	if(op == "select"){
		platform = {
			ccName: form.find("#opstions-contract").find("option:selected").attr("value"),
			ccId: parseInt(form.find("#opstions-contract").find("option:selected").attr("id"))
		};
	}else{
		platform = {
			ccName: $("#div-new-contract-platform").find("#name-new-contract").val(),
			contextArguments: getContextArgumentsPlatform(),
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
	}
	
	return platform;
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
	var listLinkComponentsPlatform = $("#containerComp-plt").find("#listComponents").find("li");
	
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
		        $("#select-type").selectmenu({change: function(event, data) {
		        	if(data.item.value === 'select'){
		        		$("#div-select-contract > br").remove();
		        		$("#div-select-contract > select").remove();
		        		
		        		var select = $("<select>",{id:"opstions-contract",style:"width:250px;"});
						var contracts = getListContracts($("#containerDetailsComp-plt").find("#nameComp").find("p[id=ccId]").attr("value"));
						for (var i = 0; i < contracts.length; i++) {
							select.append($("<option>",{text:contracts[i].ccName ,value:contracts[i].ccName ,id:contracts[i].ccId}));
						};
						
						$("#div-select-contract").append("<br><br>");
						$("#div-select-contract").append(select);
						$("#div-new-contract-platform").css("visibility","hidden");
		        	}else{
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
		        }});
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
    
    var parar = cmp.contextParameters; 
    var nested = cmp.innerComponents;
    var unit = cmp.abstractUnits;
	var slice = cmp.slices;
    var quality = cmp.qualityParameters;
    var cost = cmp.costParameters;

    viewComp.append("<p id='idSuper' value='"+cmp.supertype.idAc+"'></p>");

    for (var i = 0; i < parar.length; i++) {
    	var ccId = parar[i].bound == null ? "": parar[i].bound.ccId;
        listParar.append("<tr>"+
    		"<td id='"+parar[i].cpId+"' value='"+parar[i].name+"'>"+parar[i].name+"</td>"+
    		"<td><p hidden id='bound' value='"+ccId+"'></p></td>"+
        	"</tr>");
    };

    for (var i = 0; i < nested.length; i++) {
        listNestedComp.append("<tr>"+
        	"<td value='"+nested[i].name+"'>"+nested[i].name+"</td><td value='"+nested[i].id+"'>"+nested[i].id+"</td></tr>");
    };

    for (var i = 0; i < unit.length; i++) {
        listAbsUnit.append("<tr>"+
          "<td value='"+unit[i].name+"'>"+unit[i].name+"</td>"+
          "<td value='"+unit[i].id+"'>"+unit[i].id+"</td>"
        +"</tr>");
    };

    for (var i = 0; i < slice.length; i++) {
        listSlices.append("<tr>"+
          "<td value='"+slice[i].name+"'>"+slice[i].name+"</td>"+
          "<td value='"+slice[i].sliceId+"'>"+slice[i].sliceId+"</td>"+
          "<td value='"+slice[i].idCmp+"'>"+slice[i].idCmp+"</td>"
        +"</tr>");
    };

    for (var i = 0; i < quality.length; i++) {
        listQualities.append("<tr>"+
          "<td value='"+quality[i].name+"'>"+quality[i].name+"</td>"+
          "<td value='"+quality[i].qpId+"'>"+quality[i].qpId+"</td>"+
          "<td value='"+quality[i].kindId+"'>"+quality[i].kindId+"</td>"
        +"</tr>");
    };

    for (var i = 0; i < cost.length; i++) {
        listCosts.append("<tr>"+
          "<td value='"+cost[i].name+"'>"+cost[i].name+"</td>"+
          "<td value='"+cost[i].copId+"'>"+cost[i].copId+"</td>"+
          "<td value='"+cost[i].kindId+"'>"+cost[i].kindId+"</td>"
        +"</tr>");
    };
}

function loadDetaisCompPlatform (viewComp, component, listParar, listNestedComp, listAbsUnit, listSlices, listQualities, listCosts) {
    listParar.find("tr:not(:first)").remove();
    listNestedComp.find("tr:not(:first)").remove();
    listAbsUnit.find("tr:not(:first)").remove();
    listCosts.find("tr:not(:first)").remove();
    listQualities.find("tr:not(:first)").remove();
    listSlices.find("tr:not(:first)").remove();
    
    var cmp = getAbstractComponent(component);
    
    var parar = cmp.contextParameters; 
    var nested = cmp.innerComponents;
    var unit = cmp.abstractUnits;
	var slice = cmp.slices;
    var quality = cmp.qualityParameters;
    var cost = cmp.costParameters;

    viewComp.append("<p id='idSuper' value='"+cmp.supertype.idAc+"'></p>");

    for (var i = 0; i < parar.length; i++) {
    	var ccId = parar[i].bound == null ? "": parar[i].bound.ccId;
        listParar.append("<tr id="+i+">"+
    		"<td id='"+parar[i].cpId+"' value='"+parar[i].name+"'>"+parar[i].name+"</td>"+
    		"<td><p hidden id='bound' value='"+ccId+"'></p></td>"+
    		"<td width='200px'><select id='"+parar[i].cpId+"' style='width:200px'><optgroup  label='"+i+"'><option optgroup='"+i+"' value='cp_id'>Identificador</option><option optgroup='"+i+"' value='contract'>Contrato Contextual</option><option optgroup='"+i+"' value='audi'>Valor</option></optgroup></select></td>"+    		
        	"</tr>");
        
        listParar.find("tr[id='"+i+"']").find("td:nth(2)").find("select").selectmenu({change: function(event, data) {
	        	if(data.item.value === 'cp_id'){
					listParar.find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					listParar.find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					var colum = $("<td/>",{style:"width:200px"});
					var select = $("#listComp-ops").clone(true);
					colum.append(select.css("visibility","visible"));
					listParar.find("tr[id='"+data.item.optgroup+"']").append(colum);
		
				}else if(data.item.value === 'contract'){
					listParar.find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					listParar.find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					var listContract = getListContracts(cmp.idAc);
					var select = $("<select/>",{id:"listContracts", style:"width:200px"});
					//select.find("option").remove();
					for (var i = 0; i < listContract.length; i++) {
						select.append("<option id='"+listContract[i].ccId+"' value='"+listContract[i].ccName+"'>"+listContract[i].ccName+"</option>");
					}
					var colum = $("<td/>",{style:"width:250px"});
					colum.append(select.css("visibility","visible"));
					listParar.find("tr[id='"+data.item.optgroup+"']").append(colum);
		
				}else {
					listParar.find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					listParar.find("tr[id='"+data.item.optgroup+"']").find("td:nth(3)").remove();
					listParar.find("tr[id='"+data.item.optgroup+"']").append("<td><input type='text' name='valor' value='Valor'/></td>");
					listParar.find("tr[id='"+data.item.optgroup+"']").append("<td><input type='text' name='dataType' value='Tipo de valor'/></td>");
				}
			}
        });
   
    };

    for (var i = 0; i < nested.length; i++) {
        listNestedComp.append("<tr>"+
        	"<td value='"+nested[i].name+"'>"+nested[i].name+"</td><td value='"+nested[i].id+"'>"+nested[i].id+"</td></tr>");
    };

    for (var i = 0; i < unit.length; i++) {
        listAbsUnit.append("<tr>"+
          "<td value='"+unit[i].name+"'>"+unit[i].name+"</td>"+
          "<td value='"+unit[i].id+"'>"+unit[i].id+"</td>"
        +"</tr>");
    };

    for (var i = 0; i < slice.length; i++) {
        listSlices.append("<tr>"+
          "<td value='"+slice[i].name+"'>"+slice[i].name+"</td>"+
          "<td value='"+slice[i].sliceId+"'>"+slice[i].sliceId+"</td>"+
          "<td value='"+slice[i].idCmp+"'>"+slice[i].idCmp+"</td>"
        +"</tr>");
    };

    for (var i = 0; i < quality.length; i++) {
        listQualities.append("<tr>"+
          "<td value='"+quality[i].name+"'>"+quality[i].name+"</td>"+
          "<td value='"+quality[i].qpId+"'>"+quality[i].qpId+"</td>"+
          "<td value='"+quality[i].kindId+"'>"+quality[i].kindId+"</td>"
        +"</tr>");
    };

    for (var i = 0; i < cost.length; i++) {
        listCosts.append("<tr>"+
          "<td value='"+cost[i].name+"'>"+cost[i].name+"</td>"+
          "<td value='"+cost[i].copId+"'>"+cost[i].copId+"</td>"+
          "<td value='"+cost[i].kindId+"'>"+cost[i].kindId+"</td>"
        +"</tr>");
    };
}


function dialogModel(dialog) {
	var dialogCmp = dialog.clone(true).dialog({
      autoOpen: false,
      height: 500,
      width: 600,
      modal: true,
  });
	return dialogCmp;
}