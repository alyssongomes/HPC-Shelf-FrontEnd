var ELEMENT = null;
var newComp = false;

$(document).ready(function(){
	init();
});

//Inicializar componentes da página
function init() {
    var jsplumb = jsPlumb.getInstance();

    jsPlumb.batch(function(){
        jsPlumb.bind("connection",function(info,originalEvent){
            updateSlicesNested(info, false);
        });

        jsPlumb.bind("connectionDetached",function(info,originalEvent){
            updateSlicesNested(info, true);
        });
    });

    $("#quadro1").tabs();
    $("#trash").droppable({
        drop: function( event, ui ) {
          deleteElement( ui.draggable, jsplumb );
        }
    });

    /* INICIO MODAIS */
    var dialogSuper = $( "#dialog-super" ).dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        modal: true,
        buttons: {
            "Selecionar": function(){
                $("#nameSuperType > h3").remove();
                $("#nameSuperType > p").remove();
                $("#nameSuperType").append("<h3 value='"+$("#nameSuperComp > h3").attr("value")+"'>"+$("#nameSuperComp > h3").attr("value")+"</h3>");
                $("#nameSuperType").append("<p hidden value='"+$("#nameSuperComp > p").attr("value")+"'></p>");
                dialogSuper.dialog( "close" );
            },
            Cancel: function() {
                dialogSuper.dialog( "close" );
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
                addParameter($("#sort2 div[id='"+ELEMENT+"']"),jsplumb);

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
                addComponentNested($("#sort2 div[id='"+ELEMENT+"']"),jsplumb, $("#nameNestedComp > h3").attr("value"), $("#nameNestedComp > p").attr("value"), $("#nameNestedComp > p").attr("id"), $("#nameNestedComp").find("p[id='idSuper']").attr("value") );
                dialogComp.dialog( "close" );
            },
            Cancel: function() {
                dialogComp.dialog( "close" );
            }
        }
    });
    /*FIM MODAIS*/


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
            dialogParam.dialog("open");
        }
    );

    $("#divMenu > ul > li:nth-child(3)").click(
        function () {
            dialogComp.dialog("open");
        }
    );

    $("#divMenu > ul > li:nth-child(5)").click(
        function () {
            if(confirm("Deseja realmente deletar?")){
                deleteElement($("#sort2 div[id='"+ELEMENT+"']"),jsplumb);
            }
        }
    );

    /* FIM MENU POP-UP*/



    /*INICIO BOTÕES*/
    $("#selectType").button().click(function(){
         dialogSuper.dialog( "open" );
    });
    $("#cancelComponent").button().click(function(){
        $("#nameComponent").val("");
        $("#nameSuperType > h3").remove();
        $("#addsUnidades").find("tr").remove();
        $("#listParameters").find("tr").remove();
        $("#addsComponents").find("tr").remove();
    });
    $("#submitComponent").button().click(function(){
        addNewAbstractComponent();
    });
    $("#saveComponent").button().click(function(){
        /*if(newComp){
            alert("Um novo componente já existe!");
        }else{*/
            createNewComponent($("#nameComponent").val(),$("#nameSuperComp > h3").attr("value"));
            $("#newComp").append("<p id='name' hidden value='"+$("#nameComponent").val()+"'></p>");
            $("#newComp").append("<p id='super' hidden value='"+$("#nameSuperComp > h3").attr("value")+"'></p>");
            $("#newComp").append("<p id='idSuper' hidden value='"+$("#nameSuperComp > p").attr("value")+"'></p>");
            $("#nameComponent").val("");
            $("#nameSuperType > h3").remove();
            newComp = true;
        //  }
    });
    /*FIM BOTÕES*/

    loadCompModal();
}

