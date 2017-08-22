package br.ufc.hpc.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.util.SaveToFileXML;

@Controller
public class WorkflowController {

	private SaveToFileXML stfx = new SaveToFileXML();
	
	@RequestMapping(value={"/workflow/download"},method=RequestMethod.POST)
	@ResponseBody
	public String download(@RequestBody String work){
		try{
			System.out.println(work);
			stfx.toFile(work, "workflow");
			return "Arquivo criado com sucesso!";
		}catch (Exception e) {
			System.out.println("Erro at download: "+e.toString());
		}
		return "Erro ao baixar o arquivo";
	}
	
}
