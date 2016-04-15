package br.ufc.front.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import br.ufc.front.model.mapping.AbstractComponent;
import br.ufc.front.model.mapping.Root;
import br.ufc.front.webservice.CoreServices;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class AbstractComponentController {
	
	CoreServices service;
	
	public Root getListAbstractComponents(){
		service = new CoreServices();
		
		try {
			InputStream content = new ByteArrayInputStream(service.getCoreServicesHttpSoap11Endpoint().list().getBytes());
			
			XStream stream = new XStream(new DomDriver());
			stream.alias("root", Root.class);
			stream.alias("abstract_component", AbstractComponent.class);
			stream.addImplicitCollection(Root.class, "abstract_component", AbstractComponent.class);
			stream.aliasAttribute(AbstractComponent.class, "id", "id");
			stream.aliasAttribute(AbstractComponent.class, "name", "name");
			stream.aliasAttribute(AbstractComponent.class, "path", "path");
			stream.aliasAttribute(AbstractComponent.class, "supertype","supertype");
			
			return (Root) stream.fromXML(content);
		} catch (Exception e) {
			System.out.println("Error: "+e.toString());
		}
		return null;
	}
	
}
