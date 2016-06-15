<%--@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"--%>
<!--<jsp:useBean id="acc2" class="br.ufc.front.controller.AbstractComponentController" />
<c:set var="lac2" value="acc.listAbstractComponents.abstractComponent" />-->
<%@ page import="br.ufc.front.controller.AbstractComponentController" %>
<%@ page import="br.ufc.front.model.mapping.AbstractComponent" %>
<%@ page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%
	AbstractComponentController acc = new AbstractComponentController();
	List<AbstractComponent> lac = acc.getListAbstractComponents().getAbstractComponent();
%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
        <link rel="stylesheet" type="text/css" href="../js/lib/jquery/jquery-ui.min.css"/>
        <link rel="stylesheet" type="text/css" href="../css/jsPlumbToolkit-demo.css"/>
        <link rel="stylesheet" type="text/css" href="../css/jsPlumbToolkit-defaults.css"/>
        <script type="text/javascript" src="../js/xsd/context-xsd.js"></script>
        <script type="text/javascript" src="../lib/jsonix/Jsonix-min.js"></script>
        <script type ="text/javascript" src="../lib/jquery/jquery-2.1.4.min.js"></script>
        <script type ="text/javascript" src="../lib/jquery/jquery-ui.min.js"></script>
        <script type ="text/javascript" src="../lib/jsplumb/dom.jsPlumb-1.7.6-min.js"></script>
        <script type="text/javascript" src="../js/controller/component-controller.js" charset="UTF-8"></script>
        <script type="text/javascript" src="../js/controller/contract-controller.js" charset="UTF-8"></script>
        <script type="text/javascript" src="../js/abstract-component.js" charset="UTF-8"></script>
        <link rel="stylesheet" type="text/css" href="../css/style-abstract.css"/>
        <link rel="stylesheet" type="text/css" href="../css/formas.css"/>
        <link rel="shortcut icon" href="../img/logo.png" type="image/x-icon" />
        <title>HPC-Shelf</title>
    </head>
    <body >
        <div id="quadro1">
            <ul>
                <li><a href="#newComponent">Novo Componente</a></li>
                <!--<li><a href="#autoScroll">Componentes</a></li>
                <li><a href="#parameters">Parametros</a></li> -->
            </ul>
            <div id="newComponent">
                <form >
                    <h4>Nome do componente: </h4>
                    <input id="nameComponent" /><br/>
                    <h4>Tipo do componente: </h4>
                    <label id="nameSuperType"></label>
                    <a href="#" id="selectType">Selecionar Tipo</a><br/></br>
                    <a href="#" id="saveComponent">Criar Componente</a>
                    <button href="#" id="cancelComponent" >Cancelar</button>
                    <br/></br>
                    <fieldset>
                        <div id="newComp"></div>
                        <legend><h3 color="white">Propriedades</h3></legend>
                        <h4>Unidades abstrata: </h4>
                        <table id="addsUnidades"></table>
                        <h4>Parâmetros de contexto: </h4>
                        <table id="listParameters"></table>
                        <h4>Componentes aninhados: </h4>
                        <table id="addsComponents">
                           <!-- <tr bgcolor="white">
                                <td width= "195px" height="15px"><strong><center>COMPONENTE<center></strong></td>
                                <td width= "110px"><strong>UNIDADES</strong></td>
                                <td width= "50px" bgcolor="red"><strong>FUNÃÃO</strong></td>
                            </tr>-->
                        </table>
                        <h4>Fatias: </h4>
                        <table id="listSlices"></table>
                        <h4>Parâmetros de Custo: </h4>
                        <h4>Parâmetros de Qualidade: </h4>
                    </fieldset>
                    <br/><br/>
                    <button href="#" id="submitComponent">Submeter</button>
                </form>
            </div>
           <!-- <div id="autoScroll">
                <center>
                    <ul id="sort1"></ul>
                    <img id ="esperando" src="img/ajax.gif">
                </center>
            </div>
            <div id="parameters">
                <label id="InfoComp" style="float: left; margin: 3px 5px 5px 5px; font-size: 20;">Componente</label>
                <br/><br/>
                <label style="float: left; margin-top: 3px ; font-size: 20;">Super Tipo:</label><br/><br/>
                <label id="InfoSuper" style=" font-size: 20;">...</label>
                <br/><br/>
                <label style="float: left; margin: 3px 5px 5px 5px; font-size: 20;">Parametros:</label>
                <a href="#" id="addPar"> Add Parametro</a>
                <br/><br/>
                <table id ="tableParam"></table>
            </div>-->
        </div>
        <div id="quadro2">
        	<div class="container" id ="container">
	            <h3><center>Aplicação</center></h3>
	            <div id="autoScroll2"  class="jtk-demo-canvas canvas-wide drag-drop-demo jtk-surface jtk-surface-nopan" >
	            	<div id="sort2" class="connectedSortable" >
	            	<div id="trash">
	                	<img alt="lixo" src="../img/lixo.png" height="70px" width="70px" style="float:left;">
	                	<h3>LIXEIRA</h3>
	            	</div>
	            	</div>
	            </div>
            </div>
        </div>
        
        <div id="dialog-super" title="Selecionar Supertype">
            <div id="containerSuperComp">
            	<ul id="listSuperComponents">
            	 <%	for(AbstractComponent ac: lac){ %>
						<li class="ui-state-default"><a id="<%= ac.getId() %>" value="<%= ac.getName() %>" href="#" ><%= ac.getName() %></a></li>
            	<%	}  	%>
            		<!--  <c:forEach var="ac" items="${lac}">
            			<li class="ui-state-default"><a  value="<c:out value="${ac.name}"/>" href="#"><c:out value="${ac.name}"/></a></li>
            		</c:forEach>-->
                </ul>
            </div>
            <div id = "containerDetailsSuper">
                <center>
                    <label id="nameSuperComp"></label>
                </center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Parametros de Contexto</h4></font>
                <center><div id="pararSuper"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Componentes aninhados</h4></font>
                <center><div id="nestCompSuper"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Unidades Abstratas</h4></font>
                <center><div id="unitCompSuper"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Fatias</h4></font>
				<center><div id="slicesCompSuper"></div></center>
				<font color="red"><h4>&nbsp;&nbsp;&nbsp;Parâmetros de Qualidade</h4></font>
				<center><div id="qualytiCompSuper"></div></center>
				<font color="red"><h4>&nbsp;&nbsp;&nbsp;Parâmetros de Custo</h4></font>
				<center><div id="costCompSuper"></div></center>
            </div>
        </div>
        <div id="dialog-param" title="Definir parametros de contexto">
            <div id="containerParamComp">
                <h4>Selecione um Bound</h4>
                <ul id="listParamComponents">
                <%	for(AbstractComponent ac: lac){ %>
						<li class="ui-state-default"><a id="<%= ac.getId() %>" value="<%= ac.getName() %>" href="#" ><%= ac.getName() %></a></li>
            	<%	}  	%>
                </ul>
            </div>
            <div id="containerDetailPar">
                <center>
                    <label id="nameParamComp"></label>
                    <h4>Nome do Parametro</h4><input type="text" id="name"><br/><br/>
                    <font color = "blue"><strong>Informações do fornecedor(Variavel Compartilhada)</strong></font><!-- variable provided -->
                    <textarea id="variavel" rows="5" cols="30" style="resize: none"></textarea>
                    <h4>Bound(Limite)</h4><label id="bound"></label>
                </center>
            </div>
        </div>
        <div id="dialog-comp" title="Selecionar componentes">
            <div id="containerNestComp">
                <ul id="listNestedComponents">
                 <%	for(AbstractComponent ac: lac){ %>
						<li class="ui-state-default"><a id="<%= ac.getId() %>" value="<%= ac.getName() %>" href="#" ><%= ac.getName() %></a></li>
            	<%	}  	%>	
                </ul>
            </div>
            <div id="containerDetailNestComp">
                <center>
                    <label id="nameNestedComp"></label>
                </center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Parametros de Contexto</h4></font>
                <center><div id="pararNestComp"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Componentes aninhados</h4></font>
                <center><div id="nestNestedComp"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Unidades Abstratas</h4></font>
                <center><div id="unitNestedComp"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Fatias</h4></font>
                <center><div id="slicesNestedComp"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Parâmetros de Qualidade</h4></font>
                <center><div id="qualytiNestedComp"></div></center>
                <font color="red"><h4>&nbsp;&nbsp;&nbsp;Parâmetros de Custo</h4></font>
                <center><div id="costNestedComp"></div></center>
            </div>
        </div>
        
        <p id="msg"></p> 
        <div id="divMenu">
            <ul>
                <li>ADD UNIDADE ABSTRATA</li>
                <li>ADD PARÂMETROS CONTEXTO</li>
                <li>ADD COMPONENTE ANINHADO</li>

            </ul>
        </div>
    </body>
</html>
