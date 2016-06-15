package br.ufc.front.servlet;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
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

//import br.ufc.front.webservice.CoreServices;

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
			
		case "download":
			try {
				
				String pat = getClass().getResource("").toString().replace("file:", "");
				String pat2 = pat.substring(0,pat.length()-38);
				Path file = Paths.get(pat2+"/file");
				
				OutputStream os = new FileOutputStream(file.toString()+"/contrato.xml",false);
				OutputStreamWriter osw = new OutputStreamWriter(os);
				BufferedWriter bw = new BufferedWriter(osw);
				
				bw.write(request.getParameter("con"));
				bw.newLine();
				bw.close();
				
				/*InputStream is = new FileInputStream(getClass().getResource("").getFile().toString()+"saida.xml");
				InputStreamReader isr = new InputStreamReader(is);
				BufferedReader br = new BufferedReader(isr);
				String s = br.readLine();
				while(s != null){
					System.out.println(s);
					s = br.readLine();
				}
				br.close();*/
				
				
				
			} catch (Exception e) {
				System.out.println("Erro no servlet-context-contract: "+e.toString());
			}
			break;

		default:
			break;
		}
	}
	
	private void enviaArquivo(HttpServletResponse response, InputStream is, OutputStream os) throws IOException {
		int read=0;
		byte[] bytes = new byte[1024];
		while((read = is.read(bytes))!= -1){
			os.write(bytes, 0, read);
		}
		os.flush();
	}
	
	
}
