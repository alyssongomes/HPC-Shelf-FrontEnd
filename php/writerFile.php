<?php
	$texto = $_POST["newComponent"];
	if ($arquivo = fopen("newComponentAbstract.xml","w")){
		fputs($arquivo,$texto);
		fclose($arquivo);
	}else{
		echo "Não pode ser editado!<br>";
	}
?>