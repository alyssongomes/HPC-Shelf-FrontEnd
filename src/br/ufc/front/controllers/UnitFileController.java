package br.ufc.front.controllers;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet .ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

import br.ufc.front.webservice.CoreServices;

@WebServlet("/unitFile")
public class UnitFileController extends HttpServlet{
	
	CoreServices service;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String ack = "false";
		service = new CoreServices();
		try {
            byte[] file = null;
            ArrayList<String> properties = new ArrayList<String>(); 
			
			if (ServletFileUpload.isMultipartContent(request)) {
				List<FileItem> multiparts = new ServletFileUpload( new DiskFileItemFactory()).parseRequest(request);
                for(FileItem item : multiparts){
                    if(!item.isFormField()){//Senão for um campo de formulário (input text)
                    	file = item.get();
                    }else{
                    	properties.add(item.getString());
                    }
                }
			}
			
			UnitFileType uft = new UnitFileType();
            uft.filename = properties.get(5);
            uft.extension = properties.get(6);
            uft.version = Integer.parseInt(properties.get(0));
            uft.filetype = Integer.parseInt(properties.get(1));
            uft.buildCfg = properties.get(2);
            uft.path = properties.get(3);
            uft.uid = Integer.parseInt(properties.get(4));
            
            XStream stream = new XStream(new DomDriver());
            stream.alias("unit_file", UnitFileType.class);
            stream.aliasAttribute(UnitFileType.class,"filename" , "filename");
            stream.aliasAttribute(UnitFileType.class,"extension" , "extension");
            stream.aliasAttribute(UnitFileType.class,"buildCfg" , "build_cfg");
            stream.aliasAttribute(UnitFileType.class,"version" , "version");
            stream.aliasAttribute(UnitFileType.class,"filetype" , "filetype");
            stream.aliasAttribute(UnitFileType.class,"uid" , "uid");
            stream.aliasAttribute(UnitFileType.class,"path" , "path");
            String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"+stream.toXML(uft).replace("/>", " xmlns=\"http://storm.lia.ufc.br\" />").replace("unit__file", "unit_file");
            System.out.println(xml);

			Boolean result = service.getCoreServicesHttpSoap11Endpoint().addUnitFile(file, xml);
			if(result){
				ack = "true";
			}
			
		} catch (Exception e) {
			System.out.println("Erro no servlet-unit-file: "+e.toString());
		}
		response.sendRedirect("views/uploadSourceCode.jsp?ack="+ack);
	}
}

class UnitFileType{
    public String filename;
    public String extension;
    public String buildCfg;
    public Integer version;
    public Integer filetype;
    public Integer uid; 
    public String path;
    public Integer fileId;
}
