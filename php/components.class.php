<?php
/**
* Classe que atribui funções de comunicação entre o CORE
*/
class Component{

	function loadComponents(){
		header('Access-Control-Allow-Origin: *');
		try{
		    $xml = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices?list");
		    $xml = str_replace("<ns:listResponse xmlns:ns=\"http://WServices.storm.ufc.br\"><ns:return>","", $xml);
		    $xml = str_replace("</ns:return></ns:listResponse>", "", $xml);
		    $xml = htmlspecialchars_decode($xml);
		   	$xml = html_entity_decode($xml);
		    return $xml;
		} catch(Exception $e){
			echo 'Exceção capturada: '.$e->getMessage()."\n";
		}
	}

	function details($name){
		try{
			header('Access-Control-Allow-Origin: *');
		    $xml = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices/getAbstractComponent?name=".$name);
		    $xml = str_replace("<ns:getAbstractComponentResponse xmlns:ns=\"http://WServices.storm.ufc.br\"><ns:return>","", $xml);
		    $xml = str_replace("</ns:return></ns:getAbstractComponentResponse>", "", $xml);
		    $xml = htmlspecialchars_decode($xml);
		    $xml = html_entity_decode($xml);
		    return $xml;
	    } catch(Exception $e){
			echo 'Exceção capturada: '.$e->getMessage()."\n";
		}
	}

	function saveXMLComponent($xml){
		if ($arquivo = fopen("newComponentAbstract.xml","w")){
			fputs($arquivo,$xml);
			fclose($arquivo);
		}else{
		echo "Não pode ser editado!<br>";
		}
	}
}

?>