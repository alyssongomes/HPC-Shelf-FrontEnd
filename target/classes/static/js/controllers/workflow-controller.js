const INFO = "INFO";
const SUCCESS = "SUCCESS";
const ALERT = "ALERT";
const ERROR = "ERROR";

//Colors
var mapLabels = new Map();
mapLabels.set("INFO","label label-info");
mapLabels.set("SUCCESS","label label-success");
mapLabels.set("ALERT","label label-warning");
mapLabels.set("ERROR","label label-danger");

//type task to class
var typeTask = new Map();
typeTask.set("invoke_oper","ico_invoke");
typeTask.set("skip_oper","ico_skip");
typeTask.set("break_oper","ico_break");
typeTask.set("continue_oper","ico_continue");
typeTask.set("start_oper","ico_start");
typeTask.set("wait_oper","ico_wait");
typeTask.set("cancel_oper","ico_cancel");
typeTask.set("activate_oper","ico_activate");
typeTask.set("sequence_oper","ico_sequence");
typeTask.set("parallel_oper","ico_parallel");
typeTask.set("choice_oper","ico_choice");
typeTask.set("iterate_oper","ico_iterate");
typeTask.set("arg","ico_docu");


//XSD - Arquitetura e Workflow
var COMPONENTS = null;
var identify = {counter:0};

//Contador de paginas
var workflowsCounter = 2;
//Vetor de páginas, página={árvore de objetos, referencia do objeto zTree, id da página}
var workflowsPage = [];
//Página corrente
var currentPage = 1;

//Quero que a modal apareça
var modalHelp = false;

function setCurrentPage(pageId){
    currentPage = pageId;
    console.log(getCurrentPage().idPage);
}

