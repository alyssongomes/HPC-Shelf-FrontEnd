<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="../resources/lib/jfilestyle/jquery-filestyle.min.js"></script>
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-ui.min.js"></script>
		<script type="text/javascript" src="../resources/js/xsd/context-xsd.js"></script>
        <script type="text/javascript" src="../resources/lib/jsonix/Jsonix-min.js"></script>
		<script type="text/javascript" src="../resources/js/services/execute-service.js"></script>
		<script type="text/javascript" src="../resources/js/controllers/execute-controller.js"></script>
		<link rel="stylesheet" type="text/css" href="../resources/css/jquery-filestyle.min.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/lib/jquery/jquery-ui.min.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/css/style-main.css"/>
		<link rel="shortcut icon" href="../resources/img/logo.png" type="image/x-icon" />
		<title>Execução de Componente Abstrato</title>
	</head>
	<body>
		<div id="top">
			<center>
				<img src="../resources/img/logo.png"/>
				<font color="white"> <h1>HPC-<i>Shelf</i></h1></font>
				<font color="white"><h2>Execução de Componente</h2></font>
			</center>
		</div>
		  <div id="down">
			<center>
				<div id="file-upload" style="width: 800px;	height: auto;	background-color: gray;	border-radius: 10px;">
						<br/>
						<br/>
						<input type='file' name="file" class='jfilestyle' data-buttonText='Carregar Contrato Contextual' />
						<!-- RETORNA A LISTA DE CANDIDATOS DA RESOLUÇÃO DO CONTRATO CONTEXTUAL -->
						<center><button id="resolve" style="margin-left:10px; margin-top: 10px;">Resolver Contrato</button></center>
						<a id="linkCandidates" title="Clique aqui para baixar a lista de candidatos"><h3>Lista de candidatos</h3></a>
						<div id="accordion-resizer" style=" width:620px; margin-bottom: 10px; padding: 10px;">
							<div id="candidatos" align="left">
							</div>
						</div>
						<!-- FAZ O DEPLOY DA APLICAÇÃO EM SEGUIDA CHAMA O INSTANTIATE -> instantiate(deploy) -> EXECUÇÃO DO COMPONENTE -->
						<button id="deploy" style="margin-left:10px; margin-top: 10px;">Implantar</button>
						<a id="linkComputacional" title="Clique aqui para baixar o arquivo que descreve o sistema computacional"><h3>Sistema Computacional</h3></a>
						<div style=" width:520px; height:50px; overflow:auto;">
							<table width="500px" border="0px" id="deployTab">
							<tr align="center" bgcolor="#6495ED">
								<td><b>Sessão</b></td>
								<td><b>Endereço da Plataforma</b></td>
							</tr>
						</table>
						</div>
						<h4>Status da Instancia</h4>
						<div style=" width:520px; height:80px; overflow:auto; margin-left: 40px;" align="left" id="status"></div>
						<button id="destroy" style="margin-left:10px; margin-top: 10px; margin-bottom: 10px;">Encerrar e liberar plataformas</button>
						
				</div>
			</center>
		</div>
		<br/>
		<div id="rodaPe">
			<center>
				<font color="white"><h3>Plataforma de CAD Baseada em componentes paralelos</h3></font>
			</center>
		</div>
	</body>
</html>