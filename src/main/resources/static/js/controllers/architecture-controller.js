const WORKFLOW = 1; // a definir
const PLATFORM = 2; 
const COMPUTATION = 4;
const CONNECTOR = 5; 
const DATASOURCE = 7; 


var listWorkflow = [];
var listComputation = [];
var listConnector = [];
var listRepository = [];
var listPlatform = [];

var envBinding = [];
var taskBinding  = [];
var workflow = null;
var body = null;
var aux = null;

$(document).ready(function(){
	init();
});

function init(){
	
	jsPlumb.batch(function(){
        jsPlumb.bind("connection",function(info,originalEvent){
            if(info.sourceEndpoint.getParameter("type") === "task"){
            	var leftId = info.sourceEndpoint.getParameter("id");
            	var left = info.sourceEndpoint.getParameter("name");
            	var right = info.targetEndpoint.getParameter("name");
            	$("#table-task-binding").append("<tr id='"+leftId+"'><td>"+left+"</td><td>"+right+"</td></tr>");
            	taskBinding.push({
            		leftPeer: {id:info.sourceEndpoint.getParameter("id"), idComponent: info.sourceEndpoint.getParameter("idComponent"), name:info.sourceEndpoint.getParameter("name")},
            		rightPeer: {id:info.targetEndpoint.getParameter("id"), idComponent:info.targetEndpoint.getParameter("idComponent") , name:info.targetEndpoint.getParameter("name")}
            	});
            }else{
            	var useId = info.sourceEndpoint.getParameter("id");
            	var use = info.sourceEndpoint.getParameter("name")
            	var provide = info.targetEndpoint.getParameter("name");
            	$("#table-env-binding").append("<tr id='"+useId+"'><td>"+use+"</td><td>"+provide+"</td></tr>");
            	envBinding.push({
            		usesPort: {id:info.sourceEndpoint.getParameter("id"), idComponent: info.sourceEndpoint.getParameter("idComponent"), name:info.sourceEndpoint.getParameter("name")},
            		providesPort: {id:info.targetEndpoint.getParameter("id"), idComponent:info.targetEndpoint.getParameter("idComponent") , name:info.targetEndpoint.getParameter("name")}
            	});
            }
        });

        jsPlumb.bind("connectionDetached",function(info,originalEvent){
        	var id = parseInt(info.sourceEndpoint.getParameter("id"));
        	if(info.sourceEndpoint.getParameter("type") === "task"){
        		$("#table-task-binding").find("tr[id="+info.sourceEndpoint.getParameter("id")+"]").remove();
        		var index = taskBinding.indexOf(id);
        		if (index > -1) {
        			taskBinding.splice(index, 1);
        		}
        		
            }else{
            	$("#table-env-binding").find("tr[id="+info.sourceEndpoint.getParameter("id")+"]").remove();
            	var index = envBinding.indexOf(id);
        		if (index > -1) {
        			envBinding.splice(index, 1);
        		}
            }
        });
    });
	
	$("#navSaveApp").click(function(){
		saveApplication();
	});
	
	$("#btn-workflow").click(function(){
		//alert("Workflow");
		$("#title-modal > p").remove();
		$("#title-modal").append("<p>Selecione um Workflow</p>");
		selectComponent(WORKFLOW);
	});
	$("#btn-computation").click(function(){
		//alert("Computation");
		$("#title-modal > p").remove();
		$("#title-modal").append("<p>Selecione uma Computação</p>");
		selectComponent(COMPUTATION);
	});
	$("#btn-repository").click(function(){
		//alert("repository");
		$("#title-modal > p").remove();
		$("#title-modal").append("<p>Selecione um Repositório</p>");
		selectComponent(DATASOURCE);
	});
	$("#btn-connector").click(function(){
		//alert("connector");
		$("#title-modal > p").remove();
		$("#title-modal").append("<p>Selecione um Conector</p>");
		selectComponent(CONNECTOR);
	});
	$("#btn-platform").click(function(){
		//alert("platform");
		$("#title-modal > p").remove();
		$("#title-modal").append("<p>Selecione uma Plataforma</p>");
		selectComponent(PLATFORM);
	});
	$("#addComponent").click(function(){
		switch(aux.kind){
		case WORKFLOW:
			createWorkflow(aux.obj.id,aux.obj.name, aux.obj.taskPort, aux.obj.providesPort, aux.obj.usesPort);
			break;
		case PLATFORM:
			createPlatform(aux.obj.id, aux.obj.name, aux.obj.providesPort,aux.obj.usesPort );
			break;
		case COMPUTATION:
			createComputation(aux.obj.id, aux.obj.name, aux.obj.taskPort, aux.obj.providesPort,aux.obj.usesPort );
			break;
		case CONNECTOR:
			createConnector(aux.obj.id, aux.obj.name, aux.obj.taskPort, aux.obj.providesPort,aux.obj.usesPort );
			break;
		case DATASOURCE:
			createRepository(aux.obj.id, aux.obj.name, aux.obj.providesPort,aux.obj.usesPort );
			break
		}
	});
	$("#trash").droppable({
        drop: function( event, ui ) {
          deleteElement( ui.draggable, jsplumb );
        }
    });
	
	getApplication(function(application){
		
		workflow = application.value.workflow;
		listWorkflow.push(workflow);
		
		body = application.value.body;
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Computation"){
				var computation = application.value.body.computationOrRepositoryOrConnector[i];
				listComputation.push(computation);
			}
		}
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Connector"){
				var connector = application.value.body.computationOrRepositoryOrConnector[i];
				listConnector.push(connector);
			}
		}
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Repository"){
				var repository = application.value.body.computationOrRepositoryOrConnector[i];
				listRepository.push(repository);
			}
		}
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Platform"){
				var platform = application.value.body.computationOrRepositoryOrConnector[i];
				listPlatform.push(platform);
			}
		}
	})

}

