function resolve(xml){
	var listContract = null;
	$.ajax({
		url:"/HPC-Shelf-FrontEnd/executeComponet?action=resolve",
		data: 'con='+xml,
		dataType: "xml",
		async: false,
		type:"POST",
		success: function(data) {
			listContract = data;
		}
	});
	return listContract;
}

function deploy(candidateList){
	var computationSystem = null;
	$.ajax({
		url:"/HPC-Shelf-FrontEnd/executeComponet?action=deploy",
		data: 'list='+candidateList,
		dataType: "xml",
		async: false,
		type:"POST",
		success: function(data) {
			computationSystem = data;
		}
	});
	return computationSystem;
}

function instantiate(computationalSystem){
	var terminal = null;
	$.ajax({
		url:"/HPC-Shelf-FrontEnd/executeComponet?action=instant",
		data: 'sys='+computationalSystem,
		async: false,
		type:"POST",
		success: function(data) {
			terminal = data;
		}
	});
	return terminal;
}

function destroy(computationalSystem){
	var result = "";
	$.ajax({
		url:"/HPC-Shelf-FrontEnd/executeComponet?action=destroy",
		data: 'sys='+computationalSystem,
		async: false,
		type:"POST",
		success: function(data) {
			result = data;
		}
	});
	return result;
}