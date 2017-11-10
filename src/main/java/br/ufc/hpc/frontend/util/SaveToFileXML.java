package br.ufc.hpc.frontend.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;

public class SaveToFileXML {
	
	public void toFile(String content, String nameFile) throws IOException{
		String pat = getClass().getResource("").toString().replace("file:/", "");
		System.out.println(getClass().getResource("").toString());
		String pat2 = pat.substring(0,pat.length()-26);
		Path path = Paths.get(pat2+"/static/file");
		
		File file = new File(path.toString()+"/"+nameFile+".xml");
		if(file.exists()){
			//Abri um canal inserir o conteúdo no arquivo existente
			OutputStream os = new FileOutputStream(path.toString()+"/"+nameFile+".xml",false);
			OutputStreamWriter osw = new OutputStreamWriter(os);
			BufferedWriter bw = new BufferedWriter(osw);
			
			bw.write(content);
			bw.newLine();
			bw.close();
		}else{
			//Cria o arquivo e inseri o conteúdo
			FileWriter arq = new FileWriter(path.toString()+"/"+nameFile+".xml");
		    PrintWriter write = new PrintWriter(arq);
		    write.printf(content);
		    arq.close();
		}
	}
}
