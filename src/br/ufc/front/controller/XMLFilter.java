package br.ufc.front.controller;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

public class XMLFilter {
	
	public static InputStream filter(InputStream content, String[] oldChars, String[] newChars){
		try{
			InputStreamReader isr = new InputStreamReader(content);
			BufferedReader br = new BufferedReader(isr);
			String load = "";
			String s = br.readLine();
			while(s != null){
				load += s;
				s = br.readLine();
			}
			for (int i = 0; i < oldChars.length; i++) {
				load = load.replaceAll(oldChars[i], newChars[i]);
			}
			br.close();
			InputStream result = new ByteArrayInputStream(load.getBytes());
			return result;
		}catch(Exception e){
			System.out.println(e.toString());
		}
		return null;
	}
}
