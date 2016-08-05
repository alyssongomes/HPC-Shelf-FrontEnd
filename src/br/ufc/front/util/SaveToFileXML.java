package br.ufc.front.util;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SaveToFileXML {
	
	public void toFile(String content, String nameFile){
		try{
			String pat = getClass().getResource("").toString().replace("file:", "");
			String pat2 = pat.substring(0,pat.length()-38);
			Path file = Paths.get(pat2+"/resources/file");
			
			OutputStream os = new FileOutputStream(file.toString()+"/"+nameFile+".xml",false);
			OutputStreamWriter osw = new OutputStreamWriter(os);
			BufferedWriter bw = new BufferedWriter(osw);
			
			bw.write(content);
			bw.newLine();
			bw.close();
		}catch(Exception e){
			System.out.println(e.toString());
		}
	}
}
