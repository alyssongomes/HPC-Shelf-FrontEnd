package br.ufc.front.controller;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

import br.ufc.front.model.mapping.AbstractComponent;
import br.ufc.front.model.mapping.AbstractComponentType;
import br.ufc.front.model.mapping.Root;

public class AbstractComponentController {
	
	private static String URL_LIST_ABSTRACT_COMPONENTS = "http://storm.lia.ufc.br:8080/axis2/services/CoreServices?list";
	private static String URL_GET_ABSTRACT_COMPONENT = "http://storm.lia.ufc.br:8080/axis2/services/CoreServices/getAbstractComponent?name=";
	private static String URL_ADD_ABSTRACT_COMPONENT = "http://storm.lia.ufc.br:8080/axis2/services/CoreServices/addAbstractComponent?cmp=";
	
	public Root getListAbstractComponents(){
		HttpURLConnection connection = null;
		try {
			
			//URL url = new URL("http://localhost/list.xml");
			URL url = new URL(URL_LIST_ABSTRACT_COMPONENTS);
			connection = (HttpURLConnection) url.openConnection();			
			InputStream content = connection.getInputStream();
						
			content = XMLFilter.filter(content,new String[] {"ac_id","<ns:listResponse xmlns:ns=\"http://webservices.storm.ufc.br\"><ns:return>","</ns:return></ns:listResponse>","&lt;","&#xd;"}, new String[]{"id","","","<","\n"});
			
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
	
	public AbstractComponentType getAbstractComponent(String name){
		HttpURLConnection connection = null;
		AbstractComponentType ac = null;
		try {
			//URL url = new URL("http://localhost/component.xml");
			String strURL = URL_GET_ABSTRACT_COMPONENT + URLEncoder.encode(name,"UTF-8");
			
			URL url = new URL(strURL);
			connection = (HttpURLConnection) url.openConnection();			
			InputStream content = connection.getInputStream();
			
			content = XMLFilter.filter(content,new String[] {"<ns:getAbstractComponentResponse xmlns:ns=\"http://webservices.storm.ufc.br\"><ns:return>","</ns:return></ns:getAbstractComponentResponse>","&lt;","&#xd;"}, new String[]{"","","<","\n"});
			
			JAXBContext context = JAXBContext.newInstance(br.ufc.front.model.mapping.ObjectFactory.class.getPackage().getName(),
					br.ufc.front.model.mapping.ObjectFactory.class.getClassLoader());
			Unmarshaller unmarshaller = context.createUnmarshaller();
			JAXBElement<AbstractComponentType> element = (JAXBElement<AbstractComponentType>) unmarshaller.unmarshal(content);
			ac = element.getValue();
			
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		return ac;
	}
	
	public boolean addAbstractComponent(AbstractComponentType cmp){
		HttpURLConnection connection = null;
		try{
			StringWriter sw = new StringWriter();
			JAXBContext context = JAXBContext.newInstance(AbstractComponentType.class);
			Marshaller marshal = context.createMarshaller();
			marshal.marshal(cmp, sw);
			
			String strURL = URL_ADD_ABSTRACT_COMPONENT + URLEncoder.encode(sw.toString(),"UTF-8");
			
			URL url = new URL(strURL.trim());
			connection = (HttpURLConnection) url.openConnection();			
			InputStream content = connection.getInputStream();
			
			InputStreamReader isr = new InputStreamReader(content);
			BufferedReader br = new BufferedReader(isr);
			String s = br.readLine();
			while(s != null){
				System.out.println(s);
				s = br.readLine();
			}
			
			//System.out.println(sw);
			return true;
		}catch(Exception e){
			System.out.println(e.toString());
		}
		return false;
	}
	
}