function createWorkflow(id,name,listTaskPort, listProvidesPort, listUsesPort){
	var divWorkflow = $("<div/>",{id:id, value:name, class:"workflow"});
	divWorkflow.append($("<h4/>",{text:name}));
	$("#workspace-body").append(divWorkflow);
	
	for(var i=0; i<listTaskPort.length; i++){
		jsPlumb.addEndpoint(divWorkflow,{
			isSource:true,
			endpoint:"Rectangle",
	        endpointStyle:{width:20,height: 20,fillStyle:'#008B8B'},
	        anchor: "Continuous",
	        connectorOverlays:[ 
	          [ "Arrow", { width:20, length:30, location:1, id:"arrow" } ],
	          [ "Label", { label:listTaskPort[i].name, id:"label" } ]
	        ],
	        parameters:{
                "id": listTaskPort[i].id,
                "idComponent": listTaskPort[i].idComponent,
                "name": listTaskPort[i].name,
                "type":"task"
            },
            scope: "task"
		});
	}
	
	if(listProvidesPort != null){
		for(var i=0; i<listProvidesPort.length; i++){
			jsPlumb.addEndpoint(divWorkflow,{
				isTarget: true,
				overlays:[ 
		          "Arrow", 
		            [ "Label", { label:listProvidesPort[i].name,  location:[0.5, -0.5], id:"myLabel" } ]
		          ],
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'#008B8B'},
		        anchor: "Right",
		        parameters:{
	                "id": listProvidesPort[i].id,
	                "idComponent": listProvidesPort[i].idComponent,
	                "name": listProvidesPort[i].name,
	                "type":"provide"
	            }
			});
		}
	}
	
	if(listUsesPort != null){
		for(var i=0; i<listUsesPort.length; i++){
			jsPlumb.addEndpoint(divWorkflow,{
				isSource: true,
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'##008B8B'},
		        anchor: "Continuous",
		        connectorOverlays:[ 
		          [ "Label", { label:listUsesPort[i].name, id:"label" } ]
		        ],
		        parameters:{
	                "id": listUsesPort[i].id,
	                "idComponent": listUsesPort[i].idComponent,
	                "name": listUsesPort[i].name,
	                "type":"use"
	            }
			});
		}
	}
	jsPlumb.repaintEverything();
	jsPlumb.draggable($(".workflow"));
}

