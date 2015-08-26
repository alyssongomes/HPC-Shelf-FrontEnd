var ELEMENT = null;

$(document).ready(function(){
	var jsplumb = jsPlumb.getInstance();
    var sort = $("#sort1");
    loadComponents(sort);

    $("#autoScroll2").droppable();
    $("#trash").droppable({
        drop: function( event, ui ) {
          deleteElement( ui.draggable );
        }
      });
    
    $("#submeter").button().click(submitAplication);
    
    
    /* MENU POP-UP */
    
    	document.addEventListener("click",
            function () {
                document.getElementById("divMenu").style.visibility = "hidden";
            }
        );

        $("#divMenu > ul > li:nth-child(1)").click(
            function () {
                createMakeSource($("#sort2 li[value="+ELEMENT+"]"),jsplumb);
            }
        );

        $("#divMenu > ul > li:nth-child(2)").click(
            function () {
            	$("#sort2 li[value="+ELEMENT+"]").draggable('enable');
            	jsplumb.unmakeSource($("#sort2 li[value="+ELEMENT+"]"));
            }
        );
        
        $("#divMenu > ul > li:nth-child(3)").click(
                function () {
                	createMakeTarget($("#sort2 li[value="+ELEMENT+"]"),jsplumb);
                }
            );
    
    /* FIM MENU POP-UP*/
    
});

function loadComponents(listSort){
    var ajax = new XMLHttpRequest;
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 ){
                alert(ajax.status+" : "+ajax.statusText);
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
    //alert(itens[0].firstChild.nodeValue);
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
	$("#sort2").append(cpElement);
	$("#sort2 > li").draggable({ cursor:"move" ,scroll: true, scrollSensitivity: 100 });
	$("#sort2 > li").css("height","50px").css("display","table-cell").css("vertical-align"," middle");
	addFindInfoComponentAndMenu($("#sort2 li"));
}

function deleteElement(element){
	element.hide(1000);
	element.remove();
}

function addFindInfoComponentAndMenu(list){
	for (var i = 0; i < list.length; i++) {
		list[i].firstChild.setAttribute("onclick","findInfoComponent('"+list[i].firstChild.text+"');");
		var id = identifier();
		list[i].setAttribute("value",id);
		list[i].setAttribute("oncontextmenu","showMenu("+id+"); return false;");
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


function identifier(){
	for (var i = 0; true; i++) {
		if(exist(i, $("#sort2 li")) === false){
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

function createMakeSource(element, jsplumblocal){
	element.draggable('disable');
	
	 jsplumblocal.importDefaults({
         anchors: ["AutoDefault","AutoDefault"]
     });
	
	jsplumblocal.makeSource(element,{
		anchor:"Bottom",
		endpoint:["Rectangle",{width:20,height:20}],
		maxConnections: 3
	});
}

function createMakeTarget(element, jsplumblocal){
	var endpointOptions = {
            isTarget: true,
            endpoint: "Rectangle",
            paintStyle: {fillStyle:"gray"},
            anchor: "Bottom",
            deleteEndpointsOnDetach : false,//assim os endpoints não são excluidos quando á não ligações
            maxConnections: 6
        };
	jsplumblocal.makeTarget(element,endpointOptions);
	element.draggable("disable");
	jsplumblocal.draggable(element);
}