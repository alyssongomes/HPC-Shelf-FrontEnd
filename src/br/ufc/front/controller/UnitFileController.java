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
import javax.xml.bind.Marshaller;

import br.ufc.front.model.mapping.UnitFileType;

public class UnitFileController {
	
	private static String URL_ADD_UNIT_FILE = "http://storm.lia.ufc.br:8080/axis2/services/CoreServices/addUnitFile";
	
	public boolean addUnitFile(byte[] data, UnitFileType unit){
		HttpURLConnection connection = null;
		try {
			//create xml of the unit
			StringWriter sw = new StringWriter();
			JAXBContext context = JAXBContext.newInstance(UnitFileType.class);
			Marshaller marshal = context.createMarshaller();
			marshal.marshal(unit, sw);
			
			StringBuilder parameters = new StringBuilder();
			
			//add parameters
			parameters.append("data=");
			parameters.append(URLEncoder.encode(new String(data),"UTF-8"));
			parameters.append("&xml=");
			parameters.append(URLEncoder.encode(new String(sw.toString()),"UTF-8"));
			
			URL url = new URL(URL_ADD_UNIT_FILE);
			connection = (HttpURLConnection) url.openConnection();
			
			connection.setDoOutput(true);
			connection.setDoInput(true);
			connection.setRequestMethod("POST"); 
			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded"); 
			connection.setRequestProperty("charset","UTF-8");
			connection.setRequestProperty("Content-Length",Integer.toString(parameters.toString().getBytes().length));
			
			DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
			wr.writeBytes(parameters.toString());
			wr.flush();
			wr.close();
			connection.disconnect();
			
			
			
			return true;
			
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		return false;
	}
	
}
