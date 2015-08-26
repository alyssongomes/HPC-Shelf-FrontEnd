<?php
	$texto = $_POST["components"];
	if ($arquivo = fopen("out.xml","w")){
		fputs($arquivo,$texto);
		fclose($arquivo);
	}else{
		echo "Não pode ser editado!<br>";
	}
?>