package br.ufc.hpc.frontend.util;

import br.ufc.hpc.frontend.webservice.CoreServices;
import br.ufc.hpc.frontend.webservice.CoreServicesDBHandlerException_Exception;
import br.ufc.hpc.frontend.webservice.CoreServicesIOException_Exception;
import br.ufc.hpc.frontend.webservice.CoreServicesParserConfigurationException_Exception;
import br.ufc.hpc.frontend.webservice.CoreServicesSAXException_Exception;

public class MainTeste {

	public static void main(String[] args) {
		CoreServices service = new CoreServices();
		String componente = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><p0:abstract_component xmlns:p0=\"http://storm.lia.ufc.br\" name=\"COMPONENTE_teste2\" kind=\"1\"><p0:supertype name=\"MMMTteste\" id_ac=\"325\"/><p0:context_parameter variance=\"1\" name=\"p_context2\" kind=\"1\"><p0:bound_value>100</p0:bound_value><p0:numeric_domain>direct</p0:numeric_domain></p0:context_parameter><p0:quality_parameters name=\"PAR_quality\" kind_id=\"2\"/><p0:cost_parameters name=\"PAR_cost\" kind_id=\"3\"/><p0:ranking_parameters name=\"PAR_ranking\" kind_id=\"4\"/></p0:abstract_component>";
		try {
			System.out.println(service.getCoreServicesHttpSoap11Endpoint().addAbstractComponent(componente));
			//System.out.println(service.getCoreServicesHttpSoap11Endpoint().list());
		} catch (CoreServicesDBHandlerException_Exception e) {
			System.err.println("CoreServicesDBHandlerException");
			e.printStackTrace();
		} catch (CoreServicesIOException_Exception e) {
			System.err.println("CoreServicesIOException");
			e.printStackTrace();
		} catch (CoreServicesParserConfigurationException_Exception e) {
			System.err.println("CoreServicesParserConfigurationException");
			e.printStackTrace();
		} catch (CoreServicesSAXException_Exception e) {
			System.err.println("CoreServicesSAXException");
			e.printStackTrace();
		}

	}

}
