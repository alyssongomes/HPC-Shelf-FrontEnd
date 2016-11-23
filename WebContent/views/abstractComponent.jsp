<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
        <link rel="stylesheet" type="text/css" href="../resources/css/jsPlumbToolkit-defaults.css"/>
        <link rel="stylesheet" type="text/css" href="../resources/css/style-abstract.css"/>
        <link rel="stylesheet" type="text/css" href="../resources/css/formas.css"/>
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        
        <script type="text/javascript" src="../resources/js/xsd/context-xsd.js"></script>
        <script type="text/javascript" src="../resources/lib/jsonix/Jsonix-min.js"></script>
        <script type ="text/javascript" src="../resources/lib/jquery/jquery-2.1.4.min.js"></script>
        <script type ="text/javascript" src="../resources/lib/jquery/jquery-ui.min.js"></script>
        <script type ="text/javascript" src="../resources/lib/jsplumb/dom.jsPlumb-1.7.6-min.js"></script>
        <script type="text/javascript" src="../resources/js/services/component-service.js" charset="UTF-8"></script>
        <script type="text/javascript" src="../resources/js/services/contract-service.js" charset="UTF-8"></script>
        <script type="text/javascript" src="../resources/js/controllers/component-controller.js" charset="UTF-8"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        
        <link rel="shortcut icon" href="../resources/img/logo.png" type="image/x-icon" />
        <title>HPC-Shelf</title>
    </head>
    <body style="background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%); overflow: hidden;">
    	<nav class="navbar navbar-inverse navbar-fixed-top">
		  <div class="container-fluid">
		    	<div class="navbar-header">
		      		<a class="navbar-brand" href="#"><img width="70px" style="margin-top: -13px; float: left;" src="../resources/img/logo.png"/></a>
		    	</div>
		    	<ul id="nav" class="nav navbar-nav">
					<li><a href="../index.html">Home</a></li>
					<li class="dropdown" >
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Componente<span class="caret"></span></a>
						<ul class="dropdown-menu">
			          		<li><a id="navNewCmp" href="#" data-toggle="modal" data-target="#modalNewComp">Novo Componente</a></li>
							<li><a id="navEditCmp" href="#" data-toggle="modal" data-target="#modalEditeComp">Editar Componente</a></li>	
			        	</ul>
					</li>
		    	</ul>
		    	<ul id="nav" class="nav navbar-nav navbar-right">
					<h4 class="navbar-text ">Componentes Abstratos</h4>
		    	</ul>
			</div>
		</nav>
        <div id="init" class="jumbotron center-block" style="width:700px; height: 350px; margin-top:10%; padding-top:3%; padding-left: 5%; padding-right: 5%;">
			<h1>Bem-vindo!</h1>
			<p>Este ambiente é destina a criação e edição de componente abstratos, você pode começar agora clicando no botão "Começar". Bom trabalho!</p>
	  		<p><a class="btn btn-primary btn-lg" href="#" role="button" data-toggle="modal" data-target="#modalNewComp">Começar</a></p>
        </div>
        
        	<div  id="quadro1" hidden="true" class="panel panel-default">
			  <div class="panel-heading">
			    <h3 class="panel-title"><b>Propriedades</b></h3>
			  </div>
			  <div class="panel-body">
			    <div id="newComp"></div>
	            <div id="newComponent">
	                <form>
	                    <h4 style="color: #0789ba;"><b>Unidades abstrata:</b></h4>
	                    <table class="table table-hover" id="addsUnidades"><thead><tr><th>Nome</th><th>Ass.</th><th>Excluir</th></thead></table>
	                    <h4 style="color: #0789ba;" ><b>Parâmetros de contexto:</b></h4>
	                    <table class="table table-hover" id="listParameters"><thead><tr><th>Nome</th><th>Comp.</th><th>Excluir</th></thead></table>
	                    <h4 style="color: #0789ba;" ><b>Componentes aninhados:</b></h4>
	                    <table class="table table-hover" id="addsComponents"><thead><tr><th>Nome</th><th>Supertipo</th><th>Excluir</th></thead></table>
	                    <h4 style="color: #0789ba;" ><b>Fatias:</b></h4>
	                    <table class="table table-hover" id="listSlices"><thead><tr><th>Nome</th><th>Componente</th></thead></table>
	                    <h4 style="color: #0789ba;" ><b>Parâmetros de Custo:</b></h4>
	                    <table class="table table-hover" id="listCost"><thead><tr><th>Nome</th></thead></table>
	                    <h4 style="color: #0789ba;" ><b>Parâmetros de Qualidade:</b></h4>
	                    <table class="table table-hover" id="listQuality"><thead><tr><th>Nome</th></thead></table>
	                </form>
	            </div>
			  </div>
			  <div class="panel-footer">
			  	<center>
			  		<button href="#" class="btn btn-primary" id="submitComponent">Submeter</button>
			  		<button href="#" class="btn btn-success" id="saveUpdate">Salvar Modificações</button>
			  	</center>
			  </div>
			</div>
        
        <div id="quadro2" hidden="true">
			<div id="autoScroll2"  class="jtk-demo-canvas canvas-wide drag-drop-demo jtk-surface jtk-surface-nopan" >
	            <div id="sort2" class="connectedSortable" >
	            	<div id="trash">
	                	<img alt="lixo" src="../resources/img/lixo.png" height="70px" width="70px" style="float:left;">
	                	<h3>LIXEIRA</h3>
	            	</div>
	            </div>
            </div>
        </div>
        
        <p id="msg"></p> 
        
        <div id="divMenu">
            <ul>
                <li>ADD UNIDADE ABSTRATA</li>
                <li>ADD PARÂMETROS DE CONTEXTO</li>
                <li>ADD PARÂMETROS DE QUALIDADE</li>
                <li>ADD PARÂMETROS DE CUSTO</li>
                <li>ADD COMPONENTE ANINHADO</li>
            </ul>
        </div>
        
        <div id="modalNewComp" class="modal fade" role="dialog">
        	<div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Crie um novo componente</h4>
		      </div>
		      <div class="modal-body">
		        <h4>Nome do componente: </h4>
                <input class="form-control" id="nameComponent" /><br>
                <h4>Tipo do componente: </h4>
                <label id="nameSuperType"></label><br>
                <a href="#" id="sselectType" data-toggle="modal" data-target="#modalSuperComp" >Selecionar Tipo</a><br/></br>
		      </div>
		      <div class="modal-footer">
		      	<button type="button" class="btn btn-default" data-dismiss="modal" id="saveComponent">Criar Componente</a>
		        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
		      </div>
		    </div>
		  </div>
        </div>
        
        <div id="modalSuperComp" class="modal fade" role="dialog">
        	<div class="modal-dialog">
        		<div class="modal-content">
        			<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Selecione um componente</h4>
				    </div>
		            <div class="modal-body">
		            	<p><b>Catálogo</b></p>
			            <div style=" width:250px; height:400px; overflow: auto;">
			                <ul id="listSuperComponents"></ul>
			            </div>
			            <div style="position: absolute; top: 10px; left: 280px; width:300px; height:400px; overflow: auto;">
			                <center><label id="nameSuperComp"></label></center>
			                <h4><b>Parâmetros de Contexto</b></h4>
			                <table class="table table-striped" id="pararSuper"></table>
			                <h4><b>Componentes aninhados</b></h4>
			                <table class="table table-striped" id="nestCompSuper"></table>
			                <h4><b>Unidades Abstratas</b></h4>
			                <table class="table table-striped" id="unitCompSuper"></table>
			                <h4><b>Fatias</b></h4>
			                <table class="table table-striped" id="slicesCompSuper"></table>
			                <h4><b>Parâmetros de Qualidade</b></h4>
			                <table class="table table-striped" id="qualytiCompSuper"></table>
			                <h4><b>Parâmetros de Custo</b></h4>
			                <table class="table table-striped" id="costCompSuper"></table>
			            </div>
					</div>
					<div class="modal-footer">
				      	<button type="button" class="btn btn-default" data-dismiss="modal" id="saveSuperComp">Concluir</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					</div>
	            </div>			
			</div>
        </div>
        
        <div id="modalNestedComp" class="modal fade" role="dialog">
        	<div class="modal-dialog">
        		<div class="modal-content">
        			<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Selecione um componente</h4>
				    </div>
		            <div class="modal-body">
		            	<p><b>Catálogo</b></p>
			            <div style=" width:250px; height:400px; overflow: auto;">
			                <ul id="listNestedComponents"></ul>
			            </div>
			            <div style="position: absolute; top: 10px; left: 280px; width:300px; height:400px; overflow: auto;">
			                <center><label id="nameNestedComp"></label></center>
			                <h4><b>Parâmetros de Contexto</b></h4>
			                <table class="table table-striped" id="pararNestComp"></table>
			                <h4><b>Componentes aninhados</b></h4>
			                <table class="table table-striped" id="nestNestedComp"></table>
			                <h4><b>Unidades Abstratas</b></h4>
			                <table class="table table-striped" id="unitNestedComp"></table>
			                <h4><b>Fatias</b></h4>
			                <table class="table table-striped" id="slicesNestedComp"></table>
			                <h4><b>Parâmetros de Qualidade</b></h4>
			                <table class="table table-striped" id="qualytiNestedComp"></table>
			                <h4><b>Parâmetros de Custo</b></h4>
			                <table class="table table-striped" id="costNestedComp"></table>
			            </div>
					</div>
					<div class="modal-footer">
				      	<button type="button" class="btn btn-default" data-dismiss="modal" id="saveNestedComp">Adicionar Componente</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					</div>
	            </div>			
			</div>
        </div>
    
    	<div id="modalParamComp" class="modal fade" role="dialog">
        	<div class="modal-dialog">
        		<div class="modal-content">
        			<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Selecione um componente</h4>
				    </div>
		            <div class="modal-body">
		            	<p><b>Defina um limite</b></p>
			            <div style=" width:250px; height:400px; overflow: auto;">
			                <ul id="listParamComponents"></ul>
			            </div>
			            <div style="position: absolute; top: 10px; left: 280px; width:300px; height:400px; overflow: auto;">
			                <label id="nameParamComp"></label>
		                    <h4>Nome do Parametro</h4>
		                    <input class="form-control" type="text" id="namePar"><br>
		                    <strong>Informações do fornecedor</strong><!-- variable provided -->
		                    <textarea class="form-control" id="variavel" rows="5" cols="30" style="resize: none"></textarea>
		                    <h4>Limite</h4>
		                    <select class="form-control" id="opcaoLimite">
		                    	<option value="contract">Por Contrato</option>
		                    	<option value="number">Por valor numérico</option>
		                    </select>
		                    <label id="bound"></label>
		                    <br>
		                    <input style="visibility: hidden;" class="form-control" type="text" placeholder="Valor numérico" id="boundValue"/>
			            </div>
					</div>
					<div class="modal-footer">
				      	<button type="button" class="btn btn-default" data-dismiss="modal" id="saveParamComp">Adicionar Parâmetro</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					</div>
	            </div>			
			</div>
        </div>
    
		<div id="modalEditeComp" class="modal fade" role="dialog">
        	<div class="modal-dialog">
        		<div class="modal-content">
        			<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Selecione um componente para Editar</h4>
				    </div>
		            <div class="modal-body">
		            	<p><b>Catálogo</b></p>
			            <div style=" width:250px; height:400px; overflow: auto;">
			                <ul id="listEditeComponents">
			                </ul>
			            </div>
			            <div style="position: absolute; top: 10px; left: 280px; width:300px; height:400px; overflow: auto;">
			                <center><label id="nameEditComp"></label></center>
			                <h4><b>Parâmetros de Contexto</b></h4>
			                <table class="table table-striped" id="pararEditComp"></table>
			                <h4><b>Componentes aninhados</b></h4>
			                <table class="table table-striped" id="nestEditComp"></table>
			                <h4><b>Unidades Abstratas</b></h4>
			                <table class="table table-striped" id="unitEditComp"></table>
			                <h4><b>Fatias</b></h4>
			                <table class="table table-striped" id="slicesEditComp"></table>
			                <h4><b>Parâmetros de Qualidade</b></h4>
			                <table class="table table-striped" id="qualytiEditComp"></table>
			                <h4><b>Parâmetros de Custo</b></h4>
			                <table class="table table-striped" id="costEditComp"></table>
			            </div>
					</div>
					<div class="modal-footer">
				      	<button type="button" class="btn btn-default" data-dismiss="modal" id="openEditComp">Editar Componente</button>
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
			      	<h4>Aguarde a submissão do componente...</h4>
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
