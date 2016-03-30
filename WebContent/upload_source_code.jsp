<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type ="text/javascript" src="js/lib/jquery/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/lib/jsonix/Jsonix-min.js"></script>
		<script type="text/javascript" src="js/contextXSD.js" charset="UTF-8"></script>
		<script type="text/javascript" src="js/lib/jfilestyle/jquery-filestyle.min.js"></script>
		<script type ="text/javascript" src="js/lib/jquery/jquery-ui.js"></script>
		<script type ="text/javascript" src="js/unit-file-controller.js"></script>
		<link rel="stylesheet" type="text/css" href="css/jquery-filestyle.min.css"/>
		<link rel="stylesheet" type="text/css" href="js/lib/jquery/jquery-ui.css"/>
		<link rel="stylesheet" type="text/css" href="css/style-main.css"/>
		<link rel="shortcut icon" href="img/logo.png" type="image/x-icon" />
		
		<title>Upload Source-Code</title>
	</head>
	<body>
		<div id="top">
			<center>
				<img src="img/logo.png"/>
				<font color="white"> <h1>HPC-<i>Shelf</i></h1></font>
				<font color="white"><h2>Upload de código-fonte</h2></font>
			</center>
		</div>
		<div id="down">
			<center>
				<div id="file-upload" style="width: 700px;	height: 250px;	background-color: gray;	border-radius: 10px;">
					<br>
					<input type='file' class='jfilestyle' data-buttonText='Carregar código-fonte' />
					<button type="submit" id="submet" style="margin-left:10px;">ENVIAR</button>
					<br>
					<br>
					<label>Versão </label><input style="margin-right: 10px; margin-bottom: 10px;" type="text" id="version"/>
					<label>File Type </label><input style="margin-right: 10px; margin-bottom: 10px;" type="text" id="filetype"/><br><br>
					<label>Build </label><input style="margin-right: 10px; " type="text" id="build"/>
					<label>Path </label><input style="margin-right: 10px;" type="text" id="path"/><br>
					
					<div id="info" style="text-align: left; margin-left: 50px;" >
						<h3 id="filename" hidden >Nome...</h3>
						<h3 id="filesize" hidden>Tamanho...</h3>
						<h3 id="filextension" hidden>Extenção...</h3>
					</div>
				</div>
			</center>
		</div>
		<div id="rodaPe">
			<center>
				<font color="white"><h3>Plataforma de CAD Baseada em componentes paralelos</h3></font>
			</center>
		</div>
	</body>
</html>