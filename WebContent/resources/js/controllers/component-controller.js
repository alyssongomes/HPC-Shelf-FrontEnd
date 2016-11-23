var ELEMENT = null;
var newComp = false;
var jsplumb = null;

$(document).ready(function(){
	init();
});

//Inicializar componentes da página
function init() {
	
    jsplumb = jsPlumb.getInstance();

    jsPlumb.batch(function(){
        jsPlumb.bind("connection",function(info,originalEvent){
            updateSlicesNested(info, false);
        });

        jsPlumb.bind("connectionDetached",function(info,originalEvent){
            updateSlicesNested(info, true);
        });
    });

    $("#trash").droppable({
        drop: function( event, ui ) {
          deleteElement( ui.draggable, jsplumb );
        }
    });


    /* MENU POP-UP */
    document.addEventListener("click",
        function () {
            document.getElementById("divMenu").style.visibility = "hidden";
        }
    );

    $("#divMenu > ul > li:nth-child(1)").click(
        function () {
            addUnits($("#sort2 div[id='"+ELEMENT+"']"),jsplumb);
        }
    );

    $("#divMenu > ul > li:nth-child(2)").click(
        function () {
            $("#modalParamComp").modal();
        }
    );
    
    $("#divMenu > ul > li:nth-child(3)").click(
        function () {
            //$("#modalParamComp").modal();
        	alert("ADD parâmetros de qualidade");
        }
    );
    
    $("#divMenu > ul > li:nth-child(4)").click(
        function () {
            //$("#modalParamComp").modal();
            alert("ADD parâmetros de custo");
        }
    );

    $("#divMenu > ul > li:nth-child(5)").click(
        function () {
        	$("#modalNestedComp").modal();
        	
        }
    );
    /* FIM MENU POP-UP*/



    /*INICIO BOTÕES*/
    $("#cancelComponent").button().click(function(){
        $("#nameComponent").val("");
        $("#nameSuperType > h3").remove();
        $("#addsUnidades").find("tr:not(:first-child)").remove();
        $("#listParameters").find("tr:not(:first-child)").remove();
        $("#addsComponents").find("tr:not(:first-child)").remove();
    });
    
    $("#submitComponent").click(function(){
        addNewAbstractComponent();
    });
    
    $("#saveComponent").click(function(){
    	$("#navEditCmp").hide();
    	$("#navNewCmp").hide();
		$("#init").hide();
		$("#quadro1").show("fast");
		$("#quadro2").show("fast");
        createNewComponent($("#nameComponent").val(),$("#nameSuperComp > h3").attr("value"));
        $("#newComp").append("<p id='name' hidden value='"+$("#nameComponent").val()+"'></p>");
        $("#newComp").append("<p id='super' hidden value='"+$("#nameSuperComp > h3").attr("value")+"'></p>");
        $("#newComp").append("<p id='idSuper' hidden value='"+$("#nameSuperComp > p").attr("value")+"'></p>");
        $("#nameComponent").val("");
        $("#nameSuperType > h3").remove();
        newComp = true;
        $("#saveUpdate").css("visibility","hidden");
        
    });
    
    $("#saveSuperComp").click(function() {
    	$("#nameSuperType > h3").remove();
        $("#nameSuperType > p").remove();
        $("#nameSuperType").append("<h3 value='"+$("#nameSuperComp > h3").attr("value")+"'>"+$("#nameSuperComp > h3").attr("value")+"</h3>");
        $("#nameSuperType").append("<p hidden value='"+$("#nameSuperComp > p").attr("value")+"'></p>");
	});
    
    $("#saveNestedComp").click(function() {
    	addComponentNested($("#sort2 div[id='"+ELEMENT+"']"),jsplumb, $("#nameNestedComp > h3").attr("value"), $("#nameNestedComp > p").attr("value"), $("#nameNestedComp > p").attr("id"), $("#nameNestedComp").find("p[id='idSuper']").attr("value") );
	});
	
	$("#saveParamComp").click(function() {
		addParameter($("#sort2 div[id='"+ELEMENT+"']"),jsplumb);
	});
    
    $("#openEditComp").click(function(){
    	$("#unitEditComp").find("input").each(function(){
    		$(this).prop("checked",true);
    		$(this).attr("checked","checked");
    	});
    	$("#navEditCmp").hide();
    	$("#navNewCmp").hide();
    	$("#divMenu > ul > li:last-child").remove();
    	$("#submitComponent").css("visibility","hidden");
    	openComponent();
    });
    
    $("#opcaoLimite").click(function(){
    	var op = $("#opcaoLimite").find("option:selected").attr("value");
    	if(op === "contract"){
    		alert("Selecione um componente!");
    		$("#boundValue").css("visibility","hidden");
    		$("#bound").show("fast");
    	}else{
    		$("#bound").hide();
    		$("#boundValue").css("visibility","visible");
    	}
    });
    
    $("#saveUpdate").click(function(){
    	componentUpdate = {
			name:  $("div[id="+ELEMENT+"]").find("p[id=name]").attr("value"),
			idAc:  $("div[id="+ELEMENT+"]").find("p[id=idAc]").attr("value"),
	        super: { name: $("div[id="+ELEMENT+"]").find("p[id=supertype]").attr("value"), idAc: parseInt($("div[id="+ELEMENT+"]").find("p[id=idSuper]").attr("value"))  },
	        parameters: getContextParameters(),
	        units: getAbstractsUnits()
    	}
    	console.log(componentUpdate);
    });
    
    
    
    /*FIM BOTÕES*/
    
    initListComponents();
    loadCompModal();
}

