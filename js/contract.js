var contextStorm = br_ufc_lia_storm;

function getListContracts(acId) {
	var listContract = new Array();
	$.ajax({
		url:"php/mainComponent.php?opcode=contracts&acId="+acId,
		dataType: "xml",
		async: false,
		type:"GET",
		success: function(data) {
					var contracts = data.getElementsByTagName("contract");
						for (var i = 0; i < contracts.length; i++) {
								listContract[i] = {
									ccName: contracts.item(i).getAttribute("cc_name"),
									ccId: contracts.item(i).getAttribute("cc_id"),
								};
						}
			}
	});
	return listContract;
}


function saveNewContract(argument) {
  // body...
}
