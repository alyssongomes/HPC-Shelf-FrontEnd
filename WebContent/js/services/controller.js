angular.module("abstractComponent").controller("abstractComponentCtrl", function ($scope,componentService){
	componentService.getAbstractComponent($scope,"LinearSystemSolver");
	componentService.getListAbstractComponent($scope);
});