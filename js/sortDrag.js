var ELEMENT = null;

$(document).ready(function(){
	var jsplumb = jsPlumb.getInstance();
	
    var sort = $("#sort1");
    loadComponents(sort);

    $("#trash").droppable({
        drop: function( event, ui ) {
          deleteElement( ui.draggable, jsplumb );
        }
      });
    
    $("#submeter").button().click(submitAplication);
    $("#testep").draggable();
    
    
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
                	createSettingPort($("#sort2 div[value="+ELEMENT+"]"),jsplumb);
                }
            );
        
        $("#divMenu > ul > li:nth-child(3)").click(
                function () {
                	createWorkflowPort($("#sort2 div[value="+ELEMENT+"]"),jsplumb);
                }
            );
        
        $("#divMenu > ul > li:nth-child(4)").click(
                function () {
                	if(confirm("Deseja realmente deletar?")){
                		deleteElement($("#sort2 div[value="+ELEMENT+"]"),jsplumb);
                	}
                }
            );
        
        $("#divMenu > ul > li:nth-child(5)").click(
                function () {
                	findInfoComponent($("#sort2 div[value="+ELEMENT+"] a").attr("name"));
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
    
});

function loadComponents(listSort){
	 $.ajax({ 
			url:"php/requisicaoExterna.php", 
			type:"POST",
			success: function(data) {
				var ajax = new XMLHttpRequest;
			    ajax.onreadystatechange = function(){
			        if(ajax.readyState == 4 ){
			        	var xml = ajax.responseXML;
			        	var components = xml.getElementsByTagName("abstract_component");
		                for(var i=0; i<components.length;i++){
		                    var li = $("<li/>",{ value:i, class:"ui-state-default" });
		                    li.append($("<a/>",{id:components[i].getAttribute("ac_id"),text:components[i].getAttribute("name"), href:"#"}));
		                    li.click(function(){
		                    	createComponent(this);
		                	});
		                    listSort.append(li);
		                }              
			        }
			    }
			    ajax.open("POST","php/resposta2.xml");
			    ajax.send(null);
			}
		}); 
}

function findInfoComponent(nameComponent){
    $.ajax({ 
		url:"php/detalhes.php?name="+nameComponent, 
		type:"GET",
		success: function(data) {
			var ajax = new XMLHttpRequest;
		    ajax.onreadystatechange = function(){
		        if(ajax.readyState == 4 ){
		                var xml = ajax.responseXML;
		                var parameters = "";
		                var component  = ajax.responseXML.getElementsByTagName("abstract_component").item(0).getAttribute("name");
		                var superType = ajax.responseXML.getElementsByTagName("supertype");
		                var context_parameter = ajax.responseXML.getElementsByTagName("context_parameter");
		                for (var i = 0; i < context_parameter.length; i++) {
							parameters += " &nbsp;"+context_parameter.item(i).getAttribute("name")+"<br/>";
						}
		                $("#msg").html("<p>Name: "+component+
		                               "<br/>Super Type: "+superType.item(0).getAttribute("name")+
		                                "<br/>Context parameters: <br/>"+parameters+"<p/>");
		                $("#msg").attr("title","Information");
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
	var cpElement = element.cloneNode(true);
	var id = identifier();
	var div = $("<div/>",{ value:id, class:"ui-widget-content ui-state-default", oncontextmenu:"showMenu("+id+"); return false;"});
	div.css("height","40px").css("padding-right","25px").css("padding-top","20px").css("padding-left","25px").css("width","auto").css("text-align", "center").css("top","200px");
    div.append($("<a/>",{text:element.firstChild.text, name:element.firstChild.text, href:"#"}));
    $("#sort2").append(div);
	$("#sort2 > div:not(#trash)").draggable({ cursor:"move" /*, containment: "parent", scroll:true*/  });
}

function deleteElement(element, js){
	js.remove(element);
	element.remove();
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

function createMakeSource(element, js){
	var exampleGreyEndpointOptions  =  { 
			endpoint : "Rectangle" , 
			//paintStyle : {  width : 15 ,  height : 11 ,  fillStyle : '#669'  },
			paintStyle:{ width:15, height:11, fillStyle:'#666' },
			connector:"StateMachine",
			DragOptions: { cursor: 'pointer'},
			anchor: "AutoDefault", 
			//connectorStyle  :  {  strokeStyle : "#666"  }, //estilo da linha q conecta
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


function createSettingPort(element, js){
	var exampleGreyEndpointOptions  =  { 
			endpoint : "Rectangle" , 
			connector:"StateMachine",
			anchor: "AutoDefault",
			DragOptions: { cursor: 'pointer'},
			isSource : true,
			paintStyle: { width:15, height:11, fillStyle: "#191970" },
			connectorStyle : { strokeStyle:"#666" },
            connectorOverlays:[ 
               	[ "Arrow", { width:20, length:20, location: 0.75, id:"arrow" } ],
               	[ "Label", { label:"Porta de Ambiente", id:"label" } ]
             ],
             Container: "quadro2",
             anchor: "Continuous",
             isTarget: true,
             scope: "#191970",
	};
	js.addEndpoint ( element, exampleGreyEndpointOptions );
	js.draggable(element);
	js.repaintEverything();
}

function createWorkflowPort(element, js){
	var exampleGreyEndpointOptions  =  { 
			endpoint : "Rectangle" ,
			connector:"StateMachine",
			DragOptions: { cursor: 'pointer'},
			anchor: "AutoDefault", 
			isSource : true,
			paintStyle: { width:15, height:11,fillStyle: "#316b31"},
			connectorStyle : { strokeStyle:"#666" },
            connectorOverlays:[ 
               	[ "Arrow", { width:20, length:20, location: 0.75, id:"arrow" } ],
               	[ "Label", { label:"Porta de Workflow", id:"label" } ]
             ],
             Container: "quadro2",
             anchor: "Continuous",
             isTarget: true,
             scope: "#316b31",
	};
	js.addEndpoint ( element, exampleGreyEndpointOptions );
	js.draggable(element);
	js.repaintEverything();
}