<%@ page import="java.util.List"%>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../resources/css/jquery-filestyle.min.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/css/style-main.css"/>
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="../resources/lib/jsonix/Jsonix-min.js"></script>
		<script type="text/javascript" src="../resources/js/xsd/context-xsd.js" charset="UTF-8"></script>
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-ui.min.js"></script>
		<script type ="text/javascript" src="../resources/js/services/unit-file-service.js"></script>
		<script type ="text/javascript" src="../resources/js/controllers/unit-file-controller.js"></script>
		<script type="text/javascript" src="../resources/js/services/component-service.js"></script>
		<script type="text/javascript" src="../resources/js/services/contract-service.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="../resources/lib/jfilestyle/jquery-filestyle.min.js"></script>
		
		<link rel="shortcut icon" href="../resources/img/logo.png" type="image/x-icon" />
		
		<title>Upload Source-Code</title>
	</head>
	<body style="background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);">
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid">
		    	<div class="navbar-header">
		      		<a class="navbar-brand" href="#"><img width="70px" style="margin-top: -13px; float: left;" src="../resources/img/logo.png"/></a>
		    	</div>
		    	<ul class="nav navbar-nav">
					<li class="active"><a href="../index.html">Home</a></li>
					
		    	</ul>
		    	<ul id="nav" class="nav navbar-nav navbar-right">
		    		<h4 class="navbar-text">Upload Source-code</h4>
		    	</ul>
			</div>
		</nav> 
		<section>
			<center>
				<div id="file-upload" class="jumbotron" style="width: 850px; height: 400px; position:absolute; top:22%; left:19%; background-color: #527a7a;">
					<div class="jumbotron" style="width:600px; height:80px; padding-top: 10px; border-radius: 8px;">
						<p>Aplicação destina a envia de códigos-fonte, eles seram associados as unidades concretas.</p>
					</div>
					<form action="/HPC-Shelf-FrontEnd/unitFile" method="post" enctype="multipart/form-data">
						<input type='file' name="file" /><br><br>
						<div class="col-sm-3">
							<input class="form-control" size="15" type="text" name="version" placeholder="Versão"/>
						</div>
						<div class="col-sm-3">
							<input class="form-control" style="margin-right: 10px; margin-bottom: 10px;" type="text" name="filetype" placeholder="File Type"/>
						</div>
						<div class="col-sm-3">
							<input class="form-control" style="margin-right: 10px; " type="text" name="build" placeholder="Build"/>
						</div>
						<div class="col-sm-3">
							<input class="form-control" style="margin-right: 10px;" type="text" name="path" placeholder="Path"/><br>
						</div>
						<div class="col-sm-4">
							<select class="form-control" id="components" title="Selecione um componente" style="margin-right: 20px;"></select>
						</div>
						<div class="col-sm-4">
							<select class="form-control" id="units" title="Selecione uma unidade" style="margin-right: 20px;"></select>
						</div>		
						<div class="col-sm-4">
							<input name="uid" type="text" class="form-control" disabled="disabled" placeholder="Id da Unidade"/>
						</div>
						<input name="filename" type="text" hidden />
						<input name="filextension" type="text" hidden/>
						<center>
							<button class="btn btn-primary" type="submit" id="submit" style="margin-left:10px; margin-top: 10px;">ENVIAR</button>
						</center>
					</form>
				</div>
			</center>
		</section>
		<footer id="rodaPe" style="position: absolute; bottom: 0px;">
			<center>
				<font color="white"><h4>Plataforma de CAD HPC-Shelf</h4></font>
			</center>
		</footer>
	</body>
</html>