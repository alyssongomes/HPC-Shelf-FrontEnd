package br.ufc.front.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.ufc.front.controller.AbstractComponentController;
import br.ufc.front.webservice.CoreServices;

@WebServlet("/abstractComponent")
public class AbstractComponentServlet extends HttpServlet{
	
	private CoreServices service;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		AbstractComponentController acc = new AbstractComponentController();
		service = new CoreServices();
		
		switch (request.getParameter("action")) {
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
		default:
			break;
		}
		
	}
}
