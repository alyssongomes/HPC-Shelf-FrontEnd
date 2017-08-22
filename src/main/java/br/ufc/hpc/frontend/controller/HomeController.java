package br.ufc.hpc.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping("/")
	public String login(){
		return "login";
	}
	
	@RequestMapping("/home")
	public String home(){
		return "home";
	}
	
	@RequestMapping("/settings")
	public String settings(){
		return "settings";
	}
	
	@RequestMapping("/component")
	public String component(){
		return "/component/abstractComponent";
	}
	
	@RequestMapping("/contract")
	public String contract(){
		return "/component/contextContract";
	}
	
	@RequestMapping("/upload")
	public String upload(){
		return "/component/uploadSourceCode";
	}
	
	@RequestMapping("/execute")
	public String execute(){
		return "/component/executeComponent";
	}
	
	@RequestMapping("/architecture")
	public String architecture(){
		return "/workflow/buildArchitecture";
	}
	
	@RequestMapping("/workflow")
	public String workflow(){
		return "/workflow/buildWorkflow";
	}
	
}
