<?php
	header('Access-Control-Allow-Origin: *');
	$name = $_GET["name"];
    $xml = file_get_contents("http://storm.lia.ufc.br:8080/axis2/services/CoreServices/getAbstractComponent?name=".$name);
    $xml = str_replace("<ns:getAbstractComponentResponse xmlns:ns=\"http://WServices.storm.ufc.br\"><ns:return>","", $xml);
    $xml = str_replace("</ns:return></ns:getAbstractComponentResponse>", "", $xml);
    $xml = htmlspecialchars_decode($xml);
    $xml = html_entity_decode($xml);
    echo $xml;
?>