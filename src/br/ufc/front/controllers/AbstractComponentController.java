package br.ufc.front.controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.ufc.front.webservice.CoreServices;

@WebServlet("/abstractComponentCore")
public class AbstractComponentController extends HttpServlet{
	
	private CoreServices service;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		service = new CoreServices();
		
		switch (request.getParameter("action")) {
		case "list":
			try {
				String components = service.getCoreServicesHttpSoap11Endpoint().list();
				out.println(components);
			} catch (Exception e) {
				System.out.println("Erro no servlet-abstract-component:"+e.toString());
			}
			break;
		case "get":	
			try {
				String component = service.getCoreServicesHttpSoap11Endpoint().getAbstractComponent(request.getParameter("cmp"));
				out.println(component);
			} catch (Exception e) {
				System.out.println("Erro no servlet-abstract-component:"+e.toString());
			}
			break;
		case "save":
			try {
				//System.out.println(request.getParameter("cmp"));
				Boolean result = service.getCoreServicesHttpSoap11Endpoint().addAbstractComponent(request.getParameter("cmp"));
				
				out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
				if(result){	
					out.println("<result value=\"true\"/>");
				}else{
					out.println("<result value=\"false\"/>");
				}
				
			} catch (Exception e) {
				System.out.println("Erro no servlet-abstract-component:");
				e.printStackTrace();
			}
			break;
		case "addContextParameter":
			try{
				Boolean result = service.getCoreServicesHttpSoap11Endpoint().addContextParameter(request.getParameter("cmp"));
				
				out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
				if(result){	
					out.println("<result value=\"true\"/>");
				}else{
					out.println("<result value=\"false\"/>");
				}
			}catch(Exception e){
				System.out.println("Erro no servlet-abstract-component:");
				e.printStackTrace();
			}
			break;
		case "addAbstractUnit":
			try{
				Integer result = service.getCoreServicesHttpSoap11Endpoint().addAbstractUnit(request.getParameter("cmp"));
				System.out.println(result);
				out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?><result value=\""+result+"\"/>");
				/*if(result){	
					out.println("<result value=\"true\"/>");
				}else{
					out.println("<result value=\"false\"/>");
				}*/
			}catch(Exception e){
				System.out.println("Erro no servlet-abstract-component:");
				e.printStackTrace();
			}
			break;
			
		default:
			break;
		}
		
	}
}