function getCurrentPage(){
    for(var i = 0; i < workflowsPage.length; i++)
        if(workflowsPage[i].idPage === currentPage)
            return workflowsPage[i];
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

$(document).ready(function(){
	
	//mover o console automaticamente
	window.setInterval(function() {
		var elem = document.getElementById('panel-console-exit');
		elem.scrollTop = elem.scrollHeight;
	}, 500);
	
	//mostrar a janela de ajuda
	if (typeof(Storage) !== "undefined") {
		if(localStorage.viewModalWorkHelp != undefined){
			if (localStorage.viewModalWorkHelp === "true") {
				$("#helpView").prop("checked",true);
		    } else {
		    	$("#modalHelp").modal("show");
		    }
		}else{
			localStorage.viewModalWorkHelp = modalHelp;
			$("#modalHelp").modal("show");
		}
	} else {
	    console.log("Não é possível utilizar o Storage");
	}
	
	$("#helpView").click(function(){
		localStorage.viewModalWorkHelp = localStorage.viewModalWorkHelp === "true"? false:true;
	});
	
	$("#showHelp").click(function(){
		$("#modalHelp").modal("show");
	});
    
    //Paineis de Propriedades
    var task = $("#del-type-task");
    var invoke = $("#del-invoke-oper");
    var iterate = $("#del-iterate-opr");
    var choice = $("#del-choice-opr");
    var base = $("#del-base");
    var primitive = $("#del-oper-prim");
    var arg = $("#del-arg");
    var select = $("#del-select");
    var panels = [invoke,arg,iterate,choice,primitive,select];

    // Objetos e configurações do zTree 
    var zTreeObj;//referencia zTree
    var zTreeArch;//referencia zTree Arch
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        view:{
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false,
            fontCss: getFont,
            nameIsHTML: true
        },
        edit: {
            enable: true,
            showRenameBtn:false,
            showRemoveBtn: showRemoveBtn,
            drag: {
                autoExpandTrigger: true,
            }
        }
    };//configurações da árvore

    
    
    //converter architecture for object zTree
    function convertArchitectureToZTree(arch){
        var root = [];
        var body = arch.body;
        
        //tasks of workflow
        var workflow = {name:arch.workflow.name,id:arch.workflow.id,font:{'font-weight':'bold', 'font-size':'x-large', 'color':'cadetblue'}, open:true,children:[]}
        for(var i = 0; i < arch.workflow.taskPort.length;i++){
            workflow.children.push({
                name:arch.workflow.taskPort[i].name,
                font:{'color':'darkcyan'},
                id:arch.workflow.taskPort[i].id
            });
        }
        root.push(workflow);

        //tasks of the computations and connectors
        for(var j = 0; j < body.computationOrRepositoryOrConnector.length;j++){
            if(body.computationOrRepositoryOrConnector[j].TYPE_NAME === 'org_example_safe_architecture_v4.Connector' || 
               body.computationOrRepositoryOrConnector[j].TYPE_NAME === 'org_example_safe_architecture_v4.Computation' ||
               body.computationOrRepositoryOrConnector[j].TYPE_NAME === 'org_example_safe_architecture_v4.Platform'){
                var obj = {
                    name:body.computationOrRepositoryOrConnector[j].name,
                    font:{'font-weight':'bold', 'font-size':'x-large', 'color':'cadetblue'},
                    id:body.computationOrRepositoryOrConnector[j].id,
                    open:true,
                    children:[]
                };
                if(body.computationOrRepositoryOrConnector[j].taskPort != undefined){
                    //get tasks
                    for(var k = 0; k < body.computationOrRepositoryOrConnector[j].taskPort.length; k++){
                        var task = {
                            name:body.computationOrRepositoryOrConnector[j].taskPort[k].name,
                            id:body.computationOrRepositoryOrConnector[j].taskPort[k].id,
                            font:{'color':'darkcyan'},
                            open:true,
                            children:[]
                        };
                        //get Actions of task
                        for(var l = 0; l < body.computationOrRepositoryOrConnector[j].taskPort[k].action.length; l++){
                            task.children.push({
                                name:body.computationOrRepositoryOrConnector[j].taskPort[k].action[l].name,
                                id:body.computationOrRepositoryOrConnector[j].taskPort[k].action[l].id
                            });
                        }
                        obj.children.push(task);
                    }
                }
                root.push(obj);
            }   
        }
        COMPONENTS = root;
        return root;
    }
    
    //Inicializar funções do menu
    function initMenu(){
        
        $("#new-workflow").click(function(e){
            var count = workflowsCounter++;
            $("#editor > ul").append("<li class='aba'><a href='#work_"+count+"' onclick='setCurrentPage("+count+")'><span class='glyphicon glyphicon-console'></span>work_"+count+"</a><span class='glyphicon glyphicon-remove-circle ui-icon-close' value='"+count+"'></span></li>");
            $("#editor").append("<div id='work_"+count+"'><div class='flow-editable' ><ul id='tree_"+count+"' class='ztree'></ul></div></div>");
            $("#editor").tabs("refresh");

            var workflow = [{
                name:"sequence_oper",
                id: 1,
                pId:null,
                iconOpen:"../img/sequence.png",
                iconClose:"../img/sequence.png",
                icon:"../img/sequence.png",
                open:true,
                drag:true,
                children:[
                    {
                        id:11, pId:1, name:"invoke_oper",
                        iconOpen:"../img/invoke.png",
                        iconClose:"../img/invoke.png",
                        icon:"../img/invoke.png",
                        open:true,
                        drag:true,
                        properties:{
                            base:{
                                order:1,
                                value:"value",
                                oper_name:"invoke_oper",
                                level:1,
                                base_label:"LABEL"
                            },
                            invoke:{
                                action: "compute",
                                componentId: 6
                            }
                        }
                    }],
                properties:{
                    base:{
                        order:1,
                        value:"value",
                        oper_name:"sequence_oper",
                        level:1,
                        base_label:"LABEL"    
                    }
                }}];
            workflowsPage.push({
                workflow: workflow,
                zTreeObj: $.fn.zTree.init($("#tree_"+count), setting, workflow),
                idPage:count
            });

            $("#tree_"+count).click(showProperties);
        });

        $("#save-workflow").click(function(e){
            // REVISAR essa função.
            try{
                out("Gerando objeto...");
                var obj = getCurrentPage();
                var workflow = $.fn.zTree.getZTreeObj("tree_"+obj.idPage).getNodes();
                console.log(workflow);
                var root = Workflow.toJsonix(workflow[0]);
                out("Objeto Convertido", SUCCESS);
            }catch(err){
                console.error(err);
                out("Não foi possível converter o objeto!", ERROR);
            }
        
            try{
                out("Gerando arquivo workflow...");
                generateWorkflow(root,function(result){
                	//$("#download-workflow").attr("href","../file/workflow.xml").attr("download","workflow.xml");
                    out(result+" <a href='../file/workflow.xml' download='workflow.xml'><font color='blue'><b>Baixe o Arquivo aqui</b></font></a>", SUCCESS);
                });
            }catch(err){
                console.log(err);
                out("Não foi possível gerar o workflow!", ERROR);
            }
        });

        $("#load-workflow").click(function(e){
            $("#file-workflow").click();
        });

        $("#load-architecture").click(function(e){
            $("#file-architecture").click();
        });

        $("#clean-out").click(function(e){
            $("#panel-console-exit > p").remove();
        });

    }

    //print no panel de saída
    function out(text, type){
        if(type == null) type = INFO;
        //$("#panel-console-exit").animate({ scrollTop: 1000 }, 3000);
        $("#panel-console-exit").append("<p><span class='"+mapLabels.get(type)+"'>["+type+"]:</span> "+text+"</p>");
    }
    
    
    //Identificador dos nodes
    var newCount = 1;

    function getFont(treeId, node) {
        return node.font ? node.font : {};
    }

    function addHoverDom(treeId, treeNode) {
        if(showEdit(treeId,treeNode) === false) return;
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='add node' onfocus='this.blur();' ></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            var zTree = getCurrentPage().zTreeObj;
            zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"operation", properties:{}});
            newCount++;
            zTree.updateNode(treeNode);
            return false;
        });
    };

    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };

    function showRemoveBtn(treeId, treeNode) {
        var zTreeObj = getCurrentPage().zTreeObj;
        var node = zTreeObj.getNodesByParam("id",treeNode.pId);//pegando o pai do node
        if(node.length === 0)
            return true;
        if(node[0].name === "iterate_oper" || node[0].name === "sequence_oper" || node[0].name === "parallel_oper" || node[0].name === "choice_oper" ||
            node[0].name === "start_oper" || node[0].name === "wait_oper" || node[0].name === "cancel_oper"){
            if(node[0].children.length === 1){
                return false;
            }
        }
        return true;
    }

    function showEdit(treeId, treeNode){
        var zTreeObj = getCurrentPage().zTreeObj;
        var node = zTreeObj.getNodesByParam("id",treeNode.pId);//pegando o pai do node
        if(node.length === 0)
            return true;
        if(node[0].name === "start_oper" || node[0].name === "wait_oper" || node[0].name === "cancel_oper")
            return false;
        node = zTreeObj.getNodesByParam("id",treeNode.id);//pegando o node corrente
        if(node[0].name === "arg" || node[0].name === "start_oper" || node[0].name === "wait_oper" || node[0].name === "cancel_oper")
            return false;
        return true;
    }


    //Funções gerais das propriedades
    function showProperties(){
        var zTreeObj = getCurrentPage().zTreeObj;
        var node = zTreeObj.getSelectedNodes()[0];
        $("#type-task").val(node.name);

        cleanProperties();

        //set values of BASE - início
        if(node.name != "arg"){
            if(node.properties.base !=  undefined){
                $("#order").val(node.properties.base.order);
                $("#value").val(node.properties.base.value);
                $("#oper_name").val(node.properties.base.oper_name);
                $("#level").val(node.properties.base.level);
                $("#base_label").val(node.properties.base.base_label);       
            }else{
                $("#order").val("");
                $("#value").val("");
                $("#oper_name").val("");
                $("#level").val("");
                $("#base_label").val("");       
            }
        }
        //set values of BASE - fim

        switch(node.name){
            case "invoke_oper":
                invoke.show();
                base.show();
                $("#del-invoke-oper").find(".panel-heading").find('p:first').remove();
                $("#del-invoke-oper").find(".panel-heading").append("<p>Invoke</p>");
                if(node.properties.invoke != undefined){
                    $("#action").val(node.properties.invoke.action);
                    $("#components").val(node.properties.invoke.componentId);    
                }else{
                    $("#action").val("");
                    $("#components").val("");
                }
                break;
            case "action":
                invoke.show();
                base.show();
                $("#del-invoke-oper").find(".panel-heading").find('p:first').remove();
                $("#del-invoke-oper").find(".panel-heading").append("<p>Action</p>");
                if(node.properties.action != undefined){
                    $("#action").val(node.properties.action.action);
                    $("#components").val(node.properties.action.componentId);    
                }else{
                    $("#action").val("");
                    $("#components").val("");
                }
                break;
            case "skip_oper":
            case "break_oper":
            case "continue_oper":
            case "activate_oper":
            case "sequence_oper":
            case "parallel_oper":
            case "operation":
                base.show();
                break;
            case "arg":
                arg.show();
                base.hide();
                if(node.properties.arg != undefined){
                    $("#type").val(node.properties.arg.type);
                    $("#value-arg").val(node.properties.arg.value);
                }else{
                    $("#type").val("");
                    $("#value-arg").val("");
                }
                break
            case "start_oper":
            case "wait_oper":
            case "cancel_oper":
                primitive.show();
                base.show();
                if(node.properties.primitive != undefined){
                    $("#handle-id").val(node.properties.primitive.handleId);
                }else{
                    $("#handle-id").val("");
                }
                break;
            case "choice_oper":
                choice.show();
                base.show();
                if(node.properties.choice != undefined){
                    $("#chosen").val(node.properties.choice.chosen);    
                }else{
                    $("#chosen").val("");
                }
                break;
            case "select":
                select.show();
                base.show();
                if(node.properties.select != undefined){
                    $("#select-actions").val(node.properties.select.actionId);    
                }else{
                    $("#select-actions").val("");
                }
                break;
            case "iterate_oper":
                iterate.show();
                base.show();
                if(node.properties.iterate != undefined){
                    $("#max").val(node.properties.iterate.max);
                    $("#iter-label").val(node.properties.iterate.iterLabel);    
                }else{
                    $("#max").val("");
                    $("#iter-label").val("");    
                }
                break;
        } 
    }

    function cleanProperties(){
        for(var i = 0; i < panels.length; i++){
            panels[i].hide();
        }
    }
    
    // Funções para aplicação de propriedades
    function applyNewKind(e){
        if(zTreeArch === undefined){
            out("Submeta um arquivo arquitetural!",ALERT);
            return;
        }
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        var kind = $("#type-task option:selected").attr("value");
        if(kind === "sequence_oper" || kind === "parallel_oper"){
            zTreeObj.addNodes(nodes[0],{name:"operation",pId:nodes[0].id, properties:{
                base:{
                    order:null,value:null,oper_name:null,level:null,base_label:null
                }
            }});
            if(kind === "sequence_oper"){
                nodes[0].icon = "../img/sequence.png"; nodes[0].iconOpen = "../img/sequence.png"; nodes[0].iconClose = "../img/sequence.png";
            }else{
                nodes[0].icon = "../img/parallel.png"; nodes[0].iconOpen = "../img/parallel.png"; nodes[0].iconClose = "../img/parallel.png";
            }
            zTreeObj.updateNode(nodes[0]);
            zTreeObj.expandNode(nodes[0]);
        }
        if(kind === "iterate_oper"){
            nodes[0].icon = "../img/iterator.png"; nodes[0].iconOpen = "../img/iterator.png"; nodes[0].iconClose = "../img/iterator.png";
            nodes[0].properties.base = {
                order:null,value:null,oper_name:null,level:null,base_label:null
            }
            nodes[0].properties.iterate = {max:1,iterLabel:"i"};
            zTreeObj.addNodes(nodes[0],{name:"operation",pId:nodes[0].id, properties:{base:{
                order:null,
                value:null,
                oper_name:null,
                level:null,
                base_label:null
            }}});
            
            zTreeObj.updateNode(nodes[0]);
            zTreeObj.expandNode(nodes[0]);
        }
        if(kind === "choice_oper"){
            nodes[0].icon = "../img/choice.png"; nodes[0].iconOpen = "../img/choice.png"; nodes[0].iconClose = "../img/choice.png";
            nodes[0].properties = {
                base : {
                    order:null,value:null,oper_name:null,level:null,base_label:null  
                },
                choice:{
                   chosen: null 
                }
            };
            zTreeObj.addNodes(nodes[0],{name:"select",pId:nodes[0].id, 
                icon : "../img/select.png", iconOpen: "../img/select.png", iconClose : "../img/select.png",
                properties:{base:{
                    order:null,value:null,oper_name:null,level:null,base_label:null
                },
                select:{
                    actionId:$("#select-actions option:first-child").attr("value")
                }}}
            );
            zTreeObj.updateNode(nodes[0]);
            zTreeObj.expandNode(nodes[0]);
        }
        if(kind === "start_oper" || kind === "cancel_oper" || kind === "wait_oper"){
            nodes[0].properties = {
                base : {
                    order:null,value:null,oper_name:null,level:null,base_label:null  
                },
                primitive:{
                   handleId: null 
                }
            };
            zTreeObj.addNodes(nodes[0],{name:"action",pId:nodes[0].id, icon : "../img/action.png", iconOpen: "../img/action.png", iconClose : "../img/action.png",
            properties:{base:{
                order:null,
                value:null,
                oper_name:null,
                level:null,
                base_label:null
            }}});
            if(kind === "start_oper"){
                nodes[0].icon = "../img/start.png"; nodes[0].iconOpen = "../img/start.png"; nodes[0].iconClose = "../img/start.png";
            }else if(kind === "cancel_oper"){
                nodes[0].icon = "../img/cancel.png"; nodes[0].iconOpen = "../img/cancel.png"; nodes[0].iconClose = "../img/cancel.png";
            }else{
                nodes[0].icon = "../img/wait.png"; nodes[0].iconOpen = "../img/wait.png"; nodes[0].iconClose = "../img/wait.png";
            }
            zTreeObj.updateNode(nodes[0]);
            zTreeObj.expandNode(nodes[0]);
        }
        if(kind === "invoke_oper" || kind === "action"){
            nodes[0].properties.base = {
                order:null,
                value:null,
                oper_name:null,
                level:null,
                base_label:null  
            }
            if(kind === "invoke_oper"){
                nodes[0].icon = "../img/invoke.png"; nodes[0].iconOpen = "../img/invoke.png"; nodes[0].iconClose = "../img/invoke.png";
                nodes[0].properties.invoke = {
                    action:"resolve",
                    componentId: $("#components option:first-child").attr("value")
                }
            }else if(kind === "action"){
                nodes[0].icon = "../img/action.png"; nodes[0].iconOpen = "../img/action.png"; nodes[0].iconClose = "../img/action.png";
                nodes[0].properties.action = {
                    action:"resolve",
                    componentId:$("#components option:first-child").attr("value")
                }
            }
        }
        if(kind === "arg"){
            var node = zTreeObj.getNodesByParam("id",nodes[0].pId);//pegando o parent do node.
            if(node.length > 0){
                if(node[0].name === "invoke_oper" || node[0].name === "action"){
                    nodes[0].icon = "../img/arg.png"; nodes[0].iconOpen = "../img/arg.png"; nodes[0].iconClose = "../img/arg.png";
                    nodes[0].properties.arg = {
                        type:"STRING",
                        value:"null"
                    }
                }else{
                    out("Um ARGUMENT só pode ser incluído em INVOKE's ou ACTION's.",ERROR);
                    return;
                }
            }else{
                out("Node não encontrado",ALERT);
                return;
            }
        }
        if(kind === "select"){
            var node = zTreeObj.getNodesByParam("id",nodes[0].pId);//pegando o parent do node.
            if(node.length > 0){
                if(node[0].name === "choice_oper"){
                    nodes[0].icon = "../img/select.png"; nodes[0].iconOpen = "../img/select.png"; nodes[0].iconClose = "../img/select.png";
                    nodes[0].properties.base = {
                        order:null,value:null,oper_name:null,level:null,base_label:null
                    };
                    nodes[0].properties.select = {
                        actionId:$("#select-actions option:first-child").attr("value")
                    };
                }else{
                    out("Um SELECT só pode ser incluído em CHOICE's",ERROR);
                    return;
                }
            }else{
                out("Node não encontrado",ALERT);
                return;
            }
            
        }
        
        if(kind === "break_oper"){
            nodes[0].iconOpen="../img/break.png";nodes[0].iconClose="../img/break.png";nodes[0].icon="../img/break.png";
            nodes[0].properties.base = {
                order:null,value:null,oper_name:null,level:null,base_label:null
            }
        }else if(kind === "activate_oper"){
            nodes[0].iconOpen="../img/activate.png";nodes[0].iconClose="../img/activate.png";nodes[0].icon="../img/activate.png";
            nodes[0].properties.base = {
                order:null,value:null,oper_name:null,level:null,base_label:null
            }
        }else if(kind === "skip_oper"){
            nodes[0].iconOpen="../img/skip.png";nodes[0].iconClose="../img/skip.png";nodes[0].icon="../img/skip.png";
            nodes[0].properties.base = {
                order:null,value:null,oper_name:null,level:null,base_label:null
            }
        }else if(kind === "continue_oper"){
            nodes[0].iconOpen="../img/continue.png";nodes[0].iconClose="../img/continue.png";nodes[0].icon="../img/continue.png";
            nodes[0].properties.base = {
                order:null,value:null,oper_name:null,level:null,base_label:null
            }
        }
        nodes[0].name = kind;
        nodes[0].open = true;
        zTreeObj.updateNode(nodes[0]);
        
        $("#"+nodes[0].tId+"_ico").removeClass("ico_docu").removeClass("ico_open").removeClass("ico_close");
        $("#"+nodes[0].tId+"_ico").addClass(typeTask.get(nodes[0].name));
        
        out("Novo tipo atualizado!");
        showProperties();
    }
    
    function applyInvoke(e){
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        if(nodes[0].name === "invoke_oper"){
            nodes[0].properties.invoke = {
            action: $("#action option:selected").attr("value"),
            componentId: $("#components option:selected").attr("value")
            };
            out("Invoke atualizado!");   
        }else{
            nodes[0].properties.action = {
            action: $("#action option:selected").attr("value"),
            componentId: $("#components option:selected").attr("value")
            };
            out("Action atualizada!");   
        }
        showProperties();
    }
    
    function applyIterate(e){
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        if($("#iter-label").val() != ""){
            nodes[0].properties.iterate = {
                max:$("#max").val(),
                iterLabel:$("#iter-label").val()
            };
            out("Iterate atualizado!");
            showProperties();
        }else{
            out("Insira um valor para o rótulo do iterate!",ERROR);
        }
    }
    
    function applySelect(e){
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        nodes[0].properties.select = {
            actionId: $("#select-actions").val()
        };
        out("Select atualizado!");
        showProperties();
    }
    
    function applyChoice(e){
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        nodes[0].properties.choice = {
            chosen: $("#chosen").val()
        };
        out("Choice atualizado!");
        showProperties();
    }
    
    function applyArg(e){
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        if($("#value-arg").val() != ""){
            nodes[0].properties.arg = {
                type:$("#type").val(),
                value:$("#value-arg").val()
            };
            out("Arg atualizado!");
            showProperties();
        }else{
            out("Insira um valor para o argumento!",ERROR);
        }
        
    }
    
    function applyPrimitive(e){
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        nodes[0].properties.primitive = {
            handleId: $("#handle-id").val()
        };
        out("Primitive atualizado!");
        showProperties();
    }
    
    function applyBase(e){
        var zTreeObj = getCurrentPage().zTreeObj;
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length === 0){
        	out("Selecione uma operação!",ERROR);
        	return;
        }
        nodes[0].properties.base = {
            order: $("#order").val(),
            value:$("#value").val(),
            oper_name:$("#oper_name").val(),
            level:$("#level").val(),
            base_label:$("#base_label").val()   
        }
        out("Base atualizado!");
        showProperties();
    };
        
    
    
    /* Incializando elementos da interface */
    
    $("#editor").tabs();
    $("#editor").tabs().on("click","span.ui-icon-close", function() {
        
        for(var i in workflowsPage){
            if(workflowsPage[i].idPage === parseInt($(this).attr("value")))
                workflowsPage.splice(i,1);
        }
        
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#"+panelId).remove();
        $("#editor").tabs("refresh");
        
    });
    
    $("#context").tabs();
    $("#console").tabs();
    
    $('.dropdown-submenu a.test').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
    
    //Verificação da arquitetura
    if(zTreeArch === undefined){
        out("Submeta um arquivo arquitetural!",ALERT);
    }
    
    //Inicializando a primeira página
    try{
        var workflow = [
                {
                    name:"sequence_oper",
                    id: 1,
                    pId: null,
                    iconOpen:"../img/sequence.png",
                    iconClose:"../img/sequence.png",
                    icon:"../img/sequence.png",
                    open:true,
                    drag:true,
                    children:[
                        {
                            id:11, pId:11, name:"operation",
                            open:true,
                            drag:true,
                            properties:{}
                        }
                    ],
                    properties:{
                        base:{
                            order:null,
                            value:null,
                            oper_name:null,
                            level:null,
                            base_label:null
                        }
                    }
                }
            ];
        workflowsPage.push({
            workflow: workflow,
            zTreeObj: $.fn.zTree.init($("#tree_1"), setting, workflow),
            idPage:1
        });
    }catch(err){
        out("Não foi possível iniciar a zTree!",ERROR);
    }
    
    //Inicializando a primeira árvore
    $("#tree_1").click(showProperties);
    
    //Botões das propriedades
    $("#btn-apply-type-task").click(applyNewKind);
    $("#btn-apply-invoke").click(applyInvoke);
    $("#btn-apply-iterate").click(applyIterate);
    $("#btn-apply-choice").click(applyChoice);
    $("#btn-apply-select").click(applySelect);
    $("#btn-apply-arg").click(applyArg);
    $("#btn-apply-prim").click(applyPrimitive);
    $("#btn-apply-base").click(applyBase);
    
    //Select dos tipos de dados
    $("#type").click(function(e){
        if($(this).val() === "INTEGER"){
            $("#value-arg").attr("type","number");
        }else if($(this).val() === "DOUBLE"){
            $("#value-arg").attr("type","number");
            $("#value-arg").attr("step","any");
        }else{
            $("#value-arg").attr("type","text");
            
        }
    });
    
    
    //Inicializando as opções da barra de menu
    initMenu();
    
    $("#file-workflow").change(function (){
       var file = $(this).get(0).files[0];

       var reader = new FileReader();
       reader.onload = function (e) {
           out("Lendo arquivo...");
           try{
               //new file workflow loaded
               var fileWorkflow = e.target.result;
               
               getWorkflow(fileWorkflow,function(result){
                    console.log(result);
                    workflow = Workflow.toZtree(result.value, identify);
                    if(workflow != undefined){
                        var zTreeObj = getCurrentPage().zTreeObj;
                        zTreeObj.addNodes(null, workflow);    
                        out("Workflow lido com sucesso!", SUCCESS);
                    }else{
                        out("Não foi possível ler o arquivo.", ERROR);
                    }
                });
           }catch(err){
               console.error(err);
               out("Não foi possível ler o arquivo.",ERROR);
           }
           
       };
       reader.readAsText(file);
     });
    
    $("#file-architecture").change(function (){
        var file = $(this).get(0).files[0];

       var reader = new FileReader();
       reader.onload = function (e) {
           out("Lendo arquivo...");
            try{
                //new file workflow loaded
                var fileArchitecture = e.target.result;
                
                getArchitecture(fileArchitecture,function(result){
                    zTreeArch = $.fn.zTree.init($("#arch"), {view: {fontCss: getFont}}, convertArchitectureToZTree(result.value));

                    //get Components
                    for(var i = 1; i < COMPONENTS.length; i++){
                        $("#components").append("<option value="+COMPONENTS[i].id+">"+COMPONENTS[i].name+"</option>");
                        //get tasks
                        for(var j = 0; j < COMPONENTS[i].children.length; j++){
                            //get actions
                            for(var k = 0; k < COMPONENTS[i].children[j].children.length; k++){
                                $("#components").append("<option value="+COMPONENTS[i].children[j].children[k].id+">"+COMPONENTS[i].children[j].children[k].name+" - "+COMPONENTS[i].children[j].name+"</option>");
                                $("#select-actions").append("<option value="+COMPONENTS[i].children[j].children[k].id+">"+COMPONENTS[i].children[j].children[k].name+" - "+COMPONENTS[i].children[j].name+"</option>");                    
                            }
                        }
                    }
                });
                out("Arquitetura carregada!", SUCCESS);
                $("#ui-id-3").click();
            }catch(err){
                console.error(err);
                out("Não foi possível carregar a arquitetura!", ERROR);
            }
       }
       reader.readAsText(file);
    });
    
    cleanProperties();
});