function createComputation(id,name,listTaskPort, listProvidesPort, listUsesPort){
	var divComputation= $("<div/>",{id:id, value:name, class:"computation"});
	divComputation.append($("<h4/>",{text:name}));
	$("#workspace-body").append(divComputation);
	
	for(var i=0; i<listTaskPort.length; i++){
		jsPlumb.addEndpoint(divComputation,{
			isSource:true,
			isTarget: true,
			endpoint:"Rectangle",
	        endpointStyle:{width:20,height: 20,fillStyle:'#008B8B'},
	        anchor: "Continuous",
	        connectorOverlays:[ 
 	          [ "Arrow", { width:20, length:30, location:1, id:"arrow" } ],
 	          [ "Label", { label:listTaskPort[i].name, id:"label" } ]
 	        ],
 	       parameters:{
               "id": listTaskPort[i].id,
               "idComponent": listTaskPort[i].idComponent,
               "name": listTaskPort[i].name,
               "type":"task"
           },
           scope: "task"
		});
	}
	
	if(listProvidesPort != null){
		for(var i=0; i<listProvidesPort.length; i++){
			jsPlumb.addEndpoint(divComputation,{
				isTarget: true,
				overlays:[ 
		          "Arrow", 
		            [ "Label", { label:listProvidesPort[i].name,  location:[0.5, -0.5], id:"myLabel" } ]
		          ],
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'#008B8B'},
		        anchor: "Right",
		        parameters:{
	                "id": listProvidesPort[i].id,
	                "idComponent": listProvidesPort[i].idComponent,
	                "name": listProvidesPort[i].name,
	                "type":"provide"
	            }
			});
		}
	}
	
	if(listUsesPort != null){
		for(var i=0; i<listUsesPort.length; i++){
			jsPlumb.addEndpoint(divComputation,{
				isSource: true,
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'##008B8B'},
	            anchor: "Continuous",
		        connectorOverlays:[ 
		          [ "Label", { label:listUsesPort[i].name, id:"label" } ]
		        ],
		        parameters:{
	                "id": listUsesPort[i].id,
	                "idComponent": listUsesPort[i].idComponent,
	                "name": listUsesPort[i].name,
	                "type":"use"
	            }
			});
		}
	}
	jsPlumb.repaintEverything();
	jsPlumb.draggable($(".computation"));
}

function createPlatform(id, name,listProvidesPort, listUsesPort){
	var divPlatform = $("<div/>",{id:id, value:name, class:"platform"});
	divPlatform.append($("<h4/>",{text:name}));
	$("#workspace-body").append(divPlatform);
	
	if(listProvidesPort != null){
		for(var i=0; i<listProvidesPort.length; i++){
			jsPlumb.addEndpoint(divPlatform,{
				isTarget: true,
				overlays:[ 
		          "Arrow", 
		            [ "Label", { label:listProvidesPort[i].name,  location:[0.5, -0.5], id:"myLabel" } ]
		          ],
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'#008B8B'},
		        anchor: "Continuous",
		        parameters:{
	                "id": listProvidesPort[i].id,
	                "idComponent": listProvidesPort[i].idComponent,
	                "name": listProvidesPort[i].name,
	                "type":"provide"
	            }
			});
		}
	}
	
	if(listUsesPort != null){
		for(var i=0; i<listUsesPort.length; i++){
			jsPlumb.addEndpoint(divPlatform,{
				isSource: true,
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'##008B8B'},
		        anchor: "Continuous",
		        connectorOverlays:[ 
		          [ "Label", { label:listUsesPort[i].name, id:"label" } ]
		        ],
		        parameters:{
	                "id": listUsesPort[i].id,
	                "idComponent": listUsesPort[i].idComponent,
	                "name": listUsesPort[i].name,
	                "type":"use"
	            }
			});
		}
	}
	jsPlumb.repaintEverything();
	jsPlumb.draggable($(".platform"));
}

