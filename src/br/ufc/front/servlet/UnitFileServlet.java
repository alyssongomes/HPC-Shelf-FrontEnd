package br.ufc.front.servlet;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import br.ufc.front.controller.UnitFileController;
import br.ufc.front.model.mapping.ContextContract;
import br.ufc.front.model.mapping.UnitFileType;

public class UnitFileServlet extends HttpServlet{
	
	private JAXBContext context;
	private Marshaller marshal;
	private Unmarshaller unmarshaller;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		UnitFileController ufc = new UnitFileController();
		
		try {
			context = JAXBContext.newInstance(br.ufc.front.model.mapping.ObjectFactory.class.getPackage().getName(),
					br.ufc.front.model.mapping.ObjectFactory.class.getClassLoader());
			unmarshaller = context.createUnmarshaller();
			
			//get xml of file
			InputStream content = new ByteArrayInputStream(request.getParameter("xml").getBytes());
			JAXBElement<UnitFileType> element = (JAXBElement<UnitFileType>) unmarshaller.unmarshal(content);
			UnitFileType uft = element.getValue();
			
			//get bytes of file
			byte[] data = request.getParameter("file").getBytes();
			
			out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
			if(ufc.addUnitFile(data, uft)){
				out.println("<result value=\"true\"/>");
			}else{
				out.println("<result value=\"false\"/>");
			}
			
		} catch (Exception e) {
			System.out.println("Erro no servlet-unit-file: "+e.toString());
		}
		
	}
}
