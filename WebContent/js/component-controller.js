var contextStorm = br_ufc_lia_storm;

function getAbstractComponent(component){
	var abstractComponent = null;
	$.ajax({
		url:"/HPC-Shelf-FrontEnd/abstractComponent?action=get&cmp="+component,
		async: false,
		dataType: "xml",
		type:"POST",
		success: function (data) {
			abstractComponent = {
				idAc: data.getElementsByTagName("abstract_component").item(0).getAttribute("id_ac"),
				name: data.getElementsByTagName("abstract_component").item(0).getAttribute("name"),
				supertype:{
					idAc:data.getElementsByTagName("supertype").item(0).getAttribute("id_ac"),
					name: data.getElementsByTagName("supertype").item(0).getAttribute("name")
				},
				contextParameters: getContextParameters(data.getElementsByTagName("context_parameter")),
				innerComponents: getNestedComponents(data.getElementsByTagName("inner_components")),
				abstractUnits: getAbstractsUnits(data.getElementsByTagName("abstract_unit")),
				slices: getSlicesComponent(data.getElementsByTagName("slices")),
				qualityParameters: getQualityParameter(data.getElementsByTagName("quality_parameters")),
				costParameters:getCostParameter(data.getElementsByTagName("cost_parameters"))
			};
			return abstractComponent;
	    }
	});
	return abstractComponent;
}

function getContextParameters(contextParameters){
	var listParameters = new Array();
    for (var i = 0; i < contextParameters.length; i++) {
      	listParameters[i] = {
      		name: contextParameters.item(i).getAttribute("name"),
      		cpId: contextParameters.item(i).getAttribute("cp_id"),
      	};
      	if (contextParameters.item(i).getElementsByTagName("bound").length != 0) {
  			listParameters[i].bound = {
      			ccId: contextParameters.item(i).getElementsByTagName("bound").item(0).getAttribute("cc_id"),
      			ccName: contextParameters.item(i).getElementsByTagName("bound").item(0).getAttribute("cc_name")
      		};
		}
    }
	return listParameters;
}

function getAbstractsUnits(abstractsUnits){
	var listAbstractsUnits = new Array();
    for (var i = 0; i < abstractsUnits.length; i++) {
    	listAbstractsUnits[i] = {
    		name : abstractsUnits.item(i).getAttribute("au_name"),
    		id: abstractsUnits.item(i).getAttribute("au_id")
    	}
    }
	return listAbstractsUnits;
}

function getNestedComponents(nestedComponents){
	var listNestedComponents = new Array();
    for (var i = 0; i < nestedComponents.length; i++) {
      	listNestedComponents[i] = {
      		name: nestedComponents.item(i).getAttribute("name"),
      		id: nestedComponents.item(i).getAttribute("id_ac")
      	};
    }
	return listNestedComponents;
}

function getSlicesComponent(slicesNestedComponents) {
	var listslicesComponents = new Array();
	for (var i = 0; i < slicesNestedComponents.length; i++) {
		listslicesComponents[i] = {
			name: slicesNestedComponents.item(i).getAttribute("name"),
			sliceId: slicesNestedComponents.item(i).getAttribute("slice_id"),
			idCmp: slicesNestedComponents.item(i).getAttribute("inner_component_id")
		};
	}
	return listslicesComponents;
}

function getQualityParameter(qualityComponents) {
	var listQualityComponents = new Array();
	for (var i = 0; i < qualityComponents.length; i++) {
		listQualityComponents[i] = {
			name: qualityComponents.item(i).getAttribute("name"),
			qpId: qualityComponents.item(i).getAttribute("qp_id"),
			kindId: qualityComponents.item(i).getAttribute("kind_id")
		};
	}
	return listQualityComponents;
}

function getCostParameter(costParameters) {
	var listCostParameters = new Array();
	for (var i = 0; i < costParameters.length; i++) {
		listCostParameters[i] = {
			name: costParameters.item(i).getAttribute("name"),
			copId: costParameters.item(i).getAttribute("cop_id"),
			kindId: costParameters.item(i).getAttribute("kind_id")
		};
	}
	return listCostParameters;
}

//Sujeito a exclusão
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
	var sXML = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+oSerializer.serializeToString(doc);
	sXML = sXML.replace("<abstract_component","<abstract_component xmlns=\"http://storm.lia.ufc.br\"");
	alert(sXML);
	$.ajax({
	    type: 'post',
	    async: false,
	    url : '/HPC-Shelf-FrontEnd/abstractComponent?action=save',
	    data: 'cmp='+sXML,
	    dataType: "xml",
	    success : function(result){
	        alert("Resultado: "+result.getElementsByTagName("result").item(0).getAttribute("value"));
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
