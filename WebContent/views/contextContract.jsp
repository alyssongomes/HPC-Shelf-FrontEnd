<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
		<link rel="stylesheet" type="text/css" href="../resources/lib/jquery/jquery-ui.min.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/css/jsPlumbToolkit-demo.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/css/jsPlumbToolkit-defaults.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/css/style-concrete.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/css/jquery-filestyle.min.css"/>
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-2.1.4.min.js"></script>
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-ui.min.js"></script>
		<script type="text/javascript" src="../resources/lib/jsonix/Jsonix-min.js"></script>
		<script type="text/javascript" src="../resources/lib/jfilestyle/jquery-filestyle.min.js"></script>
		<script type="text/javascript" src="../resources/js/xsd/context-xsd.js"></script>
		<script type="text/javascript" src="../resources/js/services/component-service.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../resources/js/services/contract-service.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../resources/js/controllers/contract-controller.js"></script>
		<link rel="shortcut icon" href="../resources/img/logo.png" type="image/x-icon" />
		<title>Registro de Componente Concreto</title>
	</head>
	<body >
		<div id="main">
			<center> <h2>Contrato Contextual - Registro de Componente Concreto</h2> </center>
			<div id="formulario">
				<div id="cmpSelected">
					<h3>Componente Abstrato:</h3>
				</div>
				<div id="ccNm">
					<h3>Nome do contrato:</h3>
					<input type="text" id="ccName"/>
				</div>
				<div id="cmpPlt">
					<h3>Plataforma</h3>
					<button type="button" id="platform" >Selecionar Plataforma</button>
				</div>
				<div>
					<h3>Parâmetros de Contexto - Especifique os argumentos</h3>
					<table id="tabParCont"></table>
				</div>
				<div>
					<h3>Unidades Abstratas</h3>
					<table id="tabUniAbs"></table>
				</div>
				<div>
					<h3>Componentes Aninhados</h3>
					<table id="tabCmpAni"></table>
				</div>
				<div>
					<h3>Fatias</h3>
					<table id="tabSlices"></table>
				</div>
				<div>
					<h3>Parâmetros de Custo - Especifique os argumentos</h3>
					<table id="tabCost"></table>
				</div>
				<div>
					<h3>Parâmetros de Qualidade - Especifique os argumentos</h3>
					<table id="tabQuality"></table>
				</div>
			</div>
			<br>
			<br>
			<button type="button" id="save" style="margin-left:20px;">SALVAR CONTRATO</button>
			<button type="button" id="submet" style="margin-left:20px;">REGISTRAR CONTRATO</button>
			<button type="button" id="clean" style="margin-left:20px;">LIMPAR</button>
			<select style = "visibility:hidden; width:250px;" id="listComp-ops"></select>
		</div>

		<div id="dialog-cmp" title="Selecione o Componente Abstrato">
				<div id="containerComp">
				<ul id="listComponents"></ul>
				</div>
				<div id = "containerDetailsComp">
						<center>
								<label id="nameComp"></label>
						</center>
						<font color="red"><h4>&nbsp;&nbsp;&nbsp;Parametros de Contexto</h4></font>
						<center><table id="parar">
							<tr><td bgcolor="red" width=230>NAME</td></tr>
						</table></center>
						<font color="red"><h4>&nbsp;&nbsp;&nbsp;Componentes aninhados</h4></font>
						<center>
							<table id="nest">
								<tr>
									<td bgcolor="red" width=200>NAME</td>
									<td bgcolor="red" width=30>ID</td>
								</tr>
							</table>
						</center>
						<font color="red"><h4>&nbsp;&nbsp;&nbsp;Unidades Abstratas - Arquivo da Unidade</h4></font>
						<center><table id="unit">
							<tr>
								<td bgcolor="red" width=200>NAME</td>
								<td bgcolor="red" width=30>ID</td>
							</tr>
						</table></center>
						<font color="red"><h4>&nbsp;&nbsp;&nbsp;Fatias</h4></font>
						<center><table id="slices">
							<tr>
								<td bgcolor="red" width=150>NAME</td>
								<td bgcolor="red" width=40>QP ID</td>
								<td bgcolor="red" width=40>ID CMP</td>
							</tr>
						</table></center>
						<font color="red"><h4>&nbsp;&nbsp;&nbsp;Parâmetros de Qualidade</h4></font>
						<center><table id="quality">
							<tr>
								<td bgcolor="red" width=150>NAME</td>
								<td bgcolor="red" width=40>QP ID</td>
								<td bgcolor="red" width=40>KIND ID</td>
							</tr>
						</table></center>
						<font color="red"><h4>&nbsp;&nbsp;&nbsp;Parâmetros de Custo</h4></font>
						<center><table id="cost">
							<tr>
								<td bgcolor="red" width=150>NAME</td>
								<td bgcolor="red" width=40>COP ID</td>
								<td bgcolor="red" width=40>KIND ID</td>
							</tr>
						</table></center>
				</div>
		</div>

		<div id="dialog-plt" title="Selecione uma Plataforma">
				<div id="containerComp-plt">
					<ul id="listComponents"></ul>
				</div>
				<div id = "containerDetailsComp-plt">
						<center>
								<label id="nameComp"></label>
						</center>
						<select style="visibility:hidden;"  id="select-type">
							<option value="select" class ='ui-selectmenu-button'>Selecione uma opção</option>
							<option value="select" class ='ui-selectmenu-button'>Selecionar um contrato existente</option>
							<option value="new" class ='ui-selectmenu-button'>Criar contrato de plataforma</option>
						</select>
						<div id="div-select-contract">
						</div>
						<div style="visibility:hidden;" id="div-new-contract-platform">
							<h4>Nome do contrato</h4>
							<input type="text" id="name-new-contract" />
							<font color="red"><h4>Parâmetros de Contexto</h4></font>
							<table id="parar">
								<tr><td bgcolor="red" width=300>NAME</td></tr>
							</table>
							<font color="red"><h4>Componentes aninhados</h4></font>
								<table id="nest">
									<tr><td bgcolor="red" width=300>NAME</td></tr>
								</table>
							<font color="red"><h4>Unidades Abstratas</h4></font>
							<table id="unit">
								<tr>
									<td bgcolor="red" width=250>NAME</td>
									<td bgcolor="red" width=50>ID</td>
								</tr>
							</table>
							<font color="red"><h4>Fatias</h4></font>
							<table id="slices">
								<tr>
									<td bgcolor="red" width=210>NAME</td>
									<td bgcolor="red" width=40>QP ID</td>
									<td bgcolor="red" width=40>ID CMP</td>
								</tr>
							</table>
							<font color="red"><h4>Parâmetros de Qualidade</h4></font>
							<table id="quality">
								<tr>
									<td bgcolor="red" width=210>NAME</td>
									<td bgcolor="red" width=40>QP ID</td>
									<td bgcolor="red" width=40>KIND ID</td>
								</tr>
							</table>
							<font color="red"><h4>Parâmetros de Custo</h4></font>
							<table id="cost">
								<tr>
									<td bgcolor="red" width=210>NAME</td>
									<td bgcolor="red" width=40>COP ID</td>
									<td bgcolor="red" width=40>KIND ID</td>
								</tr>
							</table>
						</div>
				</div>
		</div>

	</body>
</html>