// FUNÇÕES PARA MANINPULAÇÃO DOS ELEMENTOS NA TELA
function openComponent() {
	//var component = getAbstractComponent($("#nameEditComp > h3").attr("value"));
	var component = {
		name:"Teste",
		idAc : 777,
		supertype: {name:"Superteste",idAc:999},
		contextParameter:[
		  {name:"par-1"},
		  {name:"par-2"},
		  {name:"par-3"}
		],
		abstractUnit:[
		  {auName:"unid-1"},
		  {auName:"unid-2"},
		  {auName:"unid-3"}
		],
		innerComponents:[
		  {name:"inner-1",acId: 1,supertype:{name:"super-inner-1"}},
		  {name:"inner-2",acId: 2,supertype:{name:"super-inner-2"}},
		  {name:"inner-3",acId: 3,supertype:{name:"super-inner-3"}},
		  {name:"inner-4",acId: 4,supertype:{name:"super-inner-1"}},
		  {name:"inner-5",acId: 5,supertype:{name:"super-inner-2"}},
		  {name:"inner-6",acId: 6,supertype:{name:"super-inner-3"}}
		],
		slices:[
		  {sliceId:1,innerUnityName:"slice-1",innerComponentName:"inner-1"},
		  {sliceId:2,innerUnityName:"slice-2",innerComponentName:"inner-2"},
		  {sliceId:3,innerUnityName:"slice-3",innerComponentName:"inner-3"},
		  {sliceId:4,innerUnityName:"slice-4",innerComponentName:"inner-3"},
		  {sliceId:5,innerUnityName:"slice-5",innerComponentName:"inner-2"},
		  {sliceId:6,innerUnityName:"slice-6",innerComponentName:"inner-1"},
		  {sliceId:7,innerUnityName:"slice-7",innerComponentName:"inner-4"},
		  {sliceId:8,innerUnityName:"slice-8",innerComponentName:"inner-4"},
		  {sliceId:9,innerUnityName:"slice-9",innerComponentName:"inner-5"},
		  {sliceId:10,innerUnityName:"slice-10",innerComponentName:"inner-6"}
		]
	};
	
	createNewComponent(component.name, component.supertype.name);
	$("div[id="+component.name+"]").append("<p id= 'idAc' hidden value='"+component.idAc+"'></p>");
	$("div[id="+component.name+"]").append("<p id= 'idSuper' hidden value='"+component.supertype.idAc+"'></p>");
	
	
	ELEMENT = component.name;
	var element = $("#sort2 > div[id="+ELEMENT+"]");
	console.log(element);
	
	$("#init").hide();
	$("#modalEditeComp").hide();
	$("#quadro1").show("fast");
	$("#quadro2").show("fast");
	
	
	if(component.contextParameter != null){
		var tabParam = $("#listParameters");
		for(var i=0; i < component.contextParameter.length; i++){
			var linha  = $("<tr/>",{id: i});
		    var coluna1 = $("<td/>",{id:0,text:component.contextParameter[i].name, colspan:3 ,style:"width: 70px;", width: 150})
			linha.append(coluna1);
			tabParam.append(linha);
		}
	}
	
	if(component.abstractUnit != null){
		 var tabUnit = $("#addsUnidades");
		 for(var i=0; i < component.abstractUnit.length; i++){
			 var linha = $("<tr/>",{id:i});
			 linha.append($("<td/>",{text:component.abstractUnit[i].auName, style:"width:200px"}));
			 linha.append($("<td/>",{text: "Unit "+i, colspan:2, style:"width:80px"}));
			 tabUnit.append(linha);
			 
			 var div = $("<div/>",{value:'units', class:'unit'});
			 var nameUni = $("<h4/>",{style:"width:50px;", text:"Unit "+i});
			 div.append(nameUni);
			 element.append(div);
		}
	}
	
	if(component.innerComponents != null){
		var tableCompNested = $("#addsComponents");
		for(var i = 0; i < component.innerComponents.length; i++){
			var div = $("<div/>",{ id: i, class:"componentNested"});
			var localY = parseInt(element.offset().top);
	        var localX = parseInt(element.offset().left);
	        div.css("top",(localY+150)+"px").css("left",(localX+20)+"px");
			div.append($("<h3/>",{ text: component.innerComponents[i].name, align:"center", style:"color: white;"}));
			div.append($("<h5/>",{ text: ""+component.innerComponents[i].supertype.name+"", align:"center", style:"color:white;" }));
			$("#sort2").append(div);
	        $("#sort2 > div:not(#trash)").draggable({ cursor:"move"});
	        
	        var line = $("<tr/>", {id: i});
	        line.append($("<td/>",{text: component.innerComponents[i].name, style:"width:150px"}));
	        line.append($("<td/>",{text: component.innerComponents[i].supertype.name, colspan:3,style:"width:100px"}));
	        tableCompNested.append(line);
	        
	        var endpoint = {
	            endpoint : "Rectangle" ,
	            endpointStyle:{width:40,height: 20,fillStyle:'#008B8B'},
	            connector:"StateMachine",
	            isTarget : true,
	            anchor: "Continuous"
        	}
	        
	        for(var j = 0; j < component.slices.length; j++){
	        	if(component.innerComponents[i].name === component.slices[j].innerComponentName){
	        		
	        		jsPlumb.connect({
	        		    source:div,
	        		    target:element,
	        		    endpoint : "Rectangle" ,
			            endpointStyle:{width:40,height: 20,fillStyle:'#008B8B'},
			            connector:"StateMachine",
			            anchor: "Continuous",
			            deleteEndpointsOnDetach : false,
			            reattach:true,
			            overlays: [
			                [ "Label", { location:0.10, length:80, label: component.slices[j].innerUnityName, cssClass: "endPointPar" } ]
			            ],
			            parameters:{
			                "nameSlice": component.slices[j].innerUnityName,
			                "idSlice": component.slices[j].sliceId,
			                "component": component.innerComponents[i].name,
			                "idComponent": component.innerComponents[i].acId
			            	}
	        		});
	        		jsPlumb.draggable(div);
	        	}
	        	jsPlumb.repaintEverything();
	        }
		}
	}
}

