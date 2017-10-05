const WORKFLOW = null; // a definir
const PLATFORM = 2; 
const COMPUTATION = 4;
const CONNECTOR = 5; 
const DATASOURCE = 7; 

var envBinding = [];
var taskBinding  = [];
var workflow = null;
var body = null;

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
	
	getApplication(function(application){
		console.log(application);
		
		workflow = application.value.workflow;
		createWorkflow(workflow.id,workflow.name, workflow.taskPort, workflow.providesPort, workflow.usesPort);
		
		body = application.value.body;
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Computation"){
				var computation = application.value.body.computationOrRepositoryOrConnector[i];
				createComputation(computation.id, computation.name, computation.taskPort, computation.providesPort,computation.usesPort );
			}
		}
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Connector"){
				var connector = application.value.body.computationOrRepositoryOrConnector[i];
				createConnector(connector.id, connector.name, connector.taskPort, connector.providesPort,connector.usesPort );
			}
		}
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Repository"){
				var repository = application.value.body.computationOrRepositoryOrConnector[i];
				createRepository(repository.id, repository.name, repository.providesPort,repository.usesPort );
			}
		}
		
		for(var i=0; i<application.value.body.computationOrRepositoryOrConnector.length;i++){
			if(application.value.body.computationOrRepositoryOrConnector[i].TYPE_NAME === "org_example_safe_architecture_v4.Platform"){
				var platform = application.value.body.computationOrRepositoryOrConnector[i];
				createPlatform(platform.id, platform.name, platform.providesPort,platform.usesPort );
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
	$("#modalComp").modal("show");
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