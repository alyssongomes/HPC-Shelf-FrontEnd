var contextStorm = br_ufc_lia_storm;

// Cria novo componente abstrato na área de trabalho
function createComponentAbstract(element){
	var component = {
		name: element.name,
		super: element.super,
		id: identifier()
	};
	return component;
}

//Carrega os componentes abstratos do catálogo do CORE para tela
function getAbstractComponents(){
	var listComponents = new Array();
	$.ajax({
		url:"php/mainComponent.php?opcode=loadComponents",
		//url:"php/resposta.xml",
		async: false,
		dataType: "xml",
		type:"GET",
		success: function(data) {
			try{
	        	var components = data.getElementsByTagName("abstract_component");
	            for(var i=0; i<components.length;i++){
	                var component = {
	                	name: components[i].getAttribute("name"),
	                	super: components[i].getAttribute("supertype"),
	                	id: components[i].getAttribute("ac_id")
	                };
	              	listComponents[i] = component;
	            }
        	}catch(error){
        		return false;
        	}
	    }
	}).fail(function() {
		alert("Falhou!");
	});

	return listComponents;
}

//retorna uma lista com os parametros de contexto do componente abstrato
function getContextParameters(component){
	var listParameters = new Array();
	$.ajax({
		//url:"php/details.php?name="+component,
		url:"php/mainComponent.php?opcode=details&name="+component,
		async: false,
		dataType: "xml",
		type:"GET",
		success: function(data) {
			listParameters[0] = data.getElementsByTagName("supertype").item(0).getAttribute("name");
			listParameters[1] = data.getElementsByTagName("supertype").item(0).getAttribute("id_ac");
        	var contextParameter = data.getElementsByTagName("context_parameter");
            for (var i = 0; i < contextParameter.length; i++) {
              	listParameters[i+2] = {
              		name: contextParameter.item(i).getAttribute("name"),
              		cpId: contextParameter.item(i).getAttribute("cp_id"),
              	}
              	if(contextParameter.item(i).getElementsByTagName("bound").length != 0){
              		listParameters[i+2].bound = {
              			ccId: contextParameter.item(i).getElementsByTagName("bound").item(0).getAttribute("cc_id"),
              			ccName: contextParameter.item(i).getElementsByTagName("bound").item(0).getAttribute("cc_name")
              		}
              	}
            }
	    }
	});
	return listParameters;
}

function getAbstractsUnits(component){
	var listAbstractsUnits = new Array();
    $.ajax({
		//url:"php/details.php?name="+component,
		url:"php/mainComponent.php?opcode=details&name="+component,
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
        	var abstractsUnits = data.getElementsByTagName("abstract_unit");
            for (var i = 0; i < abstractsUnits.length; i++) {
            	var unit = {
            		name : abstractsUnits.item(i).getAttribute("au_name"),
            		id: abstractsUnits.item(i).getAttribute("au_id")
            	}
              	listAbstractsUnits[i] = unit;
            }
	    }
	});
	return listAbstractsUnits;
}

//retorna uma lista com os components aninhados de um determinado component
function getNestedComponents(component){
	var listNestedComponents = new Array();
    $.ajax({
		//url:"php/details.php?name="+component,
		url:"php/mainComponent.php?opcode=details&name="+component,
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
        	var nestedComponents = data.getElementsByTagName("inner_components");
            for (var i = 0; i < nestedComponents.length; i++) {
              	listNestedComponents[i] = {
              		name: nestedComponents.item(i).getAttribute("name"),
              		id: nestedComponents.item(i).getAttribute("id_ac")
              	}
            }
	    }
	});
	return listNestedComponents;
}

function getSlicesComponent(component) {
	var listslicesComponents = new Array();
	$.ajax({
	//url:"php/details.php?name="+component,
	url:"php/mainComponent.php?opcode=details&name="+component,
	dataType: "xml",
	async: false,
	type:"GET",
	success: function(data) {
				var slicesNestedComponents = data.getElementsByTagName("slices");
					for (var i = 0; i < slicesNestedComponents.length; i++) {
							listslicesComponents[i] = {
								name: slicesNestedComponents.item(i).getAttribute("name"),
								sliceId: slicesNestedComponents.item(i).getAttribute("slice_id"),
								idCmp: slicesNestedComponents.item(i).getAttribute("inner_component_id")
							};
					}
		}
	});
	return listslicesComponents;
}

