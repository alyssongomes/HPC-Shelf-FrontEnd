package br.ufc.hpc.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.webservice.CoreServices;


@Controller
public class AbstractComponentController{
	
	/*private CoreServices service = new CoreServices();
	
	@RequestMapping(value={"/component/list"}, method=RequestMethod.GET)
	@ResponseBody
	public String listAllComponent(){
		try {
			String components = service.getCoreServicesHttpSoap11Endpoint().list();
			return components;
		} catch (Exception e) {
			System.out.println("Erro at list component: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping("/component/get/{cmp}")
	@ResponseBody
	public String getComponent(@PathVariable("cmp") String cmp){
		try {
			String component = service.getCoreServicesHttpSoap11Endpoint().getAbstractComponent(cmp);
			return component;
		} catch (Exception e) {
			System.out.println("Erro at get component: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping("/component/save/{cmp}")
	@ResponseBody
	public String saveComponent(@PathVariable("cmp") String cmp){
		String head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		try {
			Boolean result = service.getCoreServicesHttpSoap11Endpoint().addAbstractComponent(cmp);
			return head+"<result value=\""+result+"\"/>";
		} catch (Exception e) {
			System.out.println("Erro at save component: "+e.toString());
		}
		return head;
	}
	
	@RequestMapping("/component/addParameter/{cmp}")
	@ResponseBody
	public String addParameter(@PathVariable("cmp") String cmp){
		String head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"; 
		try {
			Boolean result = service.getCoreServicesHttpSoap11Endpoint().addContextParameter(cmp);
			return head+"<result value=\""+result+"\"/>";
		} catch (Exception e) {
			System.out.println("Erro at add parameter: "+e.toString());
		}
		return head;
	}
	
	@RequestMapping("/component/addUnit/{cmp}")
	@ResponseBody
	public String addUnit(@PathVariable("cmp") String cmp){
		String head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		try{
			Integer result = service.getCoreServicesHttpSoap11Endpoint().addAbstractUnit(cmp);
			System.out.println(result);
			return head+"<result value=\""+result+"\"/>";
		}catch(Exception e){
			System.out.println("Erro at add unit: "+e.toString());
		}
		return head;
	}*/
}
