package br.ufc.front.controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.ufc.front.util.SaveToFileXML;
import br.ufc.front.webservice.CoreServices;

@WebServlet("/executeComponet")
public class ExecuteComponentController extends HttpServlet{
	
	private CoreServices service;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		service = new CoreServices();
		SaveToFileXML stfx = new SaveToFileXML();
		
		switch(request.getParameter("action")){
		case "resolve":
			try {
				String contracts = service.getCoreServicesHttpSoap11Endpoint().resolve(request.getParameter("con"));
				//System.out.println(contracts);
				stfx.toFile(contracts, "candidates");
				out.println(contracts);
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}	
			break;
		case "deploy":
			try {
				String computation = service.getCoreServicesHttpSoap11Endpoint().deploy(request.getParameter("list"));
				stfx.toFile(computation, "system");
				out.println(computation);
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}	
			break;
		case "instant":
			//System.out.println(request.getParameter("sys"));
			try {
				String computation = service.getCoreServicesHttpSoap11Endpoint().instantiate(request.getParameter("sys"));
				System.out.println(computation);
				out.println(computation);
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}
			break;
		case "destroy":
			//System.out.println(request.getParameter("sys"));
			try {
				Boolean result = service.getCoreServicesHttpSoap11Endpoint().releasePlatform(request.getParameter("sys"));
				System.out.println(result);
				out.println(result==true? "Destruiu.":"Erro.");
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}
			break;
		case "status":
			
			break;
		}
	}
	
}
