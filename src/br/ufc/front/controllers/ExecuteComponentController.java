package br.ufc.front.controllers;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.URLDecoder;

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
				System.out.println(request.getParameter("con"));
				String contracts = service.getCoreServicesHttpSoap11Endpoint().resolve(request.getParameter("con"));
				stfx.toFile(contracts, "candidates");
				out.println(contracts);
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}	
			break;
		case "deploy":
			try {
				System.out.println(request.getParameter("list").getBytes().length);
				StringBuffer c =  new StringBuffer();
				c.append(request.getParameter("list"));
				//String candidates = URLDecoder.decode(request.getParameter("list"), "UTF-8");
				//System.out.println("Lista "+c);
				
				OutputStream os = new FileOutputStream("teste.xml",false);
				OutputStreamWriter osw = new OutputStreamWriter(os);
				BufferedWriter bw = new BufferedWriter(osw);
				
				bw.write(c.toString());
				bw.newLine();
				bw.close();
				
				
				String computation = service.getCoreServicesHttpSoap11Endpoint().deploy(c.toString());
				System.out.println(computation);
				/*stfx.toFile(computation, "system");
				out.println(computation);*/
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}	
			break;
		case "instant":
			try {
				String computation = service.getCoreServicesHttpSoap11Endpoint().instantiate(request.getParameter("sys"));
				System.out.println(computation);
				out.println(computation);
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}
			break;
		case "destroy":
			try {
				Boolean result = service.getCoreServicesHttpSoap11Endpoint().releasePlatform(request.getParameter("sys"));
				System.out.println(result);
				out.println(result==true? "Liberada e Encerrada!":"Erro ao Liberar!");
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}
			break;
		case "status":
			
			break;
		}
	}
	
}
