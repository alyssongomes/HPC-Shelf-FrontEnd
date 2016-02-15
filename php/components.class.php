<?php
/**
* Classe que atribui funções de comunicação entre o CORE
*/
class Component{

	function loadComponents(){
		header('Access-Control-Allow-Origin: *');
		try{
		    $xml = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices?list");
		    $xml = str_replace("<ns:listResponse xmlns:ns=\"http://webservices.storm.ufc.br\"><ns:return>","", $xml);
		    $xml = str_replace("</ns:return></ns:listResponse>","", $xml);
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
		    $xml = str_replace("<ns:getAbstractComponentResponse xmlns:ns=\"http://webservices.storm.ufc.br\"><ns:return>","", $xml);
		    $xml = str_replace("</ns:return></ns:getAbstractComponentResponse>", "", $xml);
		    $xml = htmlspecialchars_decode($xml);
		    $xml = html_entity_decode($xml);
		    return $xml;
	    } catch(Exception $e){
			echo 'Exceção capturada: '.$e->getMessage()."\n";
		}
	}

	function listContract($acId){
		try{
			header('Access-Control-Allow-Origin: *');
		    $xml = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices/listContract?ac_id=".$acId);
		    $xml = str_replace("<ns:listContractResponse xmlns:ns=\"http://webservices.storm.ufc.br\"><ns:return>","", $xml);
		    $xml = str_replace("</ns:return></ns:listContractResponse>", "", $xml);
		    $xml = htmlspecialchars_decode($xml);
		    $xml = html_entity_decode($xml);
		    return $xml;
	    } catch(Exception $e){
			echo 'Exceção capturada: '.$e->getMessage()."\n";
		}
	}

	function saveXMLComponent($xml){
		try{
			header('Access-Control-Allow-Origin: *');
			//$xml = str_replace("#", "<", $xml);
			//$xml = str_replace("@", ">", $xml);
			//$xml = str_replace(" ", "%", $xml);
			//$xml = htmlspecialchars_decode($xml);
		    //$xml = html_entity_decode($xml);
		    //$xml = 
		    //$xml = "http://storm.lia.ufc.br:8080/axis2/services/CoreServices/addAbstractComponent?cmp=".$xml;
			//$result = file_get_contents($xml);
			/*echo $xml;
			if($arquivo = fopen("newComponentAbstract.xml","w")){
				fputs($arquivo,$xml);
				fclose($arquivo);
				echo $result;
			}else{
				echo "Não pode ser editado!<br>";
			}*/
			//return $result;
			$content = http_build_query(array(
				'cmp'=> $xml
			));

			$context = stream_context_create(array(
				'http' => array(
					'method' => 'POST',
					'content' => $content
				)
			));

			$result = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices/addAbstractComponent", null,$context);
			echo $result;
			/*if ($arquivo = fopen("newComponentAbstract.xml","w")){
				fputs($arquivo,$xml);
				fclose($arquivo);
				echo "resultado: ".$result;
			}else{
				echo "Não pode ser editado!<br>";
			}*/
		}catch(Exception $e){
			echo 'Exceção capturada: '.$e->getMessage()."\n";
		}
	}

	function saveXMLContract($xml){
		$content = http_build_query(array(
			'cmp'=> $xml
		));

		$context = stream_context_create(array(
			'http' => array(
				'method' => 'POST',
				'content' => $content
			)
		));

		$result = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices/addContextContract", null,$context);
		echo $result;

		if ($arquivo = fopen("newContract.xml","w")){
			fputs($arquivo,$xml);
			fclose($arquivo);
		}else{
			echo "Não pode ser editado!<br>";
		}
	}


}

?>