function createRepository(id,name,listProvidesPort, listUsesPort){
	var divRepository = $("<div/>",{id:id, value:name, class:"repository"});
	divRepository.append($("<h4/>",{text:name}));
	$("#workspace-body").append(divRepository);
	
	if(listProvidesPort != null){
		for(var i=0; i<listProvidesPort.length; i++){
			jsPlumb.addEndpoint(divRepository,{
				isTarget: true,
				overlays:[ 
		          "Arrow", 
		            [ "Label", { label:listProvidesPort[i].name,  location:[0.5, -0.5], id:"myLabel" } ]
		          ],
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'#008B8B'},
		        anchor: "Right",
		        parameters:{
	                "id": listProvidesPort[i].id,
	                "idComponent": listProvidesPort[i].idComponent,
	                "name": listProvidesPort[i].name,
	                "type":"provide"
	            }
			});
		}
	}
	
	if(listUsesPort != null){
		for(var i=0; i<listUsesPort.length; i++){
			jsPlumb.addEndpoint(divRepository,{
				isSource: true,
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'##008B8B'},
		        anchor: "Continuous",
		        connectorOverlays:[ 
		          [ "Label", { label:listUsesPort[i].name, id:"label" } ]
		        ],
		        parameters:{
	                "id": listUsesPort[i].id,
	                "idComponent": listUsesPort[i].idComponent,
	                "name": listUsesPort[i].name,
	                "type":"use"
	            }
			});
		}
	}
	jsPlumb.repaintEverything();
	jsPlumb.draggable($(".repository"));
}

function createConnector(id,name, listTaskPort, listProvidesPort, listUsesPort){
	var divConnector= $("<div/>",{id:id, value:name, class:"connector"});
	divConnector.append($("<h4/>",{text:name}));
	$("#workspace-body").append(divConnector);
	
	for(var i=0; i<listTaskPort.length; i++){
		jsPlumb.addEndpoint(divConnector,{
			isSource:true,
			isTarget: true,
			endpoint:"Rectangle",
	        endpointStyle:{width:20,height: 20,fillStyle:'#008B8B'},
	        anchor: "Continuous",
	        connectorOverlays:[ 
 	          [ "Arrow", { width:20, length:30, location:1, id:"arrow" } ],
 	          [ "Label", { label:listTaskPort[i].name, id:"label" } ]
 	        ],
 	       parameters:{
               "id": listTaskPort[i].id,
               "idComponent": listTaskPort[i].idComponent,
               "name": listTaskPort[i].name,
               "type":"task"
           },
           scope: "task"
		});
	}
	
	if(listProvidesPort != null){
		for(var i=0; i<listProvidesPort.length; i++){
			jsPlumb.addEndpoint(divConnector,{
				isTarget: true,
				overlays:[ 
		          "Arrow", 
		            [ "Label", { label:listProvidesPort[i].name,  location:[0.5, -0.5], id:"myLabel" } ]
		          ],
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'#008B8B'},
		        anchor: "Right",
		        parameters:{
		               "id": listProvidesPort[i].id,
		               "idComponent": listProvidesPort[i].idComponent,
		               "name": listProvidesPort[i].name,
		               "type":"provide"
		           }
			});
		}
	}
	
	if(listUsesPort != null){
		for(var i=0; i<listUsesPort.length; i++){
			jsPlumb.addEndpoint(divConnector,{
				isSource: true,
				endpoint:"Dot",
		        endpointStyle:{fillStyle:'##008B8B'},
		        anchor: "Continuous",
		        connectorOverlays:[ 
		          [ "Label", { label:listUsesPort[i].name, id:"label" } ]
		        ],
		        parameters:{
		               "id": listUsesPort[i].id,
		               "idComponent": listUsesPort[i].idComponent,
		               "name": listUsesPort[i].name,
		               "type":"use"
		           }
			});
		}
	}
	jsPlumb.repaintEverything();
	jsPlumb.draggable($(".connector"));
}

