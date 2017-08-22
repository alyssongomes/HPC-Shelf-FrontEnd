package br.ufc.hpc.frontend.controller;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.util.SaveToFileXML;
import br.ufc.hpc.frontend.webservice.CoreServices;

@Controller
public class ExecuteComponentController{
	
	/*private CoreServices service = new CoreServices();
	private SaveToFileXML stfx = new SaveToFileXML();
	
	@RequestMapping("/contract/resolve/{con}")
	@ResponseBody
	public String resolve(@PathVariable("con") String con){
		try {
			System.out.println(con);
			String contracts = service.getCoreServicesHttpSoap11Endpoint().resolve(con);
			stfx.toFile(contracts, "candidates");
			return contracts;
		} catch (Exception e) {
			System.out.println("Erro at resolve: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping("/contract/deploy/{list}")
	@ResponseBody
	public String deploy(@PathVariable("list") String list){
		try {
			System.out.println(list.getBytes().length);
			StringBuffer c =  new StringBuffer();
			c.append(list);
			//String candidates = URLDecoder.decode(request.getParameter("list"), "UTF-8");
			//System.out.println("Lista "+c);
			
			OutputStream os = new FileOutputStream("teste.xml",false);
			OutputStreamWriter osw = new OutputStreamWriter(os);
			BufferedWriter bw = new BufferedWriter(osw);
			
			bw.write(c.toString());
			bw.newLine();
			bw.close();
			
			
			String computation = service.getCoreServicesHttpSoap11Endpoint().deploy(c.toString());
			System.out.println(computation);*/
			/*stfx.toFile(computation, "system");
			out.println(computation);*/
		/*} catch (Exception e) {
			System.out.println("Erro no servlet-execute-component: "+e.toString());
		}	
		return null;
	}
	
	@RequestMapping("/contract/instant/{sys}")
	@ResponseBody
	public String instant(@PathVariable("sys") String sys){
		try {
			String computation = service.getCoreServicesHttpSoap11Endpoint().instantiate(sys);
			System.out.println(computation);
			return computation;
		} catch (Exception e) {
			System.out.println("Erro no servlet-execute-component: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping("/contract/destroy/{sys}")
	@ResponseBody
	public String destroy(@PathVariable("sys") String sys){
		try {
			Boolean result = service.getCoreServicesHttpSoap11Endpoint().releasePlatform(sys);
			System.out.println(result);
			return result==true? "Liberada e Encerrada!":"Erro ao Liberar!";
		} catch (Exception e) {
			System.out.println("Erro no servlet-execute-component: "+e.toString());
		}
		return "Erro ao Liberar!";
	}*/
	
}
