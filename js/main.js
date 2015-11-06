var ELEMENT = null;
var newComp = null;

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
                var idPar = identifierTabNewPar($("#listParameters > tbody > tr"));   
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
                var unidades = $("#unitNestedComp > input > p");
                alert(unidades.length);
                for (var i = 0; i < unidades.length; i++) {
                    if(unidades[i].is(':checked') == true){
                        var coluna = $("<td/>",{text: unidades[i].text});
                        linha.append(coluna);
                    }
                };
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
    $("#addComponent").button().click(function(){
        dialogComp.dialog("open");
        //alignComponents();
    });
    $("#saveComponent").button().click(function(){
        //getNewAbstractComponent($("#newComponent"));
        var a = $("#newComponent").find("label[id=nameSuperType]").find("h3").attr("value");
        var b = $("#newComponent").find("input[id=nameComponent]").val();
        if(a == null || b == null){
            alert("O nome ou o supertipo do componente não foi definido!");
        }else{
            getNewAbstractComponent($("#newComponent"));
        }
    }); 
    $("#addUnidade").button().click(function(){
        if($("#newComponent").find("input[id=nameUnidade]").val() == ""){
            alert("Insira um nome na unidade!");
        }else{
            addUnidade($("#addsUnidades"),$("#nameUnidade").val());
            $("#nameUnidade").val("");
        }
    });

    loadComponents();
    newModalComponent(dialog,dialogParam,dialogComp);
    loadCompModal();
    
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
    if(listComponents == false){
        listSort.append("<font color = 'red'><h3>Não foi possivel carregar os componentes</h3></font>");
    }else{
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
}
   
