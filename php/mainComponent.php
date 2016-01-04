<?php
	include_once 'components.class.php';

	$opcode = $_GET["opcode"];
	$opComp = new Component();

	switch ($opcode) {
		case 'details':
			$name = $_GET["name"];
			echo $opComp->details($name);
			break;

		case 'loadComponents':
			echo $opComp->loadComponents();
			break;

		case 'contracts':
			$acId = $_GET["acId"];
			echo $opComp->listContract($acId);
			break;

		case 'saveComp':
			$xml = $_POST["newComponent"];
			$opComp->saveXMLComponent($xml);
			break;

		default:
			echo "<p>Operação Inválida!</p>";
			break;
	}
?>
