angular.module("abstractComponent").service("componentService",function($http){
	var contextXSD = br_ufc_lia_storm;
	var context = new Jsonix.Context([contextXSD]);
	
    var _getListAbstractComponent = function($scope){
    	var listComponents = new Array();
        $http.get("/HPC-Shelf-FrontEnd/abstractComponent?action=list").then(function(data){
        	var xml = (new DOMParser()).parseFromString(data.data, "text/xml");
        	var components = xml.getElementsByTagName("abstract_component");
            for(var i=0; i<components.length;i++){
                var component = {
                	name: components[i].getAttribute("name"),
                	super: components[i].getAttribute("supertype"),
                	id: components[i].getAttribute("ac_id")
                };
              	listComponents[i] = component;
            }
            $scope.list = listComponents;
        });
        //return listComponents;
    };
    
    var _getAbstractComponent = function($scope,nameComponent){
    	var component = new Object();
        $http.get("/HPC-Shelf-FrontEnd/abstractComponent?action=get&cmp="+nameComponent).then(function(data){    	
        	var unmarsharller = context.createUnmarshaller();
        	var xml = data.data.replace("xmlns=\"http://storm.lia.ufc.br\"","");
        	component = unmarsharller.unmarshalString(xml);
        	$scope.component = component;
        });
    };
    
    var _addAbstractComponent = function(){
        return "";//$http.get("");
    };
    
    return {
    	getListAbstractComponent: _getListAbstractComponent,
    	getAbstractComponent : _getAbstractComponent,
    	addAbstractComponent : _addAbstractComponent
    };
});