function loadCompModal () {
    var listComponents = getAbstractComponents();
    for(var i=0; i<listComponents.length;i++){
        var li = $("<li/>",{ value:i, class:"ui-state-default" });
        li.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        li.click(function(){
            $("#nameSuperComp > h3").remove();
            $("#nameSuperComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
            loadDetaisComp(this.firstChild.text,$("#pararSuper"),$("#nestCompSuper"),$("#unitCompSuper"));
        });
        $("#listSuperComponents").append(li);

        var liC = $("<li/>",{ value:i, class:"ui-state-default" });
        liC.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        liC.click(function(){
            $("#nameNestedComp > h3").remove();
            $("#nameNestedComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
            loadDetaisComp(this.firstChild.text,$("#pararNestComp"),$("#nestNestedComp"),$("#unitNestedComp"));
        });
        $("#listNestedComponents").append(liC);
        $("#listNestedComponents").append(newComp);

         var liP = $("<li/>",{ value:i, class:"ui-state-default" });
        liP.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        liP.click(function(){
            $("#nameParamComp > h3").remove();
            $("#nameParamComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
            loadDetaisComp(this.firstChild.text,$("#pararCompAbs"),$("#nestCompAbs"),$("#unitCompAbs"));
        });
        $("#listParamComponents").append(liP);
    }
}

function newModalComponent(dialogSuper,dialogParam,dialogComp){
    newComp = $("<li/>",{class:"ui-state-default"});
    newComp.append($("<a/>",{value:"newComp", text:"Criar Novo", href:"#"}));
    var novo = $("#newComponent").clone();
    var modalNovo = novo.dialog({
        autoOpen: false,
        height: 400,
        width: 550,
        modal: true,
        buttons: {
            Cancel: function() {
                modalNovo.dialog( "close" );
            }
        }
    });
    novo.find("a[id=selectType]").click(function () {
        var newSuper = $("#dialog-super").clone();
        var li = newSuper.find("ul[id=listSuperComponents]").find("li");
        for (var i = 0; i < li.length; i++) {
            li[i].onclick = function() {
                newSuper.find("label[id=nameSuperComp]").find("h3").remove();
                newSuper.find("label[id=nameSuperComp]").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
                loadDetaisComp(this.firstChild.text,newSuper.find("div[id=pararSuper]"),newSuper.find("div[id=nestCompSuper]"),newSuper.find("div[id=unitCompSuper]"));
            };
        };
        newSuper = newSuper.dialog({
            autoOpen: false,
            height: 500,
            width: 550,
            modal: true,
            buttons: {
                "Selecionar": function(){
                    var nome = newSuper.find("label[id=nameSuperComp]").find("h3").attr("value");
                    novo.find("label[id=nameSuperType]").find("h3").remove();
                    novo.find("label[id=nameSuperType]").append("<h3 value="+nome+">"+nome+"</h3>");
                    newSuper.dialog( "close" );
                },
                Cancel: function() {
                    newSuper.dialog( "close" );
                }
            }
        });
        newSuper.dialog("open");
    });
    novo.find("a[id=addParameter]").click(function(){
        var newParam = $("#dialog-param").clone();
        var li = newParam.find("ul[id=listParamComponents]").find("li");
        for (var i = 0; i < li.length; i++) {
            li[i].onclick = function() {
                newParam.find("label[id=nameParamComp]").find("h3").remove();
                newParam.find("label[id=nameParamComp]").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
                loadDetaisComp(this.firstChild.text,newParam.find("div[id=pararCompAbs]"),newParam.find("div[id=nestCompAbs]"),newParam.find("div[id=unitCompAbs]"));
            };
        };
        newParam = newParam.dialog({
            autoOpen: false,
            height: 500,
            width: 550,
            modal: true,
            buttons: {
                "Selecionar": function(){
                    var idPar = identifierTabNewPar(novo.find("table[id=listParameters]").find("tr"));
                    var tabParam = novo.find("table[id=listParameters]");
                    var linha  = $("<tr/>",{id: idPar});
                    var coluna1 = $("<td/>",{id:0,text: newParam.find("label[id=nameParamComp]").find("h3").attr("value"),value:newParam.find("label[id=nameParamComp]").find("h3").attr("value"), style:"width: 100px; color: #FFFFFF;", width: 180});                    
                    var coluna2 = $("<td/>",{id:0, text: newParam.find("input[id=variavel]").is(':checked')==true? "Compartilhada":"Local", value: newParam.find("input[id=bound]").val(),style:"color: blue;", width: 70 });
                    var coluna3 = $("<td/>",{id:0, text:"Excluir",style:"color: red;", width: 40 }).click(function(){
                        novo.find("table[id=listParameters]").find("tr[id = "+idPar+"]").remove();
                    });
                    linha.append(coluna1);
                    linha.append(coluna2);
                    linha.append(coluna3);
                    tabParam.append(linha);
                    newParam.find("input[id=variavel]").attr("checked",false);
                    newParam.find("input[id=bound]").val("");
                    newParam.find("label[id=nameParamComp]").find("h3").remove();

                },
                Cancel: function() {
                    newParam.dialog( "close" );
                }
            }
            });
        newParam.dialog("open");
    });
    novo.find("a[id=addComponent]").click(function(){
        var newComp = $("#dialog-comp").clone();
        var li = newComp.find("ul[id=listNestedComponents]").find("li");
        for (var i = 0; i < li.length; i++) {
            if(i == li.length-1){
                li[i].onclick = function() {
                    newModalComponent(null,null,null).dialog("open");
                };
            }
            else{
                li[i].onclick = function() {
                    newComp.find("label[id=nameNestedComp]").find("h3").remove();
                    newComp.find("label[id=nameNestedComp]").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
                    loadDetaisComp(this.firstChild.text,newComp.find("div[id=pararNestComp]"),newComp.find("div[id=nestNestedComp]"),newComp.find("div[id=unitNestedComp]"));
                };
            }
        };
        newComp = newComp.dialog({
            autoOpen: false,
            height: 500,
            width: 550,
            modal: true,
            buttons: {
                "Selecionar": function(){
                    var idPar = identifierTabNewPar(novo.find("table[id=addsComponents]").find("tr"));
                    var tabParam = novo.find("table[id=addsComponents]");
                    var linha  = $("<tr/>",{id: idPar});
                    var coluna1 = $("<td/>",{id:0,text: newComp.find("label[id=nameNestedComp]").find("h3").attr("value"),value:newComp.find("label[id=nameNestedComp]").find("h3").attr("value"), style:"width: 100px; color: #FFFFFF;", width: 300});                    
                    var coluna2 = $("<td/>",{id:0, text:"Excluir",style:"color: red;", width: 50 }).click(function(){
                        novo.find("table[id=addsComponents]").find("tr[id = "+idPar+"]").remove();
                    });
                    linha.append(coluna1);
                    var unidades = newComp.find("div[id=unitNestedComp]").find("input");
                    for (var i = 0; i < unidades.length; i++) {
                        if(unidades[i].is(':checked') == true){
                            var coluna = $("<td/>",{text: unidades[i].text});
                            linha.append(coluna);
                        }
                    };
                    linha.append(coluna2);
                    tabParam.append(linha);
                },
                Cancel: function() {
                    newComp.dialog( "close" );
                }
            }
        });
        newComp.dialog("open");
    });
    novo.find("a[id=addUnidade]").click(function(){
        if(novo.find("input[id=nameUnidade]").val() == ""){
            alert("Insira um nome na unidade!");
        }else{
            addUnidade(novo.find("table[id=addsUnidades]"),novo.find("input[id=nameUnidade]").val());
            novo.find("input[id=nameUnidade]").val("");
        }
    });

    novo.find("a[id=saveComponent]").click(function(){
        var a = novo.find("label[id=nameSuperType]").find("h3").attr("value");
        var b = novo.find("input[id=nameComponent]").val();
        if(a == null || b == ""){
            alert("O nome ou o supertipo do componente não foi definido!");
        }else{
            getNewAbstractComponent(novo);
        }
    })

    newComp.click(function() {
        modalNovo.dialog("open");    
    });
    return modalNovo;
}

function getNewAbstractComponent(informationScreen){
    alert("Entrou no novo componente!");
    var nameComponent = informationScreen.find("input[id=nameComponent]").val();
    var supertype = informationScreen.find("label[id=nameSuperType]").find("h3").attr("value");
    var contextParameter = parameters(informationScreen.find("table[id=listParameters]").find("tr"));
    var unitsAbstracts = units(informationScreen.find("table[id=addsUnidades]").find("tr"));
    var nestedComponents = nested(informationScreen.find("table[id=addsComponents]").find("tr"));
    var compObj = {
        name:  nameComponent,
        super: { name: supertype },
        parameters: contextParameter,
        units: unitsAbstracts,
        inners: nestedComponents 
    };
    saveNewAbstractComponent(compObj);
}

function findInfoComponent(nameComponent){
    var parameters = "";
    var nestedComponents = getNestedComponents(nameComponent);                    
    for (var i = 0; i < nestedComponents.length; i++) {
        parameters += " &nbsp;"+nestedComponents[i]+"<br/>";
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
            }}
    });   
}