// FUNÇÕES PARA MANINPULAÇÃO DOS ELEMENTOS NA TELA
function createNewComponent(name, supertype){
    var div = $("<div/>",{ id: name, class:"component", oncontextmenu:"showMenu('"+name+"'); return false;"});
    div.css("top","200px");
    div.append($("<h3/>",{ text: name, align:"center"}));
    div.append("<p id= 'name' hidden value='"+name+"'></p>");
    div.append("<p id= 'supertype' hidden value='"+supertype+"'></p>");
    div.append($("<h5/>",{ text: "<<"+supertype+">>", align:"center"}));
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
        linha.append($("<td/>",{text:unidade, value:unidade,style:"color:white; width:200px"}));
        linha.append($("<td/>",{text: "Unit "+number, style:"color:white; width:80px"}));
        var lineDelete = $("<td/>",{text:"DEL", style:"color: red;"});
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
    var coluna1 = $("<td/>",{id:0,text: $("#containerDetailPar").find("input[id=name]").val(),value:$("#containerDetailPar").find("input[id=name]").val(), style:"width: 70px; color: #FFFFFF;", width: 150}).append("<p hidden value='"+$("#containerDetailPar").find("h3").attr("value")+"'></p>");
    var coluna2 = $("<td/>",{id:0, text: $("#variavel").is(':checked')==true? "Compar.":"Local", value: $("#bound").val(),style:"color: blue;", width: 70 });
    var lineDelete = $("<td/>",{id:0, text: "DEL", style: "color: red;"}).click(function(){
        $("#listParameters").find("tr[id="+idPar+"]").remove();
        jsPlumb.deleteEndpoint(ep);
    })
    linha.append(coluna1);
    linha.append(coluna2);
    linha.append(lineDelete);
    tabParam.append(linha);
    $("#variavel").attr("checked",false);
    $("#bound > h3").remove();
    $("#containerDetailPar").find("input[id=name]").val("");
}

