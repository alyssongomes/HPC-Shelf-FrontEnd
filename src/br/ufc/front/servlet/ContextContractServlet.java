package br.ufc.front.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.ufc.front.webservice.CoreServices;

@WebServlet("/contextContract")
public class ContextContractServlet extends HttpServlet{
	
	private CoreServices service;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		service = new CoreServices();
		
		switch (request.getParameter("action")) {
		case "list":
			try {
				String contracts = service.getCoreServicesHttpSoap11Endpoint().listContract(Integer.parseInt(request.getParameter("acid")));
				out.println(contracts);
			} catch (Exception e) {
				System.out.println("Erro no servlet-context-contract: "+e.toString());
			}
			
			break;
		case "save":
			try {				
				Boolean result = service.getCoreServicesHttpSoap11Endpoint().addContextContract(request.getParameter("con"));
				
				out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
				if(result){	
					out.println("<result value=\"true\"/>");
				}else{
					out.println("<result value=\"false\"/>");
				}
				
			} catch (Exception e) {
				System.out.println("Erro no servlet-context-contract: "+e.toString());
			}
			break;

		default:
			break;
		}
	}
}
