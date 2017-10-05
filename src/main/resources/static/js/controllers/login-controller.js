/**
 * Controlador do Login
 */

$(document).ready(function(){
	var url = window.location.search.replace("?", "");
	var items = url.split("&");
	var message = $("#message");
	if(items[0].split("=")[1] != undefined){
		message.addClass("alert alert-warning alert-dismissible");
		message.attr("role","alert");
		message.append("<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
		message.append("<strong>Ops!</strong> "+unescape(items[0].split("=")[1]));
	}
	
	$("#name").on('input',function(e){
		if($(this).val() === "" || $(this).val() === undefined)
			$("#user").attr("class","has-error");
		else
			$("#user").attr("class","has-success");
	});
	
	$("#email").on('input',function(e){
		var patt = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
		if($(this).val() === "" || $(this).val() === undefined)
			$("#mail").attr("class","has-error");
		else if(patt.test($(this).val()))
			$("#mail").attr("class","has-success");
		else
			$("#mail").attr("class","has-error");
	});
	
	$("#password").on('input',function(e){
		if($(this).val() === "" || $(this).val() === undefined)
			$("#pass").attr("class","has-error");
		else
			$("#pass").attr("class","has-success");
	});
	
	$("#password-repeat").on('input',function(e){
		if($("#password").val() != $(this).val())
			$("#pass-repeat").attr("class","has-error");
		else
			$("#pass-repeat").attr("class","has-success");
	});
	
	$("#btn-register").click(function(e){
		if($("#user").hasClass("has-success") && $("#mail").hasClass("has-success") && $("#pass").hasClass("has-success") && $("#pass-repeat").hasClass("has-success")){
			alert("Registrar");
			clean();
		}else{
			alert("Preencha todos os campos!");
			clean();
		}
	});
	
	function clean(){
		$("#name").val("");
		$("#email").val("");
		$("#password").val("");
		$("#password-repeat").val("");
	}
	
});