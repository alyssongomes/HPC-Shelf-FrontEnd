<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
		<link rel="stylesheet" type="text/css" href="../resources/css/jsPlumbToolkit-defaults.css"/>
		<link rel="stylesheet" type="text/css" href="../resources/css/style-concrete.css"/>
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-2.1.4.min.js"></script>
		<script type ="text/javascript" src="../resources/lib/jquery/jquery-ui.min.js"></script>
		<script type="text/javascript" src="../resources/lib/jsonix/Jsonix-min.js"></script>
		<script type="text/javascript" src="../resources/lib/jfilestyle/jquery-filestyle.min.js"></script>
		<script type="text/javascript" src="../resources/js/xsd/context-xsd.js"></script>
		<script type="text/javascript" src="../resources/js/services/component-service.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../resources/js/services/contract-service.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../resources/js/controllers/contract-controller.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		
		<link rel="shortcut icon" href="../resources/img/logo.png" type="image/x-icon" />
		<title>Registro de Componente Concreto</title>
	</head>
	<body style="background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);" >
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid">
		    	<div class="navbar-header">
		      		<a class="navbar-brand" href="#"><img width="70px" style="margin-top: -13px; float: left;" src="../resources/img/logo.png"/></a>
		    	</div>
		    	<ul class="nav navbar-nav">
					<li><a href="../index.html">Home</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Contrato<span class="caret"></span></a>
			          	<ul class="dropdown-menu">
			          		<li><a href="#" data-toggle="modal" data-target="#modalNewComp">Novo Contrato</a></li>
			          		<li><a href="#" id="submit">Registrar Contrato</a></li>
			            	<li><a href="#" id="save">Baixar Contrato</a></li>
			            	<li><a href="#" id="clean">Limpar</a></li>
			          	</ul>
			        </li>			
		    	</ul>
		    	<ul id="nav" class="nav navbar-nav navbar-right">
		    		<h4 class="navbar-text">Contrato Contextual</h4>
		    	</ul>
			</div>
		</nav>
		
		<div id="init" class="jumbotron center-block" style="width:700px; height: 350px; margin-top:10%; padding-top:3%; padding-left: 5%; padding-right: 5%;">
			<h1>Bem-vindo!</h1>
			<p>Este espaço é destina a criação contratos contextuais, você pode começar agora clicando no botão "Criar novo contrato". Bom trabalho!</p>
	  		<p><a class="btn btn-primary btn-lg" href="#" role="button" data-toggle="modal" data-target="#modalNewComp">Criar novo contrato</a></p>
        </div>
		 
		<div id="main" hidden="true">
			<div id="cmpSelected">
					<h4>Componente Abstrato:</h4>
			</div>
			<div id="formulario">
				<div class="panel panel-success" style="width: 1000px;" id="ccNm">
					<div class="panel-heading"><h3><b>Nome do contrato</b></h3></div>
					<div class="panel-body"><div class="col-sm-5">
						<input class="form-control" type="text" id="ccName"/>
					</div></div><br>
				</div>
				<div class="panel panel-primary" style="width: 1000px;" id="cmpPlt">
					<div class="panel-heading"><h3><b>Plataforma</b></h3></div>
					<div class="panel-body"><button type="button" class="btn btn-primary" id="platform" data-toggle="modal" data-target="#modalPltComp" >Selecionar Plataforma</button></div>
				</div>
				<br>
				<div class="panel panel-primary" style="width: 1000px;">
					<div class="panel-heading"><h3><b>Argumentos de Contexto</b></h3></div>
					<div class="panel-body"><table id="tabParCont"></table></div>
				</div>
				<br>
				<div class="panel panel-primary" style="width: 1000px;" >
					<div class="panel-heading"><h3><b>Unidades Abstratas</b></h3></div>
					<div class="panel-body"><table id="tabUniAbs"></table></div>
				</div>
				<br>
				<div class="panel panel-primary" style="width: 1000px;" >
					<div class="panel-heading"><h3><b>Componentes Aninhados</b></h3></div>
					<div class="panel-body"><table id="tabCmpAni"></table></div>
				</div>
				<div class="panel panel-primary" style="width: 1000px;" >
					<div class="panel-heading"><h3><b>Componentes Aninhados Resolvidos</b></h3></div>
					<div class="panel-body"><table id="tabCmpAni"></table></div>
				</div>
				<br>
				<div class="panel panel-primary" style="width: 1000px;" >
					<div class="panel-heading"><h3><b>Fatias</b></h3></div>
					<div class="panel-body"><table id="tabSlices"></table></div>
				</div>
				<div class="panel panel-primary" style="width: 1000px;" >
					<div class="panel-heading"><h3><b>Unidades Concretas</b></h3></div>
					<div class="panel-body"><table id="tabSlices"></table></div>
				</div>
				<br>
				<div class="panel panel-primary" style="width: 1000px;" >
					<div class="panel-heading"><h3><b>Argumentos de Custo</b></h3></div>
					<div class="panel-body"><table id="tabCost"></table></div>
				</div>
				<br>
				<div class="panel panel-primary" style="width: 1000px;" >
					<div class="panel-heading"><h3><b>Argumentos de Qualidade</b></h3></div>
					<div class="panel-body"><table id="tabQuality"></table></div>
				</div>
			</div>
			<br>
			<br>
			<select style = "visibility:hidden; width:250px;" id="listComp-ops"></select>
		</div>
		
		<div id="modalNewComp" class="modal fade" role="dialog">
        	<div class="modal-dialog">
        		<div class="modal-content">
        			<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Selecione o Componente Abstrato</h4>
				    </div>
		            <div class="modal-body">
		            	<p><b>Catálogo</b></p>
			            <div style=" width:250px; height:400px; overflow: auto;">
			                <ul id="listComponents"></ul>
			            </div>
			            <div style="position: absolute; top: 10px; left: 280px; width:300px; height:400px; overflow: auto;">
			                <center><label id="nameComp"></label></center>
			                <h4><b>Parâmetros de Contexto</b></h4>
			                <table class="table table-striped" id="parar"><thead><tr><th>Nome</th></tr></thead></table>
			                <h4><b>Componentes aninhados</b></h4>
			                <table class="table table-striped" id="nest"><thead><tr><th>Nome</th><th>ID</th></tr></thead></table>
			                <h4><b>Unidades Abstratas</b></h4>
			                <table class="table table-striped" id="unit"><thead><tr><th>Nome</th><th>ID</th></tr></thead></table>
			                <h4><b>Fatias</b></h4>
			                <table class="table table-striped" id="slices"><thead><tr><th>Nome</th><th>QP ID</th><th>ID Comp.</th></tr></thead></table>
			                <h4><b>Parâmetros de Qualidade</b></h4>
			                <table class="table table-striped" id="quality"><thead><tr><th>Nome</th><th>QP ID</th><th>KIND ID</th></tr></thead></table>
			                <h4><b>Parâmetros de Custo</b></h4>
			                <table class="table table-striped" id="cost"><thead><tr><th>Nome</th><th>COP ID</th><th>KIND ID</th></tr></thead></table>
			            </div>
					</div>
					<div class="modal-footer">
				      	<button type="button" class="btn btn-default" data-dismiss="modal" id="openComponent">Criar Contrato</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					</div>
	            </div>			
			</div>
        </div>
		
		<div id="modalPltComp" class="modal fade" role="dialog">
        	<div class="modal-dialog">
        		<div class="modal-content" style="width: 800px;">
        			<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Selecione uma Plataforma</h4>
				    </div>
		            <div class="modal-body" style="width: 900px;">
		            	<p><b>Catálogo</b></p>
			            <div style=" width:250px; height:400px; overflow: auto;">
			                <ul id="listPltComponents"></ul>
			            </div>
			            <div id="containerDetailsComp-plt" style="position: absolute; top: 10px; left: 280px; width:500px; height:400px; overflow: auto;">
			                <center><label id="nameComp"></label></center>
			                <select style="visibility:hidden;" class="form-control" id="select-type">
								<option >Selecione uma opção</option>
								<option value="select" >Selecionar um contrato existente</option>
								<option value="new" >Criar contrato de plataforma</option>
							</select>
							<div id="div-select-contract"></div>
							<div style="visibility:hidden;" id="div-new-contract-platform">
								<h4><b>Nome do contrato</b></h4>
				                <input class="form-control" type="text" id="name-new-contract" />
				                <h4><b>Parâmetros de Contexto</b></h4>
				                <table class="table table-striped" id="parar"><thead><tr><th>Nome</th></tr></thead></table>
				                <h4><b>Componentes aninhados</b></h4>
				                <table class="table table-striped" id="nest"><thead><tr><th>Nome</th><th>ID</th></tr></thead></table>
				                <h4><b>Unidades Abstratas</b></h4>
				                <table class="table table-striped" id="unit"><thead><tr><th>Nome</th><th>ID</th></tr></thead></table>
				                <h4><b>Fatias</b></h4>
				                <table class="table table-striped" id="slices"><thead><tr><th>Nome</th><th>QP ID</th><th>ID Comp.</th></tr></thead></table>
				                <h4><b>Parâmetros de Qualidade</b></h4>
				                <table class="table table-striped" id="quality"><thead><tr><th>Nome</th><th>QP ID</th><th>KIND ID</th></tr></thead></table>
				                <h4><b>Parâmetros de Custo</b></h4>
				                <table class="table table-striped" id="cost"><thead><tr><th>Nome</th><th>COP ID</th><th>KIND ID</th></tr></thead></table>
			                </div>
			            </div>
					</div>
					<div class="modal-footer">
				      	<button type="button" class="btn btn-default" data-dismiss="modal" id="selectPlatform">Selecionar Plataforma</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					</div>
	            </div>			
			</div>
        </div>
		<div id="modalSubmit" class="modal fade" role="dialog">
        	<div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<img src="../resources/img/ajax-loader.gif" style="float: left; margin-right: 10px;"/>
			      	<h4>Aguarde a submição do contrato...</h4>
			      </div>
			    </div>
			</div>
        </div>
        
        <div id="modalLoadContracts" class="modal fade" role="dialog" >
        	<div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<img src="../resources/img/ajax-loader.gif" style="float: left; margin-right: 10px;"/>
			      	<h4>Consultando contratos...</h4>
			      </div>
			    </div>
			</div>
        </div>
	</body>
</html>