function createNewComponent(name, supertype){
    var div = $("<div/>",{ id: name, class:"component", oncontextmenu:"showMenu('"+name+"'); return false;"});
    div.css("top","200px");
    div.append($("<h3/>",{ text: name, align:"center"}));
    div.append("<p id= 'name' hidden value='"+name+"'></p>");
    div.append("<p id= 'supertype' hidden value='"+supertype+"'></p>");
    div.append($("<h5/>",{ text: ""+supertype+"", align:"center"}));
    $("#sort2").append(div);
    $("#sort2 > div:not(#trash)").draggable({ cursor:"move"});
    jsPlumb.makeTarget(div,{
        isTarget: true,
        endpoint:"Rectangle",
        endpointStyle:{width:40,height: 20,fillStyle:'#008B8B'},
        anchor: "Continuous"
    });
    jsPlumb.draggable(div);
}

function addUnits(element, js){
    var unidade = prompt("Nome da Unidade Abstrata:","Unidade");

    if(unidade != null){
        var idUnit = identifier($("#addsUnidades").find("tr"));

        var div = $("<div/>",{value:'units', class:'unit', id: idUnit});
        var number = $("#addsUnidades").find("tr").length;
        var nameUni = $("<h4/>",{value: unidade, style:"width:50px;", text:"Unit "+number});
        div.append(nameUni);
        element.append(div);

        //Adicionar na tabela
        var linha = $("<tr/>",{id:idUnit});
        linha.append($("<td/>",{text:unidade, value:unidade,style:"width:200px"}));
        linha.append($("<td/>",{text: "Unit "+number, style:"width:80px"}));
        var lineDelete = $("<td/>");
        lineDelete.append($("<span/>",{class:"label label-danger", text:"DEL", style:"cursor:Pointer;"}))
        lineDelete.click(function(){
            $("#addsUnidades").find("tr[id="+idUnit+"]").remove();
            element.find("div[id="+idUnit+"]").remove();
        });
        linha.append(lineDelete);
        $("#addsUnidades").append(linha);
    }
}

