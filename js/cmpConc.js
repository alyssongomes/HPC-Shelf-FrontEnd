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
      width: 600,
      modal: true,
      buttons: {
          "Selecionar": function(){
              if($("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value") == null ){
                  alert("Selecione uma Plataforma!");
              }else{
								$("#cmpPlt").find("h3[id=namePlt]").remove();
								$("#cmpPlt").find("#platform").before("<h3 style='color:black;' id='namePlt' value="+$("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value")+">"+$("#containerDetailsComp-plt").find("#nameComp").find("h3").attr("value")+"</h3>");
								dialogPla.dialog( "close" );
							}

          },
          Cancel: function() {
              dialogPla.dialog( "close" );
							//window.history.back();
          }
      }
  });
  /* FIM MODAIS */

  /*INICIO BOTÕES*/
  $("#submet").button();
  $("#clean").button();
	$("#platform").button().click(function() {
		dialogPla.dialog("open");
	});
  /* FIM BOTÕES */

	loadCompModal();
}

function loadComponentAbstract(details){
	$("#cmpSelected").append("<h2 id='name' value='"+details.find("#nameComp").find("p").attr("value")+"'>"+details.find("#nameComp").find("h3").attr("value")+"</h2>");

	var param = $("#parar").find("tr:not(:first)");
	for (var i = 0; i < param.length; i++) {
		var linha = "<tr id='"+i+"'>"+
			"<td value='"+param[i].childNodes.item(0).getAttribute("value")+"'><h3>"+param[i].childNodes.item(0).getAttribute("value")+"</h3></td>"+
			"<td width='250px'><select style='width:250px'><optgroup hidden label='"+i+"'><option optgroup='"+i+"' class ='ui-selectmenu-button' value='cp_id'>Identificador</option><option optgroup='"+i+"' value='contract'>Contrato Contextual</option><option optgroup='"+i+"' value='audi'>Valor</option></optgroup></select></td>"
		+"</tr>";
		$("#tabParCont").append(linha);
		$("#tabParCont").find("tr[id='"+i+"']").find("td:nth(1)").find("select").selectmenu({
			change: function( event, data ) {
				if(data.item.value === 'cp_id'){
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(2)").remove();
					var colum = $("<td/>",{style:"width:250px"});
					var select = $("#listComp-ops").clone(true);
					colum.append(select.css("visibility","visible"));
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").append(colum);

					//select.selectmenu();//.selectmenu("menuWidget");//.addClass("overflow");
				}else if(data.item.value === 'contract'){
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(2)").remove();
					var listContract = getListContracts($("#cmpSelected").find("h2").attr("value"));
					var select = $("<select/>",{id:"listContracts", style:"width:250px"});
					//select.find("option").remove();
					for (var i = 0; i < listContract.length; i++) {
						select.append("<option id='"+listContract[i].ccId+"' value='"+listContract[i].ccName+"'>"+listContract[i].ccName+"</option>");
					}
					var colum = $("<td/>",{style:"width:250px"});
					colum.append(select.css("visibility","visible"));
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").append(colum);

				}else {
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").find("td:nth(2)").remove();
					$("#tabParCont").find("tr[id='"+data.item.optgroup+"']").append("<td><input type='text' name='valor'/></td>");
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
		var linha = "<tr>"+
			"<td value='"+nests[i].firstChild.getAttribute("value")+"'><h3>"+nests[i].childNodes.item(0).getAttribute("value")+"</h3></td>"
			//"<td value='"+param[i].childNodes.item(0).getAttribute("value")+"'><h2>"+param[i].childNodes.item(0).getAttribute("value")+"</h2><td>"
		+"</tr>";
		$("#tabCmpAni").append(linha);
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

// FUNÇÕES PARA CARREGAR INFORMAÇÕES NA INTERFACE
function loadCompModal () {
    var listComponents = getAbstractComponents();
    for(var i=0; i<listComponents.length;i++){
        var li = $("<li/>",{ value:i, class:"ui-state-default" });
        li.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        li.click(function(){
            $("#nameComp > h3").remove();
            $("#nameComp > p").remove();
            $("#nameComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
            $("#nameComp").append("<p value='"+this.firstChild.getAttribute("id")+"'></p>");
            loadDetaisComp($("#nameComp") ,this.firstChild.text,$("#parar"),$("#nest"),$("#unit"),$("#slices"),$("#quality"),$("#cost"));
        });
        $("#listComponents").append(li);

				var opt = $("<option/>",{id:listComponents[i].id, value:listComponents[i].name, text:listComponents[i].name});
				$("#listComp-ops").append(opt);

				if (listComponents[i].super === "Platform") {
					var li = $("<li/>",{ value:i, class:"ui-state-default" });
	        li.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
	        li.click(function(){
	            $("#containerDetailsComp-plt").find("#nameComp > h3").remove();
	            $("#containerDetailsComp-plt").find("#nameComp > p").remove();
	            $("#containerDetailsComp-plt").find("#nameComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
	            $("#containerDetailsComp-plt").find("#nameComp").append("<p value='"+this.firstChild.getAttribute("id")+"'></p>");
	            loadDetaisComp($("#containerDetailsComp-plt").find("#nameComp") ,this.firstChild.text,
									$("#containerDetailsComp-plt").find("#parar"),
									$("#containerDetailsComp-plt").find("#nest"),
									$("#containerDetailsComp-plt").find("#unit"),
									$("#containerDetailsComp-plt").find("#slices"),
									$("#containerDetailsComp-plt").find("#quality"),
									$("#containerDetailsComp-plt").find("#cost"));
	        });
	        $("#containerComp-plt").find("#listComponents").append(li);

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
    var parar = getContextParameters(component);
    var nested = getNestedComponents(component);
    var unit = getAbstractsUnits(component);
    var slice = getSlicesComponent(component);
    var quality = getQualityParameter(component);
    var cost = getCostParameter(component);

    viewComp.append("<p id='idSuper' value='"+parar[1]+"'></p>");

    for (var i = 2; i < parar.length; i++) {
        listParar.append("<tr><td value='"+parar[i]+"'>"+parar[i]+"</td></tr>");
    };

    for (var i = 0; i < nested.length; i++) {
        listNestedComp.append("<tr><td value='"+nested[i]+"'>"+nested[i]+"</td></tr>");
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