function selectComponent(kindComponent){
	
	$("#nameComp").find("p").remove();
	$("#listTaskPort").find("tr").remove();
	$("#listProvidesPort").find("tr").remove();
	$("#listUsesPort").find("tr").remove();
	
	$("#modalComp").modal("show");
	listComponents = $("#listComponents"); 
	listComponents.find("li").remove();
	switch(kindComponent){
		case WORKFLOW:
			for(var i=0; i<listWorkflow.length;i++){
				listComponents.append($("<li>").append($("<a onclick='showComponent("+WORKFLOW+","+i+")' >"+listWorkflow[i].name+"</a>")));
			}
			break;
		case PLATFORM:
			for(var i=0; i<listPlatform.length;i++){
				listComponents.append($("<li>").append($("<a onclick='showComponent("+PLATFORM+","+i+")' >"+listPlatform[i].name+"</a>")));
			}
			break;
		case COMPUTATION:
			for(var i=0; i<listComputation.length;i++){
				listComponents.append($("<li>").append($("<a onclick='showComponent("+COMPUTATION+","+i+")' >"+listComputation[i].name+"</a>")));
			}
			break;
		case CONNECTOR:
			for(var i=0; i<listConnector.length;i++){
				listComponents.append($("<li>").append($("<a onclick='showComponent("+CONNECTOR+","+i+")' >"+listConnector[i].name+"</a>")));
			}
			break;
		case DATASOURCE:
			for(var i=0; i<listRepository.length;i++){
				listComponents.append($("<li>").append($("<a onclick='showComponent("+DATASOURCE+","+i+")' >"+listRepository[i].name+"</a>")));
			}
			break;
	}
}

