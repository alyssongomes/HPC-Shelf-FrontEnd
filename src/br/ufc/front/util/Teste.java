package br.ufc.front.util;

import br.ufc.front.webservice.CoreServices;

public class Teste {

	public static void main(String[] args) {
		CoreServices service = new CoreServices();
		String contrato = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><tns:context_contract xmlns:tns=\"http://storm.lia.ufc.br\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://storm.lia.ufc.br ContextualContract.xsd \">  <tns:context_arguments variable_cp_id=\"16\">  	<tns:context_contract cc_id=\"23\">  		<tns:abstract_component></tns:abstract_component>  	</tns:context_contract></tns:context_arguments>  <tns:abstract_component id_ac=\"35\" >  	<tns:supertype id_ac=\"55\"></tns:supertype></tns:abstract_component></tns:context_contract>";
		try {
			String contracts = service.getCoreServicesHttpSoap11Endpoint().resolve(contrato);
			System.out.println(contracts);
			
		} catch (Exception e) {
			System.out.println("Erro no servlet-execute-component: "+e.toString());
		}	

	}

}
