package br.ufc.front.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
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

import br.ufc.front.model.mapping.ContextContract;
import br.ufc.front.model.mapping.ContractList;

public class ContextContractController {
	
	private static String URL_LIST_CONTRACT = "http://storm.lia.ufc.br:8080/axis2/services/CoreServices/listContract?ac_id=";
	private static String URL_ADD_CONTEXT_CONTRACT = "http://storm.lia.ufc.br:8080/axis2/services/CoreServices/addContextContract?cmp=";
	
	public ContractList listContract(int ac_id){
		HttpURLConnection connection = null;
		ContractList cl = null;
		try {
			//URL url = new URL("http://localhost/contracts.xml");
			URL url = new URL(URL_LIST_CONTRACT+ac_id);
			connection = (HttpURLConnection) url.openConnection();			
			InputStream content = connection.getInputStream();
			
			content = XMLFilter.filter(content,new String[] {"<ns:listContractResponse xmlns:ns=\"http://webservices.storm.ufc.br\"><ns:return>","</ns:return></ns:listContractResponse>","&lt;","&#xd;","&gt;"}, new String[]{"","","<","\n",">"});
			
			JAXBContext context = JAXBContext.newInstance(br.ufc.front.model.mapping.ObjectFactory.class.getPackage().getName(),
					br.ufc.front.model.mapping.ObjectFactory.class.getClassLoader());
			Unmarshaller unmarshaller = context.createUnmarshaller();
			JAXBElement<ContractList> element = (JAXBElement<ContractList>) unmarshaller.unmarshal(content);
			cl = element.getValue();
			
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		return cl;
	}
	
	public boolean addContextContract(ContextContract ctc){
		HttpURLConnection connection = null;
		try{
			StringWriter sw = new StringWriter();
			JAXBContext context = JAXBContext.newInstance(ContextContract.class);
			Marshaller marshal = context.createMarshaller();
			marshal.marshal(ctc, sw);
			
			String strURL = URL_ADD_CONTEXT_CONTRACT + URLEncoder.encode(sw.toString(),"UTF-8");
			
			URL url = new URL(strURL);
			connection = (HttpURLConnection) url.openConnection();
	        
			/*InputStream content = connection.getInputStream();
			
			InputStreamReader isr = new InputStreamReader(content);
			BufferedReader br = new BufferedReader(isr);
			String s = br.readLine();
			while(s != null){
				System.out.println(s);
				s = br.readLine();
			}*/
			
			//System.out.println(sw);
			return true;
		}catch(Exception e){
			System.out.println(e.toString());
		}
		return false;
	}
}
