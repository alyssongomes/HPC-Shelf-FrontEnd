var ELEMENT = null;

$(document).ready(function(){
	init();
});

//Inicializar componentes da página
function init() {
    var jsplumb = jsPlumb.getInstance();
    
    $("#quadro1").tabs();
    $("#trash").droppable({
        drop: function( event, ui ) {
          deleteElement( ui.draggable, jsplumb );
        }
    });
    $("#testep").draggable();

    $("#submeter").button().click(submitAplication);
    $("#addPar").button().click(function(){
        var idPar = identifierPar();
        var tabParam = $("#tableParam");
        var linha  = $("<tr/>",{id: idPar});
        var coluna1 = $("<td/>",{id:0, style:"width: 100px; color: #FFFFFF;", width: 300});
            coluna1.append($("<input/>",{type:"text", name: "param", size:70}))
        var coluna2 = $("<td/>",{id:0, text:"Excluir", onclick:"deleteParamater("+idPar+")",style:"color: red;", width: 50 });
        linha.append(coluna1);
        linha.append(coluna2);
        tabParam.append(linha);
    });

    loadSuperComp();
    loadComponents();

    var dialog = $( "#dialog-super" ).dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        modal: true,
        buttons: {
            "Selecionar": function(){
                $("#nameSuperType > h3").remove();
                $("#nameSuperType").append("<h3 value='"+$("#nameSuperComp > h3").attr("value")+"''>"+$("#nameSuperComp > h3").attr("value")+"</h3>");
                dialog.dialog( "close" );
            },
            Cancel: function() {
                dialog.dialog( "close" );
            }
        }
    });

    var dialogParam = $( "#dialog-param" ).dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        modal: true,
        buttons: {
            "Selecionar": function(){
                var idPar = identifierTabNewPar();   
                var tabParam = $("#listParameters");
                var linha  = $("<tr/>",{id: idPar});
                var coluna1 = $("<td/>",{id:0,text: $("#nameParamComp > h3").attr("value"),value:$("#nameParamComp > h3").attr("value"), style:"width: 100px; color: #FFFFFF;", width: 180});                    
                var coluna2 = $("<td/>",{id:0, text: $("#variavel").is(':checked')==true? "Compartilhada":"Local", value: $("#bound").val(),style:"color: blue;", width: 70 });
                var coluna3 = $("<td/>",{id:0, text:"Excluir", onclick:"deleteTabNewParamater("+idPar+")",style:"color: red;", width: 40 });
                linha.append(coluna1);
                linha.append(coluna2);
                linha.append(coluna3);
                tabParam.append(linha);
                $("#variavel").attr("checked",false);
                $("#bound").val("");
                $("#nameParamComp > h3").remove();

            },
            Cancel: function() {
                dialogParam.dialog( "close" );
            }
        }
    });

    var dialogComp = $( "#dialog-comp" ).dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        modal: true,
        buttons: {
            "Selecionar": function(){
                var idPar = identifierTabPar();
                var tabParam = $("#addsComponents");
                var linha  = $("<tr/>",{id: idPar});
                var coluna1 = $("<td/>",{id:0,text: $("#nameNestedComp > h3").attr("value"),value:$("#nameNestedComp > h3").attr("value"), style:"width: 100px; color: #FFFFFF;", width: 300});                    
                var coluna2 = $("<td/>",{id:0, text:"Excluir", onclick:"deleteTabParamater("+idPar+")",style:"color: red;", width: 50 });
                linha.append(coluna1);
                linha.append(coluna2);
                tabParam.append(linha);
            },
            Cancel: function() {
                dialogComp.dialog( "close" );
            }
        }
    });

    $("#selectType").button().click(function () {
        //componentsAvaliable();
        dialog.dialog( "open" );
    });
    $("#addParameter").button().click(function(){
        dialogParam.dialog("open");
        //paramtersContextAvaliable();
    });
    $("#addUnidade").button();
    $("#addComponent").button().click(function(){
        dialogComp.dialog("open");
        //alignComponents();
    });
    $("#saveComponent").button();

    
    /* MENU POP-UP */
    
    document.addEventListener("click",
        function () {
            document.getElementById("divMenu").style.visibility = "hidden";
        }
    );

    $("#divMenu > ul > li:nth-child(1)").click(
        function () {
            createMakeSource($("#sort2 div[value="+ELEMENT+"]"),jsplumb);
        }
    );
    
    $("#divMenu > ul > li:nth-child(2)").click(
            function () {
                if(confirm("Deseja realmente deletar?")){
                    deleteElement($("#sort2 div[value="+ELEMENT+"]"),jsplumb);
                }
            }
        );
    
    /* FIM MENU POP-UP*/

    jsplumb.batch(function() {
        jsplumb.bind("click", function (component, originalEvent) {
            if(confirm("Deseja mudar o interesse?")){
                var inter = prompt("Insira o interesse!","Interesse");
                var c = component.getOverlay("label");
                c.setLabel(inter);
                jsplumb.repaintEverything();
            }
        });
    })
}

