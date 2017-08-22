package br.ufc.hpc.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.util.SaveToFileXML;

@Controller
public class ArchitectureController {

	private SaveToFileXML stfx = new SaveToFileXML();
	
	@RequestMapping(value={"/architecture/download"}, method=RequestMethod.POST)
	@ResponseBody
	public String download(@RequestBody String arch){
		try{
			System.out.println(arch);
			stfx.toFile(arch, "architecture");
			return "Arquivo criado com sucesso!";
		}catch (Exception e) {
			System.out.println("Erro at download: "+e.toString());
		}
		return "Erro ao baixar o arquivo";
	}
	
}
