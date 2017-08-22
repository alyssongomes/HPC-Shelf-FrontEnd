package br.ufc.hpc.frontend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;


@Controller
public class UnitFileController{
	
	//private CoreServices service = new CoreServices();
	
	@RequestMapping("/unitFile")
	public String unitFile(HttpServletRequest request, @RequestParam("file") MultipartFile file){
		String ack = "false";
		try{
			byte[] arquive = file.getBytes();
			
			UnitFileType uft = new UnitFileType();
            uft.filename = request.getParameter("filename");
            uft.extension = request.getParameter("filextension");
            uft.version = Double.parseDouble(request.getParameter("version"));
            uft.filetype = Integer.parseInt(request.getParameter("filetype"));
            uft.buildCfg = request.getParameter("build");
            uft.path = request.getParameter("path");
            uft.uid = Integer.parseInt(request.getParameter("uid"));
            
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
            ack = "true";
            /*Boolean result = service.getCoreServicesHttpSoap11Endpoint().addUnitFile(arquive, xml);
			if(result){
				ack = "true";
			}*/
		}catch (Exception e) {
			System.out.println("Erro at unit file: "+e.toString());
		}
		return "redirect:upload?ack="+ack;
	}
	
}

class UnitFileType{
    public String filename;
    public String extension;
    public String buildCfg;
    public Double version;
    public Integer filetype;
    public Integer uid; 
    public String path;
    public Integer fileId;
}
