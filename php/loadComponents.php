<?php header('Access-Control-Allow-Origin: *');
	try{
	    $xml = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices?list");
	    $xml = str_replace("<ns:listResponse xmlns:ns=\"http://WServices.storm.ufc.br\"><ns:return>","", $xml);
	    $xml = str_replace("</ns:return></ns:listResponse>", "", $xml);
	    $xml = htmlspecialchars_decode($xml);
	   	$xml = html_entity_decode($xml);
	    echo $xml;
	    //file_put_contents("resposta2.xml",$xml);

	} catch(Exception $e){
		echo 'Exceção capturada: '.$e->getMessage()."\n";
	}
?>