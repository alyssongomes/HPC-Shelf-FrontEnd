package br.ufc.hpc.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.webservice.CoreServices;
import ch.qos.logback.core.net.SyslogOutputStream;


@Controller
public class AbstractComponentController{
	
	private CoreServices service = new CoreServices();
	
	@RequestMapping(value={"/component/list"}, method=RequestMethod.GET)
	@ResponseBody
	public String listAllComponent(){
		try {
			String components = service.getCoreServicesHttpSoap11Endpoint().list();
//			String components = "<root><abstract_component ac_id='1' name='Componente 1' path='/componente1' supertype='0' />"
//					+"<abstract_component ac_id='2' name='Componente 2' path='/componente2' supertype='0' />"
//					+"<abstract_component ac_id='3' name='Componente 3' path='/componente3' supertype='0' />"
//					+"<abstract_component ac_id='4' name='Componente 4' path='/componente4' supertype='0' /></root>";
			return components;
		} catch (Exception e) {
			System.out.println("Erro at list component: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping("/component/get")
	@ResponseBody
	public String getComponent(@RequestBody String cmp){
		try {
			System.out.println(cmp);
			String component = service.getCoreServicesHttpSoap11Endpoint().getAbstractComponent(cmp);
			//String component = "<?xml version='1.0' encoding='UTF-8'?><abstract_component xmlns='http://storm.lia.ufc.br' name='MatrixMatrixMultiplication' id_ac='218'><supertype name='MatrixOperation' id_ac='160' /><context_parameter name='matrix_type_R' cp_id='160' kind='1'><bound cc_name='MatrixType' cc_id='334' kind_id='1'><abstract_component name='MatrixType' id_ac='225'><supertype name='Software' id_ac='2' /></abstract_component></bound></context_parameter><context_parameter name='sparse_pattern_R' cp_id='159' kind='1'><bound cc_name='MatrixPattern' cc_id='206' kind_id='1'><abstract_component name='MatrixPattern' id_ac='40'><supertype name='Software' id_ac='2' /></abstract_component></bound></context_parameter><context_parameter name='format_R' cp_id='158' kind='1'><bound cc_name='MatrixFormat' cc_id='333' kind_id='1'><abstract_component name='MatrixFormat' id_ac='284'><supertype name='DataStructure' id_ac='96' /></abstract_component></bound></context_parameter><context_parameter name='element_type_R' cp_id='157' kind='1'><bound cc_name='int' cc_id='44' kind_id='1'><abstract_component name='Int' id_ac='98'><supertype name='DataStructure' id_ac='96' /></abstract_component></bound></context_parameter><context_parameter name='matrix_type_L' cp_id='156' kind='1'><bound cc_name='MatrixType' cc_id='334' kind_id='1'><abstract_component name='MatrixType' id_ac='225'><supertype name='Software' id_ac='2' /></abstract_component></bound></context_parameter><context_parameter name='sparse_pattern_L' cp_id='155' kind='1'><bound cc_name='MatrixPattern' cc_id='206' kind_id='1'><abstract_component name='MatrixPattern' id_ac='40'><supertype name='Software' id_ac='2' /></abstract_component></bound></context_parameter><context_parameter name='Size' cp_id='107' kind='4'><bound><abstract_component id_ac='0' /></bound><bound_value>1</bound_value></context_parameter><context_parameter name='format_L' cp_id='152' kind='1'><bound cc_name='MatrixFormat' cc_id='333' kind_id='1'><abstract_component name='MatrixFormat' id_ac='284'><supertype name='DataStructure' id_ac='96' /></abstract_component></bound></context_parameter><context_parameter name='element_type_L' cp_id='151' kind='1'><bound cc_name='int' cc_id='44' kind_id='1'><abstract_component name='Int' id_ac='98'><supertype name='DataStructure' id_ac='96' /></abstract_component></bound></context_parameter><context_parameter name='max_dim_size_p' cp_id='150' kind='4'><bound><abstract_component id_ac='0' /></bound><bound_value>100000</bound_value></context_parameter><context_parameter name='max_dim_size_n' cp_id='149' kind='4'><bound><abstract_component id_ac='0' /></bound><bound_value>100000</bound_value></context_parameter><context_parameter name='max_dim_size_m' cp_id='148' kind='4'><bound><abstract_component id_ac='0' /></bound><bound_value>100000</bound_value></context_parameter><context_parameter name='Isoefficiency' cp_id='233' kind='4'><bound><abstract_component id_ac='0' /></bound><bound_value>0</bound_value></context_parameter><context_parameter name='format_S' cp_id='162' kind='1'><bound cc_name='MatrixPattern' cc_id='206' kind_id='1'><abstract_component name='MatrixPattern' id_ac='40'><supertype name='Software' id_ac='2' /></abstract_component></bound></context_parameter><context_parameter name='element_type_S' cp_id='161' kind='1'><bound cc_name='int' cc_id='44' kind_id='1'><abstract_component name='Int' id_ac='98'><supertype name='DataStructure' id_ac='96' /></abstract_component></bound></context_parameter><quality_parameters name='TotalFLOPS' calc_id='108' kind_id='4' /><cost_parameters name='SWEstimatedCost' calc_id='112' kind_id='5' /><ranking_parameters name='Rank0 - 70% CPU | 30% Memory' calc_id='113' kind_id='4' /><ranking_parameters name='Rank1 - 90% CPU | 10% Memory' calc_id='114' kind_id='4' /><ranking_parameters name='Rank2 - 50% CPU | 50% Memory' calc_id='115' kind_id='4' /><ranking_parameters name='Rank3 - 30% CPU | 30% Memory | 40% Cost' calc_id='116' kind_id='4' /><ranking_parameters name='Rank4 - Lower Cost' calc_id='117' kind_id='4' /></abstract_component>";
			return component;
		} catch (Exception e) {
			System.out.println("Erro at get component: "+e.toString());
		}
		return null;
	}
	
	@RequestMapping(value="/component/save", method=RequestMethod.POST)
	@ResponseBody
	public String saveComponent(@RequestBody String cmp){
		String header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		try {
			System.out.println(cmp);
			Boolean result = service.getCoreServicesHttpSoap11Endpoint().addAbstractComponent(cmp);
			//Boolean result = true;
			return header+"<result value=\""+result+"\"/>";
		} catch (Exception e) {
			System.out.println("Erro at save component: "+e.toString());
		}
		return header+"<result value='false'/>";
	}
	
	/*@RequestMapping("/component/addParameter/{cmp}")
	@ResponseBody
	public String addParameter(@PathVariable("cmp") String cmp){
		String header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"; 
		try {
			Boolean result = service.getCoreServicesHttpSoap11Endpoint().addContextParameter(cmp);
			return header+"<result value=\""+result+"\"/>";
		} catch (Exception e) {
			System.out.println("Erro at add parameter: "+e.toString());
		}
		return header;
	}
	
	@RequestMapping("/component/addUnit/{cmp}")
	@ResponseBody
	public String addUnit(@PathVariable("cmp") String cmp){
		String header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		try{
			Integer result = service.getCoreServicesHttpSoap11Endpoint().addAbstractUnit(cmp);
			System.out.println(result);
			return header+"<result value=\""+result+"\"/>";
		}catch(Exception e){
			System.out.println("Erro at add unit: "+e.toString());
		}
		return head;
	}*/
}
