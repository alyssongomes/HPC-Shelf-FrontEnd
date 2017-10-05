package br.ufc.hpc.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.util.SaveToFileXML;
import br.ufc.hpc.frontend.webservice.CoreServices;

@Controller
public class ExecuteComponentController{
	
	private CoreServices service = new CoreServices();
	private SaveToFileXML stfx = new SaveToFileXML();
	
	@RequestMapping("/contract/resolve")
	@ResponseBody
	public String resolve(@RequestBody String con){
		try {
			System.out.println(con);
			String contracts = service.getCoreServicesHttpSoap11Endpoint().resolve(con);
			stfx.toFile(contracts, "candidates");
			return contracts;
		} catch (Exception e) {
			System.out.println("Erro at resolve: "+e.toString());
			return "<?xml version='1.0' encoding='UTF-8'?><contract_list xmlns=\"http://storm.lia.ufc.br\"></contract_list>";
		}
	}
	
	@RequestMapping("/contract/deploy")
	@ResponseBody
	public String deploy(@RequestBody String list){
		try {
			System.out.println(list.getBytes().length);
			StringBuffer c =  new StringBuffer();
			c.append(list);
		
			String computation = service.getCoreServicesHttpSoap11Endpoint().deploy(c.toString());
			System.out.println(computation);
			stfx.toFile(computation, "system");
			return computation;
		} catch (Exception e) {
			System.out.println("Erro no servlet-execute-component: "+e.toString());
			return "<?xml version='1.0' encoding='UTF-8'?><computational_system xmlns=\"http://storm.lia.ufc.br\" ></computational_system>";
		}	
	}
	
	@RequestMapping("/contract/instantiate")
	@ResponseBody
	public String instant(@RequestBody String sys){
		try {
			String computation = service.getCoreServicesHttpSoap11Endpoint().instantiate(sys);
			System.out.println(computation);
			return computation;
		} catch (Exception e) {
			System.out.println("Erro no servlet-execute-component: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping("/contract/destroy")
	@ResponseBody
	public String destroy(@RequestBody String sys){
		try {
			Boolean result = service.getCoreServicesHttpSoap11Endpoint().releasePlatform(sys);
			System.out.println(result);
			return result==true? "Liberada e Encerrada!":"Erro ao Liberar!";
		} catch (Exception e) {
			System.out.println("Erro no servlet-execute-component: "+e.toString());
		}
		return "Erro ao Liberar!";
	}
	
}
