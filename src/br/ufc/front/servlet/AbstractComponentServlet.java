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
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import br.ufc.front.controller.AbstractComponentController;
import br.ufc.front.model.mapping.AbstractComponentType;

public class AbstractComponentServlet extends HttpServlet{
	
	private JAXBContext context;
	private Marshaller marshal;
	private Unmarshaller unmarshaller;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		AbstractComponentController acc = new AbstractComponentController();
		
		switch (request.getParameter("action")) {
		case "get":	
			AbstractComponentType act = acc.getAbstractComponent(request.getParameter("cmp"));
			StringWriter sw = new StringWriter();
			try{
				context = JAXBContext.newInstance(AbstractComponentType.class);
				marshal = context.createMarshaller();
				marshal.marshal(act, sw);
			}catch(Exception e){
				System.out.println("Erro no servlet-abstract-component:"+e.toString());
			}
			out.println(sw);
			break;
		case "save":
			try {
				context = JAXBContext.newInstance(br.ufc.front.model.mapping.ObjectFactory.class.getPackage().getName(),
						br.ufc.front.model.mapping.ObjectFactory.class.getClassLoader());
				unmarshaller = context.createUnmarshaller();
				
				InputStream content = new ByteArrayInputStream(request.getParameter("cmp").getBytes());
				JAXBElement<AbstractComponentType> element = (JAXBElement<AbstractComponentType>) unmarshaller.unmarshal(content);
				AbstractComponentType ac = element.getValue();
				
				out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
				if(acc.addAbstractComponent(ac)){	
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
