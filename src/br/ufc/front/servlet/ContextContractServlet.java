package br.ufc.front.servlet;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import br.ufc.front.controller.ContextContractController;
import br.ufc.front.model.mapping.ContextContract;
import br.ufc.front.model.mapping.ContractList;

public class ContextContractServlet extends HttpServlet{
	
	private JAXBContext context;
	private Marshaller marshal;
	private Unmarshaller unmarshaller;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		ContextContractController ccc = new ContextContractController();
		
		switch (request.getParameter("action")) {
		case "list":
			ContractList cl = ccc.listContract(Integer.parseInt(request.getParameter("acid")));
			StringWriter sw = new StringWriter();

			try {
				context = JAXBContext.newInstance(ContractList.class);
				marshal = context.createMarshaller();
				marshal.marshal(cl, sw);
			} catch (Exception e) {
				System.out.println("Erro no servlet-context-contract: "+e.toString());
			}
			out.println(sw);
			break;
		case "save":
			try {
				context = JAXBContext.newInstance(br.ufc.front.model.mapping.ObjectFactory.class.getPackage().getName(),
						br.ufc.front.model.mapping.ObjectFactory.class.getClassLoader());
				unmarshaller = context.createUnmarshaller();
				
				InputStream content = new ByteArrayInputStream(request.getParameter("con").getBytes());
				JAXBElement<ContextContract> element = (JAXBElement<ContextContract>) unmarshaller.unmarshal(content);
				ContextContract cc = element.getValue();
				
				out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
				if(ccc.addContextContract(cc)){
					out.println("<result value=\"true\"/>");
				}else {
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
