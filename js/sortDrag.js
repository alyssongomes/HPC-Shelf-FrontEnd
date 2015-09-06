var ELEMENT = null;

$(document).ready(function(){
	var jsplumb = jsPlumb.getInstance();
	 jsplumb.importDefaults({
         anchors: ["AutoDefault","AutoDefault"],
         connector:"StateMachine",
         Container: "canvas"
     });
	
	
    var sort = $("#sort1");
    loadComponents(sort);

    $("#trash").droppable({
        drop: function( event, ui ) {
          deleteElement( ui.draggable );
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
                createMakeSource($("#sort2 div[value="+ELEMENT+"]"));
            }
        );

        /*$("#divMenu > ul > li:nth-child(2)").click(
            function () {
            	/*$("#sort2 li[value="+ELEMENT+"]").draggable('enable');
            	jsplumb.unmakeSource($("#sort2 li[value="+ELEMENT+"]"));
            	//alert($("#sort2 li[value="+ELEMENT+"]"));
            	jsplumb.draggable($("#sort2 li[value="+ELEMENT+"]"));
            }
        );*/
        
        $("#divMenu > ul > li:nth-child(2)").click(
            function () {
            	createMakeTarget($("#sort2 div[value="+ELEMENT+"]"),jsplumb);
            }
        );
        
        $("#divMenu > ul > li:nth-child(3)").click(
		        function () {
		        	jsPlumb.setDraggable($("#sort2 div[value="+ELEMENT+"]"),true);
		        }
         );
        
        $("#divMenu > ul > li:nth-child(5)").click(
                function () {
                	if(confirm("Deseja realmente deletar?")){
                		deleteElement($("#sort2 div[value="+ELEMENT+"]"));
                	}
                }
            );
    
    /* FIM MENU POP-UP*/
        
        
    jsPlumb.batch(function() {
    	jsPlumb.bind("click", function (component, originalEvent) {
    		if(confirm("Deseja mudar o interesse?")){
    			var inter = prompt("Insira o interesse!","Interesse");
    			alert(inter);
    		}
        });
	})
    
});

function loadComponents(listSort){
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
    return false;
     /*
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
		                    	createComponent(this, jsplumblocal);
		                	});
		                    listSort.append(li);
		                }              
			        }
			    }
			    ajax.open("POST","php/resposta2.xml");
			    ajax.send(null);
			}
		}); 
*/
}

function findInfoComponent(nameComponent){
    $.ajax({ 
		url:"php/detalhes.php?name="+nameComponent, 
		type:"GET",
		success: function(data) {
			var ajax = new XMLHttpRequest;
		    ajax.onreadystatechange = function(){
		        if(ajax.readyState == 4 ){
		                alert(ajax.status+" : "+ajax.statusText);
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
    div.append($("<a/>",{text:element.firstChild.text, href:"#",onclick:"findInfoComponent('"+element.firstChild.text+"');"}));
    $("#sort2").append(div);
	$("#sort2 > div:not(#trash)").draggable({ cursor:"move" /*, containment: "parent", scroll:true*/  });
}

function deleteElement(element){
	jsPlumb.remove(element);
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

function createMakeSource(element){
	element.draggable('disable');
	jsPlumb.setDraggable(element,false);
	var exampleGreyEndpointOptions = {
			endpoint:"Rectangle",
            paintStyle:{ width:15, height:11, fillStyle:'#666' },
            connector:"StateMachine",
            isSource:true,
            connectorStyle : { strokeStyle:"#666" },
            overlays:[ /*[ "Diamont", { width:10, length:30, location:50, id:"diamant" } ],*/  /*[ "Label", { label:"Conector", id:"label", location:[0.5, 0.5] } ]*/  ],
            connectorOverlays:[ 
               	[ "Arrow", { width:30, length:30, location: 0.5, id:"arrow" } ],
               	[ "Label", { label:"Interesse", id:"label" } ]
             ],
             Container: "quadro2",
             anchor: "Continuous",
             deleteEndpointsOnDetach : false
	};       
	jsPlumb.makeSource(element,exampleGreyEndpointOptions);
}

function createMakeTarget(element){
	jsPlumb.importDefaults({
		connector:"StateMachine"    
	});
	var exampleGreyEndpointOptions  =  { 
			endpoint : "Rectangle" , 
			paintStyle : {  width : 15 ,  height : 11 ,  fillStyle : '#669'  },
			anchor: "AutoDefault", 
			//connectorStyle  :  {  strokeStyle : "#666"  }, //estilo da linha q conecta
			isTarget : true
	};
	jsPlumb.addEndpoint ( element ,{ anchor : "Continuous" }, exampleGreyEndpointOptions );
	jsPlumb.draggable(element);
}