function addParameter(element, js){

    var idPar = identifier($("#listParameters").find("tr"));
    var tabParam = $("#listParameters");
    var tam = tabParam.find("tr").length;

    var linha  = $("<tr/>",{id: idPar});
    var coluna1 = $("<td/>",{id:0,text: $("input[id=namePar]").val(),value:$("input[id=namePar]").val(), style:"width: 70px;", width: 150})
        .append("<p hidden value='"+$("#bound").find("select").find("option:selected").attr("id")+"'></p>")
        .append("<p hidden value='"+$("#bound").find("select").find("option:selected").attr("value")+"'></p>")
        .append("<p hidden value='"+$("#boundValue").val()+"'></p>");
    var coluna2 = $("<td/>",{id:0, text: $("#variavel").val() == ""? "Local":"Compar.", title:$("#variavel").val(), value: $("#bound").val(),style:"color: blue;", width: 70 });
    var lineDelete = $("<td/>");
    lineDelete.append($("<span/>",{class:"label label-danger", text:"DEL", style:"cursor:Pointer;"}))
    lineDelete.click(function(){
        $("#listParameters").find("tr[id="+idPar+"]").remove();
        jsPlumb.deleteEndpoint(ep);
    })
    linha.append(coluna1);
    linha.append(coluna2);
    linha.append(lineDelete);
    tabParam.append(linha);
    $("#variavel").val("");
    $("#bound > h3").remove();
    $("#bound > select").remove();
    $("#containerDetailPar").find("input[id=name]").val("");
}

