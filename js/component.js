var listComponents = new Array();
var listParameters = new Array();
var listNestedComponents = new Array();

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
	$.ajax({ 
		//url:"php/loadComponents.php", 
		url:"php/resposta.xml", 
		async: false,
		dataType: "xml",
		type:"POST",
		success: function(data) {
        	var components = data.getElementsByTagName("abstract_component");
            for(var i=0; i<components.length;i++){
                var component = { 
                	name: components[i].getAttribute("name"),
                	super: components[i].getAttribute("supertype"),
                	id: components[i].getAttribute("ac_id") 
                };
              	listComponents[i] = component;
            }
	    }
	});
	return listComponents;
}

//retorna uma lista com os parametros de contexto do componente abstrato
function getContextParameters(component){
	$.ajax({ 
		url:"php/details.php?name="+component, 
		async: false,
		dataType: "xml",
		type:"GET",
		success: function(data) {
        	var contextParameter = data.getElementsByTagName("context_parameter");
            for (var i = 0; i < contextParameter.length; i++) {
              	listParameters[i] = contextParameter.item(i).getAttribute("name");
            }
	    }
	});
	return listParameters;

}

//retorna uma lista com os components aninhados de um determinado component
function getNestedComponents(component){
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
function saveNewAbstractComponent(component){}


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


function mostra() {
	var a2 =  getAbstractComponents();
	for (var i = 0; i < a2.length; i++) {
		$("#lista").append($("<li/>",{text:a2[i].name}));
	}
	return false;
}
/*
function par () {
	var a3 =  getContextParameters($("#nome").val());
	for (var i = 0; i < a3.length; i++) {
		$("#listaP").append($("<li/>",{text:a3[i]}));
	}
	return false;
}

function nes () {
	var a4 =  getNestedComponents($("#nome").val());
	for (var i = 0; i < a4.length; i++) {
		$("#listaC").append($("<li/>",{text:a4[i]}));
	}
	return false;
}*/