package br.ufc.front.servlet;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.ufc.front.webservice.CoreServices;

@WebServlet("/executeComponet")
public class ExecuteComponent extends HttpServlet{
	
	private CoreServices service;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		service = new CoreServices();
		
		switch(request.getParameter("action")){
		case "resolve":
			try {
				String contracts = service.getCoreServicesHttpSoap11Endpoint().resolve(request.getParameter("con"));
				//System.out.println(contracts);
				toFile(contracts, "candidates");
				out.println(contracts);
			} catch (Exception e) {
				System.out.println("Erro no servlet-execute-component: "+e.toString());
			}	
			break;
		case "deploy":
			try {
				String computation = service.getCoreServicesHttpSoap11Endpoint().deploy(request.getParameter("list"));
				toFile(computation, "system");
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
	
	private void toFile(String content, String nameFile){
		try{

			String pat = getClass().getResource("").toString().replace("file:", "");
			String pat2 = pat.substring(0,pat.length()-38);
			Path file = Paths.get(pat2+"/file");
			
			OutputStream os = new FileOutputStream(file.toString()+"/"+nameFile+".xml",false);
			OutputStreamWriter osw = new OutputStreamWriter(os);
			BufferedWriter bw = new BufferedWriter(osw);
			
			bw.write(content);
			bw.newLine();
			bw.close();

		}catch(Exception e){
			System.out.println(e.toString());
		}
	}
	
}
