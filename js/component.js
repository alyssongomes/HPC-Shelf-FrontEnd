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
		//url:"php/loadComponents.php", 
		url:"php/resposta.xml", 
		async: false,
		dataType: "xml",
		type:"POST",
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
	});
	return listComponents;
}

//retorna uma lista com os parametros de contexto do componente abstrato
function getContextParameters(component){
	var listParameters = new Array();
	$.ajax({ 
		url:"php/details.php?name="+component, 
		async: false,
		dataType: "xml",
		type:"GET",
		success: function(data) {
			listParameters[0] = data.getElementsByTagName("supertype").item(0).getAttribute("name");
        	var contextParameter = data.getElementsByTagName("context_parameter");
            for (var i = 0; i < contextParameter.length; i++) {
              	listParameters[i+1] = contextParameter.item(i).getAttribute("name");
            }
	    }
	});
	return listParameters;

}

function getAbstractsUnits(component){
	var listAbstractsUnits = new Array();
    $.ajax({ 
		url:"php/details.php?name="+component, 
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
        	var abstractsUnits = data.getElementsByTagName("abstract_unit");
            for (var i = 0; i < abstractsUnits.length; i++) {
              	listAbstractsUnits[i] = abstractsUnits.item(i).getAttribute("au_name");
            }
	    }
	});
	return listAbstractsUnits;
}

//retorna uma lista com os components aninhados de um determinado component
function getNestedComponents(component){
	var listNestedComponents = new Array();
    $.ajax({ 
		url:"php/details.php?name="+component, 
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
        	var nestedComponents = data.getElementsByTagName("inner_components");
            for (var i = 0; i < nestedComponents.length; i++) {
              	listNestedComponents[i] = nestedComponents.item(i).getAttribute("name");
            }
	    }
	});
	return listNestedComponents;
}

//salva os parametros de contexto de um determinado componente
function saveNewAbstractComponent(componentObj){
	var context = new Jsonix.Context([contextStorm]);
	var marshaller = context.createMarshaller();
	var doc = marshaller.marshalDocument({
		name:{
			localPart: 'abstract_component'
		},
		value:{
			name: componentObj.name,
			supertype: componentObj.super,
			contextParameter: componentObj.parameters,
			innerComponent: componentObj.inners,
			abstractUnit: componentObj.units
		}
	});

	var oSerializer = new XMLSerializer();
	var sXML = oSerializer.serializeToString(doc);
	alert(sXML);
	/*$.ajax({
	    type: 'post',
	    url : 'writerFile.php',
	    data: 'newComponent='+sXML,
	    success : function(txt){
	        alert("Arquivo escrito!");
	    }
	});*/
}

function parameters(listParameters){
	var parametersObjs = [];
	for (var i = 0; i < listParameters.length; i++) {
		parametersObjs[i] = {
			name: listParameters[i].childNodes[0].getAttribute("value"),
			bound: {
					ccId: parseInt(listParameters[i].childNodes[1].getAttribute("value"))
				}
			}	
	}
	return parametersObjs;
}

function units(listUnits){
	var unistsObjs = [];
	for (var i = 0; i < listUnits.length; i++) {
		unistsObjs[i] = {
			auName: listUnits[i].childNodes[0].getAttribute("value")
		}
	};
	return unistsObjs;
}

function nested(listNested){
	var nestedObjs = [];
	for (var i = 0; i < listNested.length; i++) {
		nestedObjs[i] = {
			name: listNested[i].childNodes[0].getAttribute("value")
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