function loadDetaisComp (component, listParar, listNestedComp, listAbsUnit) {
    listParar.empty();
    listNestedComp.empty();
    listAbsUnit.empty();
    var parar = getContextParameters(component);
    var nested = getNestedComponents(component);
    var unit = getAbstractsUnits(component);

    for (var i = 1; i < parar.length; i++) {
        listParar.append("<h4>"+parar[i]+"<h4>");
    };

    for (var i = 0; i < nested.length; i++) {
        listNestedComp.append("<h4>"+nested[i]+"<h4>");
    };

    for (var i = 0; i < unit.length; i++) {
        listAbsUnit.append("<input type='checkbox' id='ch"+i+"'/><strong><p>"+unit[i]+"</p><strong/>");
    };
}

function addUnidade(table,text){
    var id = identifierTabNewPar(table.find("tr"));
    var row = $("<tr/>",{ id: id });
    var col = $("<td/>",{ text:text, value:text, style:"width: 200px; color: #FFFFFF;"});
    var col2 = $("<td/>",{ text:"Excluir", style:"color: red",  }).click(function(){
        table.find("tr[id="+id+"]").remove();
    });
    row.append(col);
    row.append(col2);
    table.append(row);
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
    var contextParameter = getContextParameters(nameComponent);
    $("#tableParam > tbody > tr").remove();
    document.getElementById("InfoSuper").firstChild.nodeValue = contextParameter[0];
    for (var i = 1; i < contextParameter.length; i++) {
        var idPar = identifierPar();
        var linha  = $("<tr/>", {id: idPar});
        var coluna1 = $("<td/>",{text:contextParameter[i].replace(/_/g," ").toUpperCase(), id:i, style:"width: 100px; color: #FFFFFF;", width: 300});
        var coluna2 = $("<td/>",{id:i, text:"Excluir", onclick:"deleteParamater("+idPar+")",style:"color: red;", width: 50 });
        linha.append(coluna1);
        linha.append(coluna2);
        tabParam.append(linha);
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

function identifierTabNewPar(tableRows){
    for (var i = 0; true; i++) {
        if(existPar(i, tableRows) === false){
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