function showComponent(kindComponent, index){
	$("#nameComp").find("p").remove();
	$("#listTaskPort").find("tr").remove();
	$("#listProvidesPort").find("tr").remove();
	$("#listUsesPort").find("tr").remove();
	
	switch(kindComponent){
	case WORKFLOW:
		$("#nameComp").append("<p>"+listWorkflow[index].name+"</p>");
		if(listWorkflow[index].taskPort != undefined){
			for(var j=0;j<listWorkflow[index].taskPort.length;j++){
				$("#listTaskPort").append("<tr><td>"+listWorkflow[index].taskPort[j].name+"</td></tr>");
			}
		}
		if(listWorkflow[index].providesPort != undefined){
			for(var j=0;j<listWorkflow[index].providesPort.length;j++){
				$("#listProvidesPort").append("<tr><td>"+listWorkflow[index].providesPort[j].name+"</td></tr>");
			}
		}
		if(listWorkflow[index].usesPort != undefined){
			for(var j=0;j<listWorkflow[index].usesPort.length;j++){
				$("#listUsesPort").append("<tr><td>"+listWorkflow[index].usesPort[j].name+"</td></tr>");
			}
		}
		aux = {"kind":WORKFLOW,"obj":listWorkflow[index]};
		break;
	case PLATFORM:
		$("#nameComp").append("<p>"+listPlatform[index].name+"</p>");
		if(listPlatform[index].taskPort != undefined){
			for(var j=0;j<listPlatform[index].taskPort.length;j++){
				$("#listTaskPort").append("<tr><td>"+listPlatform[index].taskPort[j].name+"</td></tr>");
			}
		}
		if(listPlatform[index].providesPort != undefined){
			for(var j=0;j<listPlatform[index].providesPort.length;j++){
				$("#listProvidesPort").append("<tr><td>"+listPlatform[index].providesPort[j].name+"</td></tr>");
			}
		}
		if(listPlatform[index].usesPort != undefined){
			for(var j=0;j<listPlatform[index].usesPort.length;j++){
				$("#listUsesPort").append("<tr><td>"+listPlatform[index].usesPort[j].name+"</td></tr>");
			}
		}
		aux = {"kind":PLATFORM,"obj":listPlatform[index]};
		break;
	case COMPUTATION:
		$("#nameComp").append("<p>"+listComputation[index].name+"</p>");
		if(listComputation[index].taskPort != undefined){
			for(var j=0;j<listComputation[index].taskPort.length;j++){
				$("#listTaskPort").append("<tr><td>"+listComputation[index].taskPort[j].name+"</td></tr>");
			}
		}
		if(listComputation[index].providesPort != undefined){
			for(var j=0;j<listComputation[index].providesPort.length;j++){
				$("#listProvidesPort").append("<tr><td>"+listComputation[index].providesPort[j].name+"</td></tr>");
			}
		}
		if(listComputation[index].usesPort != undefined){
			for(var j=0;j<listComputation[index].usesPort.length;j++){
				$("#listUsesPort").append("<tr><td>"+listComputation[index].usesPort[j].name+"</td></tr>");
			}
		}
		aux = {"kind":COMPUTATION,"obj":listComputation[index]};
		break;
	case CONNECTOR:
		$("#nameComp").append("<p>"+listConnector[index].name+"</p>");
		if(listConnector[index].taskPort != undefined){
			for(var j=0;j<listConnector[index].taskPort.length;j++){
				$("#listTaskPort").append("<tr><td>"+listConnector[index].taskPort[j].name+"</td></tr>");
			}
		}
		if(listConnector[index].providesPort != undefined){
			for(var j=0;j<listConnector[index].providesPort.length;j++){
				$("#listProvidesPort").append("<tr><td>"+listConnector[index].providesPort[j].name+"</td></tr>");
			}
		}
		if(listConnector[index].usesPort != undefined){
			for(var j=0;j<listConnector[index].usesPort.length;j++){
				$("#listUsesPort").append("<tr><td>"+listConnector[index].usesPort[j].name+"</td></tr>");
			}
		}
		aux = {"kind":CONNECTOR,"obj":listConnector[index]};
		break;
	case DATASOURCE:
		$("#nameComp").append("<p>"+listRepository[index].name+"</p>");
		if(listRepository[index].taskPort != undefined){
			for(var j=0;j<listRepository[index].taskPort.length;j++){
				$("#listTaskPort").append("<tr><td>"+listRepository[index].taskPort[j].name+"</td></tr>");
			}
		}
		if(listRepository[index].providesPort != undefined){
			for(var j=0;j<listRepository[index].providesPort.length;j++){
				$("#listProvidesPort").append("<tr><td>"+listRepository[index].providesPort[j].name+"</td></tr>");
			}
		}
		if(listRepository[index].usesPort != undefined){
			for(var j=0;j<listRepository[index].usesPort.length;j++){
				$("#listUsesPort").append("<tr><td>"+listRepository[index].usesPort[j].name+"</td></tr>");
			}
		}
		aux = {"kind":DATASOURCE,"obj":listRepository[index]};
		break;
	}
}

function deleteElement(element, js){
	jsPlumb.remove(element);
    element.remove();
}

function saveApplication(){
	var architeture = {
			applicationName: "Aplicacao-Teste",
			application:{id:0, name:"Aplicacao-Teste"},
			workflow: workflow,
			body: body,
			envBinding: envBinding ,
			taskBinding: taskBinding
	}
	console.log(architeture);
	createApplication(architeture,function(result){
		$("#modalDownload").modal("show");
	});
}