function addComponentNested(element, js, name, supertype, id, idSuper){

    var slices = $("#dialog-comp").find("div[id='unitNestedComp']").find("input:checked");
    if(slices.length == 0){
        alert("Nenhuma unidade foi selecionada");
        dialogComp.dialog("open");
    }else{
        var div = $("<div/>",{ id: id, class:"componentNested"});
        var localY = parseInt(element.offset().top);
        var localX = parseInt(element.offset().left);
        div.css("top",(localY+150)+"px").css("left",(localX+20)+"px");
        div.append($("<h3/>",{ text: name, align:"center", style:"color: white;"}));
        div.append("<p id= 'name' hidden value='"+name+"'></p>");
        div.append("<p id= 'supertype' hidden value='"+supertype+"'></p>");
        div.append($("<h5/>",{ text: "<<"+supertype+">>", align:"center", style:"color:white;"}));
        $("#sort2").append(div);
        $("#sort2 > div:not(#trash)").draggable({ cursor:"move"});

        var tableCompNested = $("#addsComponents");
        var line = $("<tr/>", {id: id});
        line.append($("<td/>",{text: name, style:"color:white; width:150px"}));
        line.append($("<td/>",{text: supertype, style:"color:white; width:100px"}));
        var lineDelete = $("<td/>",{text: "DEL", style:"color:red;"}).click(function(){
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

    /*var tableSlices = $("#listSlices");
    var tam = tableSlices.find("tr").length;*/

    //var divSlice = $("<div/>",{class:'slice' /*,id: idUnit*/});
    /*var nameUniSlice = $("<h4/>",{value: slice.name, style:"width:50px;", text:"Slice "+tam});
    divSlice.append(nameUniSlice);
    divSlice.append("<p hidden id='id' value='"+slice.id+"'></p>");
    elementTarget.append(divSlice);*/

    //var divUnid = $("<div/>",{class:'slice' /*,id: idUnit*/});
    /*var nameUni = $("<h4/>",{value: slice.name, style:"width:50px;", text:"Slice "+tam});
    divUnid.append(nameUni);
    divUnid.append("<p hidden id='id' value='"+slice.id+"'></p>");
    elementSource.append(divUnid);*/


    var jsplumb = jsPlumb.getInstance();

    for (var i = 0; i < slices.length; i++) {
        var slice = { name:slices[i].getAttribute("value"), id:slices[i].getAttribute("id") };
        /*var line = $("<tr/>");
        line.append($("<td/>",{id: slice.id, value: slice.name, text: slice.name, style:"color: white; width:150px;"}));
        line.append($("<td/>",{text: "Slice "+tam , style:"color: white;"}));
        tableSlices.append(line);*/

        /*jsPlumb.connect({
            source: elementSource,
            target: elementTarget,
            endpoint : "Rectangle",
            endpointStyle: { width:50, height:30, fillStyle:'#008B8B' },
            connector:"StateMachine",
            deleteEndpointsOnDetach: false,
            reattach: true,
            anchor: "Continuous"
        });*/
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
        });
        jsPlumb.draggable(elementSource);
    };
    jsPlumb.repaintEverything();



    /*jsPlumb.draggable(elementSource);
    jsPlumb.draggable(elementTarget);*/

    /*js.connect({
        source: div,
        target: cloneDiv,
        endpoint : "Rectangle" });
        endpointStyle:{ width:15, height:11, fillStyle:'#666' },
        connector:"StateMachine",
        deleteEndpointsOnDetach: false,
        reattach: true,
        anchor: ["Bottom","Top"]
        scope: "#666",
        connectorStyle : { strokeStyle:"#666" },
        connectorOverlays:[
            [ "Arrow", { width:20, length:20, location: 0.75, id:"arrow" } ]
         ],
        Container: "quadro2",
        anchor: "Continuous"*/
    /*});

    js.draggable(elementSource);
    js.draggable(elementTarget);*/
}

function updateSlicesNested(conn, remove){
    if(remove){
        $("#listSlices").find("tr[id='"+conn.connection.getParameter("idSlice")+"']").remove();
    }else{
        var tableSlices = $("#listSlices");
        var nameSlice = conn.connection.getParameter("nameSlice");
        var compSlice = conn.connection.getParameter("component");
        var line = $("<tr/>", {id: conn.connection.getParameter("idSlice")});
        line.append($("<td/>",{value:nameSlice, text:nameSlice, style:"color:white; width: 150px;"}));
        line.append($("<td/>",{ id: conn.connection.getParameter("idComponent"), value: compSlice, text:compSlice, style:"color:white; width: 50px;"}));
        tableSlices.append(line);

        var linha = $("#addsComponents").find("tr[id='"+ conn.connection.getParameter("idComponent") +"']");
        linha.append("<p class='slices' id='"+conn.connection.getParameter("idSlice")+"' hidden value='"+nameSlice+"'>"+nameSlice+"</p>");
    }
}

function deleteElement(element, js){
    jsPlumb.remove(element);
    element.remove();
    $("#addsUnidades").find("tr").remove();
    $("#listParameters").find("tr").remove();
    $("#addsComponents").find("tr").remove();
}

function addNewAbstractComponent(){
    var nameComponent = $("#newComp").find("p[id='name']").attr("value");;

    var supertype = $("#newComp").find("p[id='super']").attr("value");
    var idsupertype = $("#newComp").find("p[id='idSuper']").attr("value");

    var contextParameter = parameters($("#listParameters").find("tr"));
    var unitsAbstracts = units($("#addsUnidades").find("tr"));
    var unislices = slices($("#listSlices").find("tr"));
    var nestedComponents = nested($("#addsComponents").find("tr"));
    var compObj = {
        name:  nameComponent,
        super: { name: supertype, idAc: parseInt(idsupertype)  },
        parameters: contextParameter,
        units: unitsAbstracts,
        inners: nestedComponents,
        slices: unislices
    };
    saveNewAbstractComponent(compObj);
}

// FUNÇÕES PARA CARREGAR INFORMAÇÕES NA INTERFACE
function loadCompModal () {
    var listComponents = getAbstractComponents();
    for(var i=0; i<listComponents.length;i++){
        var li = $("<li/>",{ value:i, class:"ui-state-default" });
        li.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        li.click(function(){
            $("#nameSuperComp > h3").remove();
            $("#nameSuperComp > p").remove();
            $("#nameSuperComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
            $("#nameSuperComp").append("<p value='"+this.firstChild.getAttribute("id")+"'></p>");
            loadDetaisComp($("#nameSuperComp") ,this.firstChild.text,$("#pararSuper"),$("#nestCompSuper"),$("#unitCompSuper"),$("#nameSuperComp"), $("#slicesCompSuper"), $("#qualytiCompSuper"), $("#costCompSuper"));
        });
        $("#listSuperComponents").append(li);

        var liP = $("<li/>",{ value:i, class:"ui-state-default" });
        liP.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        liP.click(function(){
            $("#bound > h3").remove();
            $("#bound").append("<h3 value='"+this.firstChild.getAttribute("id")+"'>"+this.firstChild.text+"</h3>");
        });
        $("#listParamComponents").append(liP);

        var liC = $("<li/>",{ value:i, class:"ui-state-default" });
        var id = listComponents[i].id;
        liC.append($("<a/>",{id:listComponents[i].id,text:listComponents[i].name, value: listComponents[i].super, href:"#"}));
        liC.click(function(){
            $("#nameNestedComp > h3").remove();
            $("#nameNestedComp > p").remove();
            $("#nameNestedComp").append("<h3 value='"+this.firstChild.text+"'>"+this.firstChild.text+"</h3>");
            $("#nameNestedComp").append("<p hidden id='"+this.firstChild.getAttribute("id")+"' value='"+this.firstChild.getAttribute("value")+"'></p>");
            loadDetaisComp($("#nameNestedComp"), this.firstChild.text,$("#pararNestComp"),$("#nestNestedComp"),$("#unitNestedComp"),$("#nameNestedComp"),$("#slicesNestedComp"), $("#qualytiNestedComp"), $("#costNestedComp"));
        });
        $("#listNestedComponents").append(liC);
    }
}

function loadDetaisComp (viewComp, component, listParar, listNestedComp, listAbsUnit, name, listSlices, listQualities, listCosts) {
    listParar.empty();
    listNestedComp.empty();
    listAbsUnit.empty();
		listSlices.empty();
    listQualities.empty();
    listCosts.empty();
    var parar = getContextParameters(component);
    var nested = getNestedComponents(component);
    var unit = getAbstractsUnits(component);
		var slice = getSlicesComponent(component);
    var quality = getQualityParameter(component);
    var cost = getCostParameter(component);

    viewComp.append("<p id='idSuper' value='"+parar[1]+"'></p>");


    for (var i = 2; i < parar.length; i++) {
        listParar.append("<h4>"+parar[i]+"<h4>");
    };

    for (var i = 0; i < nested.length; i++) {
        listNestedComp.append("<h4>"+nested[i]+"<h4>");
    };

    for (var i = 0; i < unit.length; i++) {
        listAbsUnit.append("<input type='checkbox' value='"+unit[i].name+"' id='"+unit[i].id+"'/><strong>"+unit[i].name+"<strong/></br>");
    };

		for (var i = 0; i < slice.length; i++) {
        listSlices.append("<h4>"+slice[i].name+"<h4>");
    };

    for (var i = 0; i < quality.length; i++) {
        listQualities.append("<h4>"+quality[i].name+"<h4>");
    };

    for (var i = 0; i < cost.length; i++) {
			listCosts.append("<h4>"+cost[i].name+"<h4>");
        //listAbsUnit.append("<input type='checkbox' value='"+unit[i].name+"' id='"+unit[i].id+"'/><strong>"+unit[i].name+"<strong/></br>");
    };
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