function addComponentNested(element, js, name, supertype, id, idSuper){

    var slices = $("#unitNestedComp").find("input:checked");
    if(slices.length == 0){
        alert("Nenhuma unidade foi selecionada");
    }else{
        var div = $("<div/>",{ id: id, class:"componentNested"});
        var localY = parseInt(element.offset().top);
        var localX = parseInt(element.offset().left);
        div.css("top",(localY+150)+"px").css("left",(localX+20)+"px");
        div.append($("<h3/>",{ text: name, align:"center", style:"color: white;"}));
        div.append("<p id= 'name' hidden value='"+name+"'></p>");
        div.append("<p id= 'supertype' hidden value='"+supertype+"'></p>");
        div.append($("<h5/>",{ text: ""+supertype+"", align:"center", style:"color:white;" }));
        $("#sort2").append(div);
        $("#sort2 > div:not(#trash)").draggable({ cursor:"move"});

        var tableCompNested = $("#addsComponents");
        var line = $("<tr/>", {id: id});
        line.append($("<td/>",{text: name, style:"width:150px"}));
        line.append($("<td/>",{text: supertype, style:"width:100px"}));
        var lineDelete = $("<td/>");
        lineDelete.append($("<span/>",{class:"label label-danger", text:"DEL", style:"cursor:Pointer;"}))
        lineDelete.click(function(){
            jsPlumb.remove($("#autoScroll2").find("div[id='"+id+"']"));

            $("#autoScroll2").find("div[id='"+id+"']").remove();
            $("#addsComponents").find("tr[id='"+id+"']").remove();
        });
        line.append(lineDelete);

        line.append("<p hidden id='name' value='"+name+"'></p>");
        line.append("<p hidden id='supertype' value='"+supertype+"'></p>");
        line.append("<p hidden id='idSuper' value='"+idSuper+"'></p>");
        line.append("<p hidden id='id' value="+id+"></p>");
        tableCompNested.append(line);

        addSlice(element, div, slices,js);

    }
}

function addSlice(elementTarget, elementSource, slices, js){
	
	var jsplumb = jsPlumb.getInstance();
	
    for (var i = 0; i < slices.length; i++) {
        var slice = { name:slices[i].getAttribute("value"), id:slices[i].getAttribute("id") };
            jsPlumb.addEndpoint ( elementSource, {
		            endpoint : "Rectangle" ,
		            endpointStyle:{width:40,height: 20,fillStyle:'#008B8B'},
		            connector:"StateMachine",
		            isSource : true,
		            anchor: "Continuous",
		            overlays: [
		                [ "Label", { location: [0.5, -0.5], label: slice.name, cssClass: "endPointPar" } ]
		            ],
		            parameters:{
		                "nameSlice": slice.name,
		                "idSlice": slice.id,
		                "component": elementSource.find("p[id='name']").attr("value"),
		                "idComponent": elementSource.attr("id")
		            }
	        	}
            );
        jsPlumb.draggable(elementSource);
    };
    jsPlumb.repaintEverything();

}

function updateSlicesNested(conn, remove){
    if(remove){
        $("#listSlices").find("tr[id='"+conn.connection.getParameter("idSlice")+"']").remove();
    }else{
        var tableSlices = $("#listSlices");
        var nameSlice = conn.connection.getParameter("nameSlice");
        var compSlice = conn.connection.getParameter("component");
        var line = $("<tr/>", {id: conn.connection.getParameter("idSlice")});
        line.append($("<td/>",{value:nameSlice, text:nameSlice, style:"width: 150px;"}));
        line.append($("<td/>",{ id: conn.connection.getParameter("idComponent"), value: compSlice, text:compSlice, style:"width: 50px;"}));
        tableSlices.append(line);

        var linha = $("#addsComponents").find("tr[id='"+ conn.connection.getParameter("idComponent") +"']");
        linha.append("<p class='slices' id='"+conn.connection.getParameter("idSlice")+"' hidden value='"+nameSlice+"'>"+nameSlice+"</p>");
    }
}

function deleteElement(element, js){
	var name = element.find("p[id=name]").attr("value");
	var nameComponenteOnForm = $("#newComponent").find("form").find("fieldset").find("div[id=newComp]").find("#name").attr("value");
	if(name != nameComponenteOnForm){
		jsPlumb.remove(element);
	    element.remove();
	    $("#addsUnidades").find("tr:not(:first-child)").remove();
        $("#listParameters").find("tr:not(:first-child)").remove();
        $("#addsComponents").find("tr:not(:first-child)").remove();
	}
}

