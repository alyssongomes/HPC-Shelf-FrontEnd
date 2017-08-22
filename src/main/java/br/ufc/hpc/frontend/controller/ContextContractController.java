package br.ufc.hpc.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.util.SaveToFileXML;
import br.ufc.hpc.frontend.webservice.CoreServices;

@Controller
public class ContextContractController{
	
	/*private CoreServices service = new CoreServices();
	private SaveToFileXML stfx = new SaveToFileXML();
	
	
	@RequestMapping("/contract/list/{acid}")
	@ResponseBody
	public String listContracts(@PathVariable("acid") String acId){
		try {
			String contracts = service.getCoreServicesHttpSoap11Endpoint().listContract(Integer.parseInt(acId));
			return contracts;
		} catch (Exception e) {
			System.out.println("Erro at list contract: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping("/contract/save/{con}")
	@ResponseBody
	public String saveContract(@PathVariable("con") String con){
		String head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		try {
			System.out.println(con);
			Boolean result = service.getCoreServicesHttpSoap11Endpoint().addContextContract(con);
			System.out.println(result);
			return head+"<result value=\""+result+"\"/>";
		} catch (Exception e) {
			System.out.println("Erro at save contract: "+e.toString());
		}
		return head;
	}
	
	@RequestMapping("/contract/download/{con}")
	@ResponseBody
	public String downloadContract(@PathVariable("con") String con){
		try {
			stfx.toFile(con, "contrato");
		} catch (Exception e) {
			System.out.println("Erro at download: "+e.toString());
		}
		return null;
	}*/
}