function loadComponents(){
    var listSort = $("#sort1");
    var listComponents = getAbstractComponents();
    $("#esperando").remove();
    for(var i=0; i<listComponents.length;i++){
        var li = $("<li/>",{ value:i, class:"ui-state-default" });
        li.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        $("#listSuperComponents").append(li);
        li.click(function(){
            createComponent(this);
        });
        listSort.append(li);
    }
}

function loadSuperComp () {
    var listComponents = getAbstractComponents();
    for(var i=0; i<listComponents.length;i++){
        var li = $("<li/>",{ value:i, class:"ui-state-default" });
        li.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        li.click(function(){
            $("#nameSuperComp > h3").remove();
            $("#nameSuperComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
        });
        $("#listSuperComponents").append(li);

        var liC = $("<li/>",{ value:i, class:"ui-state-default" });
        liC.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        liC.click(function(){
            $("#nameNestedComp > h3").remove();
            $("#nameNestedComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
        });
        $("#listNestedComponents").append(liC);

         var liP = $("<li/>",{ value:i, class:"ui-state-default" });
        liP.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        liP.click(function(){
            $("#nameParamComp > h3").remove();
            $("#nameParamComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
        });
        $("#listParamComponents").append(liP);
    }
}

function componentsAvaliable(){
    
}

function paramtersContextAvaliable(){

}

function alignComponents(){

}

function findInfoComponent(nameComponent){
    $.ajax({ 
		url:"php/detalhes.php?name="+nameComponent, 
		type:"GET",
		success: function(data) {
			var ajax = new XMLHttpRequest;
		    ajax.onreadystatechange = function(){
		        if(ajax.readyState == 4 ){
		                //alert(ajax.status+" : "+ajax.statusText);
		                var xml = ajax.responseXML;
		                var parameters = "";
		                //var component  = ajax.responseXML.getElementsByTagName("abstract_component").item(0).getAttribute("name");
		                //var superType = ajax.responseXML.getElementsByTagName("supertype");
                        var context_parameter = ajax.responseXML.getElementsByTagName("inner_components");//? this: null;
                        
    		                for (var i = 0; i < context_parameter.length; i++) {
    							parameters += " &nbsp;"+context_parameter.item(i).getAttribute("name")+"<br/>";
    						}
                            parameters == ""?  parameters = "<font color='red'>Não possui componentes</font>":parameters;
    		                $("#msg").html("<p><h3>Name: "+nameComponent+
    		                                "<br/>Componentes Aninhados: <br/>"+ parameters +"<h3/><p/>");
    		                $("#msg").attr("title","Composition Overlap");
    		                $("#msg").dialog({
    		                    width: 350,
    		                    buttons:{ 
    		                        "OK":function(){
    		                            $(this).dialog("close");
    		                        },
    		                    }
    		                });            
		        }
		    }
		    
		    ajax.open("GET","php/detalhes.xml");
		    ajax.send(null);
		}
	});   
}


function submitAplication(){
    var components = "<components>";
    var itens = $("ul[id=sort2] li");
    if(itens[0].firstChild == null){
        alert("Nenhum componente foi escolhido!");
    }else{
        for(var i=0;i<itens.length;i++){
            components += "<component><name>"+itens[i].firstChild.nodeValue+"</name></component>";
        }
        components += "</components>";
         $.ajax({
                type: 'post',
                url : 'php/writerFile.php',
                data: 'components='+components,
                success : function(txt){
                    alert("Aplicacao submetida!");
                }
            });
    }
}

function createComponent(element){
    var newComponent = createComponentAbstract({name:element.firstChild.text,super:element.firstChild.getAttribute("value")});
	var div = $("<div/>",{ value: newComponent.id , class:"ui-widget-content ui-state-default", oncontextmenu:"showMenu("+newComponent.id+"); return false;"});
	div.css("height","40px").css("padding-right","25px").css("padding-top","20px").css("padding-left","25px").css("width","auto").css("text-align", "center").css("top","200px");
    div.append($("<a/>",{id:newComponent.id, text: newComponent.name, value:newComponent.super, href:"#", onclick:"getParameters('"+newComponent.name+"')"}));
    div.dblclick(function(){
        findInfoComponent(element.firstChild.text);
    });
    $("#sort2").append(div);
	$("#sort2 > div:not(#trash)").draggable({ cursor:"move"});
}

function deleteElement(element, js){
	js.remove(element);
	element.remove();
}

function getParameters(nameComponent){
    document.getElementById("InfoComp").firstChild.nodeValue = nameComponent;
    var tabParam = $("#tableParam");
    $.ajax({ 
            url:"php/details.php?name="+nameComponent, 
            dataType: "xml",
            type:"GET",
            success: function(data) {
                $("#tableParam tr").remove();
                var contextParameter = data.getElementsByTagName("context_parameter");
                document.getElementById("InfoSuper").firstChild.nodeValue = data.getElementsByTagName("supertype").item(0).getAttribute("name");
                    for (var i = 0; i < contextParameter.length; i++) {
                        var idPar = identifierPar();
                        var linha  = $("<tr/>", {id: idPar});
                        var coluna1 = $("<td/>",{text:contextParameter.item(i).getAttribute("name").replace(/_/g," "), id:i, style:"width: 100px; color: #FFFFFF;", width: 300});
                        var coluna2 = $("<td/>",{id:i, text:"Excluir", onclick:"deleteParamater("+idPar+")",style:"color: red;", width: 50 });
                        linha.append(coluna1);
                        linha.append(coluna2);
                        tabParam.append(linha);
                    }
            }
        });


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

function existPar(id,list){
    for (var j = 0; j < list.length; j++) {
        if(parseInt(list[j].getAttribute("id")) === id){
            return true;
        }
    }
    return false;
}

function identifierPar(){
    for (var i = 0; true; i++) {
        if(existPar(i, $("#tableParam tr")) === false){
            return i;
        }
    }
}

function identifierTabNewPar(){
    for (var i = 0; true; i++) {
        if(existPar(i, $("#listParameters tr")) === false){
            return i;
        }
    }
}

function identifierTabPar(){
    for (var i = 0; true; i++) {
        if(existPar(i, $("#addsComponents tr")) === false){
            return i;
        }
    }
}

function deleteParamater(idPar){
    $("#tableParam tr[id = "+idPar+"]").remove();
}

function deleteTabParamater(idPar){
    $("#addsComponents tr[id = "+idPar+"]").remove();
}

function deleteTabNewParamater(idPar){
    $("#listParameters tr[id = "+idPar+"]").remove();
}

function createMakeSource(element, js){
	var exampleGreyEndpointOptions  =  { 
			endpoint : "Rectangle" , 
			paintStyle:{ width:15, height:11, fillStyle:'#666' },
			connector:"StateMachine",
			DragOptions: { cursor: 'pointer'},
			anchor: "AutoDefault", 
			isSource : true,
			scope: "#666",
			connectorStyle : { strokeStyle:"#666" },
            connectorOverlays:[ 
               	[ "Arrow", { width:20, length:20, location: 0.75, id:"arrow" } ],
               	[ "Label", { label:"Interesse", id:"label" } ]
             ],
             Container: "quadro2",
             anchor: "Continuous",
             isTarget: true,
	};
	js.addEndpoint ( element, exampleGreyEndpointOptions );
	js.draggable(element);
	js.repaintEverything();
}