function addNewAbstractComponent(){
	$("#modalSubmit").modal({backdrop: 'static', keyboard: false});
	
    var nameComponent = $("#newComp").find("p[id='name']").attr("value");;

    var supertype = $("#newComp").find("p[id='super']").attr("value");
    var idsupertype = $("#newComp").find("p[id='idSuper']").attr("value");

    var contextParameter = parameters($("#listParameters").find("tr:not(:first)"));
    var unitsAbstracts = units($("#addsUnidades").find("tr:not(:first)"));
    var unislices = slices($("#listSlices").find("tr:not(:first)"));
    var nestedComponents = nested($("#addsComponents").find("tr:not(:first)"));
    var compObj = {
        name:  nameComponent,
        super: { name: supertype, idAc: parseInt(idsupertype)  },
        parameters: contextParameter,
        units: unitsAbstracts,
        inners: nestedComponents,
        slices: unislices
    };
    console.log(compObj);
    saveNewAbstractComponent(compObj, function(result){
    	try {
    		result = result.getElementsByTagName("result").item(0).getAttribute("value");
    		if(result === "true"){
    			alert("Componente registrado com sucesso!");
    			location.reload();
    		}else{
    			alert("Componente não pode ser registrado!");
    		}
		} catch (e) {
			alert("[ERROR]: Não foi possível carregar a resposta - "+e);
		}
		$("#modalSubmit").modal('hide');
    });
}


