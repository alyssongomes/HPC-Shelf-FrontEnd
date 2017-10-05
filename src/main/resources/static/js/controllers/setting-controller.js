/**
 * 	Controlador da tela de configurações
 */
$(document).ready(function(){
	getUserLogged(function(json){
		var user = JSON.parse(json);
		$("#name").append(user.username);
		$("#email").append(user.email);
	});
});