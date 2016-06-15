<%@ page import="br.ufc.front.controller.AbstractComponentController" %>
<%@ page import="br.ufc.front.model.mapping.AbstractComponent" %>
<%@ page import="java.util.List"%>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%
	AbstractComponentController acc = new AbstractComponentController();
	List<AbstractComponent> lac = acc.getListAbstractComponents().getAbstractComponent();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type ="text/javascript" src="../lib/jquery/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="../lib/jsonix/Jsonix-min.js"></script>
		<script type="text/javascript" src="../js/xsd/context-xsd.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../lib/jfilestyle/jquery-filestyle.min.js"></script>
		<script type ="text/javascript" src="../lib/jquery/jquery-ui.min.js"></script>
		<script type ="text/javascript" src="../js/controller/unit-file-controller.js"></script>
		<script type="text/javascript" src="../js/controller/component-controller.js"></script>
		<script type="text/javascript" src="../js/controller/contract-controller.js"></script>
		<link rel="stylesheet" type="text/css" href="../css/jquery-filestyle.min.css"/>
		<link rel="stylesheet" type="text/css" href="../lib/jquery/jquery-ui.min.css"/>
		<link rel="stylesheet" type="text/css" href="../css/style-main.css"/>
		<link rel="shortcut icon" href="../img/logo.png" type="image/x-icon" />
		
		<title>Upload Source-Code</title>
	</head>
	<body>
		<div id="top">
			<center>
				<img src="../img/logo.png"/>
				<font color="white"> <h1>HPC-<i>Shelf</i></h1></font>
				<font color="white"><h2>Upload de código-fonte</h2></font>
			</center>
		</div>
		<div id="down">
			<center>
				<div id="file-upload" style="width: 700px;	height: 260px;	background-color: gray;	border-radius: 10px;">
					<form action="/HPC-Shelf-FrontEnd/unitFile" method="post" enctype="multipart/form-data">
						<br>
						<input type='file' name="file" class='jfilestyle' data-buttonText='Carregar código-fonte' />
						<br>
						<br>
						<label>Versão </label><input style="margin-right: 10px; margin-bottom: 10px;" type="text" name="version"/>
						<label>File Type </label><input style="margin-right: 10px; margin-bottom: 10px;" type="text" name="filetype"/><br><br>
						<label>Build </label><input style="margin-right: 10px; " type="text" name="build"/>
						<label>Path </label><input style="margin-right: 10px;" type="text" name="path"/><br>
						<br>
						<select id="components" title="Selecione um componente" style="margin-right: 20px;">
							<%	for(AbstractComponent ac: lac){ %>
								<option id="<%= ac.getId() %>" value="<%= ac.getName() %>"><%= ac.getName() %></option>
		            		<%	}  	%>
						</select>
								
						<select id="units" title="Selecione uma unidade" style="margin-right: 20px;"></select>		
						<input name="uid" type="text" />
						<input name="filename" type="text" hidden />
						<input name="filextension" type="text" hidden/>
						<br/>
						<center><button type="submit" id="submit" style="margin-left:10px; margin-top: 10px;">ENVIAR</button></center>
					</form>
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