function getQualityParameter(component) {
	var listQualityComponents = new Array();
	$.ajax({
		//url:"php/details.php?name="+component,
		url:"php/mainComponent.php?opcode=details&name="+component,
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
					var qualityComponents = data.getElementsByTagName("quality_parameters");
						for (var i = 0; i < qualityComponents.length; i++) {
								listQualityComponents[i] = {
									name: qualityComponents.item(i).getAttribute("name"),
									qpId: qualityComponents.item(i).getAttribute("qp_id"),
									kindId: qualityComponents.item(i).getAttribute("kind_id")
								};
						}
			}
	});
	return listQualityComponents;
}

function getCostParameter(component) {
	var listCostParameters = new Array();
	$.ajax({
		//url:"php/details.php?name="+component,
		url:"php/mainComponent.php?opcode=details&name="+component,
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
					var costParameters = data.getElementsByTagName("cost_parameters");
						for (var i = 0; i < costParameters.length; i++) {
								listCostParameters[i] = {
									name: costParameters.item(i).getAttribute("name"),
									copId: costParameters.item(i).getAttribute("cop_id"),
									kindId: costParameters.item(i).getAttribute("kind_id")
								};
						}
			}
	});
	return listCostParameters;
}

//salva os parametros de contexto de um determinado componente
function saveNewAbstractComponent(componentObj){
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			//namespaceURI: 'http:\/\/storm.lia.ufc.br',
			localPart: 'abstract_component'
		},
		value:{
			name: componentObj.name,
			supertype: componentObj.super,
			contextParameter: componentObj.parameters,
			innerComponent: componentObj.inners,
			abstractUnit: componentObj.units,
			slices: componentObj.slices
		}
	});

	var oSerializer = new XMLSerializer();
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+oSerializer.serializeToString(doc);
	sXML = sXML.replace("<abstract_component","<abstract_component xmlns=\"http://storm.lia.ufc.br\"");
	alert(sXML);
	$.ajax({
	    type: 'post',
	    async: false,
	    url : 'php/mainComponent.php?opcode=saveComponent',
	    data: 'newComponent='+sXML,
	    success : function(result){
	        alert("Arquivo escrito!"+result);
	    }
	});
}

function parameters(listParameters){
	var parametersObjs = [];
	for (var i = 0; i < listParameters.length; i++) {
		parametersObjs[i] = {
			name: listParameters[i].childNodes[0].getAttribute("value"),
			bound: {
					ccId: listParameters[i].firstChild.firstChild.value == ""? null: parseInt(listParameters[i].firstChild.getElementsByTagName("p").item(0).getAttribute("value")),
					ccName: listParameters[i].firstChild.firstChild.value == ""? null: listParameters[i].firstChild.getElementsByTagName("p").item(1).getAttribute("value")
				}
			}
	}
	return parametersObjs;
}

function units(listUnits){
	var unistsObjs = [];
	for (var i = 0; i < listUnits.length; i++) {
		unistsObjs[i] = {
			auName: listUnits[i].firstChild.getAttribute("value")
		}
	};
	return unistsObjs;
}

function slices(list){
	var slices = [];
	for (var j = 0; j < list.length; j++) {
		slices[j] = {
			sliceId: parseInt(list[j].getAttribute("id")),
			innerComponentId: parseInt(list[j].childNodes[1].id)
		}
	};
	return slices;
}

function unitsNested(list){
	var units = [];
	for (var j = 0; j < list.length; j++) {
		units[j] = {
			auName: list[j].getAttribute("value"),
			auId: parseInt(list[j].getAttribute("id"))
		}
	};
	return units;
}

function nested(listNested){
	var nestedObjs = [];
	for (var i = 0; i < listNested.length; i++) {
		nestedObjs[i] = {
			name: listNested[i].childNodes[3].getAttribute("value"),
			supertype: { name:listNested[i].childNodes[4].getAttribute("value"),
						idAc: parseInt(listNested[i].childNodes[5].getAttribute("value"))
					},
			abstractUnit: unitsNested(listNested[i].getElementsByClassName("slices"))
		}
	};
	return nestedObjs;
}

// Funções auxiliares
function identifier(){
	for (var i = 0; true; i++) {
		if(exist(i, $("#sort2 div")) === false){
			return i;
		}
	}
}

function exist(id,list){
	for (var j = 0; j < list.length; j++) {
		if(parseInt(list[j].getAttribute("value")) === id){
			return true;
		}
	}
	return false;
}