// FUNÇÕES PARA CARREGAR INFORMAÇÕES NA INTERFACE
function loadCompModal () {

	var listLinksComponentsSupertype = $("#listSuperComponents > li");
	var listLinksComponentsParameters = $("#listParamComponents > li");
	var listLinksComponentsInners = $("#listNestedComponents > li");
	var listLinksComponentsEdite = $("#listEditeComponents > li");

	if (listLinksComponentsInners != null && listLinksComponentsParameters != null && listLinksComponentsInners != null) {
		for (var i = 0; i < listLinksComponentsSupertype.length; i++) {
			listLinksComponentsInners[i].onclick = function() {
				$("#nameNestedComp > h3").remove();
	            $("#nameNestedComp > p").remove();
	            $("#nameNestedComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
	            $("#nameNestedComp").append("<p hidden id='"+this.firstChild.getAttribute("id")+"' value='"+this.firstChild.getAttribute("value")+"'></p>");
	            loadDetaisComp($("#nameNestedComp"), this.firstChild.text,$("#pararNestComp"),$("#nestNestedComp"),$("#unitNestedComp"),$("#nameNestedComp"),$("#slicesNestedComp"), $("#qualytiNestedComp"), $("#costNestedComp"));
			};
			listLinksComponentsParameters[i].onclick = function() {
				$("#bound > h3").remove();
	            $("#bound > select").remove();
	            $("#bound").append("<h3 value='"+this.firstChild.getAttribute("id")+"'>"+this.firstChild.text+"</h3>");
	            var select = $("<select>",{class:"form-control" ,style:"width:250px;"});
	            $("#modalLoadContracts").modal({backdrop: 'static', keyboard: false});
	            getListContracts(parseInt(this.firstChild.getAttribute("id")),function(list){
	            	if(list != undefined){
	            		var contracts = list;
		            	for (var i = 0; i < contracts.length; i++) {
			                select.append($("<option>",{text:contracts[i].ccName ,value:contracts[i].ccName ,id:contracts[i].ccId}));
			            };
			            $("#bound").append(select);
	            	}else{
	            		alert("Este parâmetro não possue contratos");
	            	}
	            	$("#modalLoadContracts").modal('hide');
	            });
			};
			listLinksComponentsSupertype[i].onclick = function() {
				$("#nameSuperComp > h3").remove();
	            $("#nameSuperComp > p").remove();
	            $("#nameSuperComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
	            $("#nameSuperComp").append("<p value='"+this.firstChild.getAttribute("id")+"'></p>");
	            loadDetaisComp($("#nameSuperComp") ,this.firstChild.text,$("#pararSuper"),$("#nestCompSuper"),$("#unitCompSuper"),$("#nameSuperComp"), $("#slicesCompSuper"), $("#qualytiCompSuper"), $("#costCompSuper"));
			};
			listLinksComponentsEdite[i].onclick = function(){
				$("#nameEditComp > h3").remove();
	            $("#nameEditComp > p").remove();
	            $("#nameEditComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
	            $("#nameEditComp").append("<p value='"+this.firstChild.getAttribute("id")+"'></p>");
	            loadDetaisComp($("#nameEditComp") ,this.firstChild.text,$("#pararEditComp"),$("#nestEditComp"),$("#unitEditComp"),$("#nameEditComp"), $("#slicesEditComp"), $("#qualytiEditComp"), $("#costEditComp"));
			};
		}
	}
}

function loadDetaisComp (viewComp, component, listParar, listNestedComp, listAbsUnit, name, listSlices, listQualities, listCosts) {

	listParar.empty();
    listNestedComp.empty();
    listAbsUnit.empty();
	listSlices.empty();
    listQualities.empty();
    listCosts.empty();

    var cmp = getAbstractComponent(component);
    
    var parar = cmp.contextParameter;
    var nested = cmp.innerComponents;
    var unit = cmp.abstractUnit;
	var slice = cmp.slices;
    var quality = cmp.qualityParameters;
    var cost = cmp.costParameters;

    viewComp.append("<p id='idSuper' value='"+cmp.supertype.idAc+"'></p>");
    
    if(parar != null){
    	listParar.append("<thead><tr><td><b>Nome do Parâmetro</b></td></tr></thead>");
    	for (var i = 0; i < parar.length; i++) {
            listParar.append("<tr><td>"+parar[i].name+"</td></tr>");
        }
    }
    
    if(nested != null){
    	listNestedComp.append("<thead><tr><td><b>Nome do Componente</b></td></tr></thead>");
    	for (var i = 0; i < nested.length; i++) {
            listNestedComp.append("<tr><td>"+nested[i].name+"</td></tr>");
        }
    }

    if(unit != null){
    	listAbsUnit.append("<thead><tr><td><b>Nome da Unidade</b></td></tr></thead>");
    	for (var i = 0; i < unit.length; i++) {
            listAbsUnit.append("<tr><td><input type='checkbox' value='"+unit[i].auName+"' id='"+unit[i].auId+"'/>"+unit[i].auName+"</td></tr>");
        }
    }
    
    if(slice != null){
    	listSlices.append("<thead><tr><td><b>Nome da Fatia</b></td></tr></thead>");
    	for (var i = 0; i < slice.length; i++) {
            listSlices.append("<tr><td>"+slice[i].innerUnityName+"</td></tr>");
        }
    }
    
    if(quality != null){
    	listQualities.append("<thead><tr><td><b>Nome do Parâmetro</b></td></tr></thead>");
    	for (var i = 0; i < quality.length; i++) {
            listQualities.append("<tr><td>"+quality[i].name+"<tr><td>");
        }
    }
    
    if(cost != null){
    	listCosts.append("<thead><tr><td><b>Nome do Parâmetro</b></td></tr></thead>");
    	for (var i = 0; i < cost.length; i++) {
    		listCosts.append("<tr><td>"+cost[i].name+"</td></tr>");
        }
    }
}

function initListComponents(){
	var list = getListAbstractComponents();
	var listSuper = $("#listSuperComponents");
	var listParam = $("#listParamComponents");
	var listNested = $("#listNestedComponents");
	var listEdite = $("#listEditeComponents");
	
	for (var i = 0; i < list.length; i++) {
		listSuper.append($("<li>").append($("<a>",{id:list[i].acId , value:list[i].name, text:list[i].name, href:"#"})));
		listParam.append($("<li>").append($("<a>",{id:list[i].acId , value:list[i].name, text:list[i].name, href:"#"})));
		listNested.append($("<li>").append($("<a>",{id:list[i].acId , value:list[i].name, text:list[i].name, href:"#"})));
		listEdite.append($("<li>").append($("<a>",{id:list[i].acId , value:list[i].name, text:list[i].name, href:"#"})));
	}
}

function showMenu(idelement) {
    ELEMENT = idelement;

    var X = event.clientX;
    var Y = event.clientY;
    var menu = document.getElementById("divMenu");

    menu.style.top = Y.toString() + "px";
    menu.style.left = X.toString() + "px";
    menu.style.visibility = "visible";

    var lis = document.querySelectorAll("#divMenu > ul > li");
    for (var i = 0; i < lis.length; i++) {
        lis.item(i).addEventListener("click", function () {
            menu.style.visibility = "hidden";
        });
    }
}

// FUNÇÕES AUXILIXARES
function exist(id, list){
    for (var j = 0; j < list.length; j++) {
        if(parseInt(list[j].getAttribute("id")) === id){
            return true;
        }
    }
    return false;
}

function identifier(listIds){
    for (var i = 0; true; i++) {
        if(exist(i,listIds) === false){
            return i;
        }
    }
}

// FUNÇÕES PARA DEFINIR OS ATRIBUTOS DO OBJETO COMPONENTE
/* 
 	kind: 1 é parametro contextual
	kinId:  2 qualidade
	kindId: 3 custo
	kindId: 4 ranking
 */
function parameters(listParameters){
	var parametersObjs = [];
	for (var i = 0; i < listParameters.length; i++) {
		parametersObjs[i] = {
			name: listParameters[i].childNodes[0].getAttribute("value"),
			kind: 1
		}
		if($("#opcaoLimite").find("option:selected").attr("value") === "contract"){
			parametersObjs[i].bound = {
				ccId: listParameters[i].firstChild.firstChild.value == ""? null: parseInt(listParameters[i].firstChild.getElementsByTagName("p").item(0).getAttribute("value")),
				ccName: listParameters[i].firstChild.firstChild.value == ""? null: listParameters[i].firstChild.getElementsByTagName("p").item(1).getAttribute("value")
			}
		}else{
			parametersObjs[i].boundValue = listParameters[i].firstChild.getElementsByTagName("p").item(2).getAttribute("value")
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
			innerUnityName: list[j].childNodes[0].getAttribute("value"),
			innerComponentName: list[j].childNodes[1].getAttribute("value"),
			innerComponentId: parseInt(list[j].childNodes[1].getAttribute("id")),
			innerUnitId: parseInt(list[j].getAttribute("id"))
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
			supertype: { 
				name:listNested[i].childNodes[4].getAttribute("value"),
				idAc: parseInt(listNested[i].childNodes[5].getAttribute("value"))
			},
			abstractUnit: unitsNested(listNested[i].getElementsByClassName("slices"))
		}
	};
	return nestedObjs;
}

/* Implementar:
 * -> addContextParameter
 * -> addAbstractUnit
 */

function getContextParameters(){
	var listParameters = $("#listParameters > tbody > tr");
	var parametersObjs = [];
	for (var i = 0; i < listParameters.length; i++) {
		if(listParameters[i].childNodes.length === 3){
			obj = {
				name: listParameters[i].childNodes[0].getAttribute("value"),
				kind: 1
			}
			if($("#opcaoLimite").find("option:selected").attr("value") === "contract"){
				obj.bound = {
					ccId: listParameters[i].firstChild.firstChild.value == ""? null: parseInt(listParameters[i].firstChild.getElementsByTagName("p").item(0).getAttribute("value")),
					ccName: listParameters[i].firstChild.firstChild.value == ""? null: listParameters[i].firstChild.getElementsByTagName("p").item(1).getAttribute("value")
				}
			}else{
				obj.boundValue = listParameters[i].firstChild.getElementsByTagName("p").item(2).getAttribute("value")
			}
			parametersObjs.push(obj);
		}
	}
	console.log(parametersObjs);
	return parametersObjs;
}

function getAbstractsUnits(){
	var units = $("#addsUnidades > tbody > tr");
	var newUnits = [];
	for (var i = 0; i < units.length; i++) {
		if(units[i].getElementsByTagName("span").length > 0){
			newUnits.push({auName: units[i].childNodes[0].getAttribute("value")});
			
		}
	}
	console.log(newUnits);
	return newUnits;
}
 