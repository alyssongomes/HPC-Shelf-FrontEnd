
package br.ufc.hpc.frontend.webservice;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebService(name = "CoreServicesPortType", targetNamespace = "http://webservices.storm.ufc.br")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface CoreServicesPortType {


    /**
     * 
     * @param id
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getContextContract")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getContextContract", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetContextContract")
    @ResponseWrapper(localName = "getContextContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetContextContractResponse")
    public String getContextContract(
        @WebParam(name = "id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer id);

    /**
     * 
     * @param address
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:instantiateACK")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "instantiateACK", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.InstantiateACK")
    @ResponseWrapper(localName = "instantiateACKResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.InstantiateACKResponse")
    public String instantiateACK(
        @WebParam(name = "address", targetNamespace = "http://webservices.storm.ufc.br")
        String address);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:resolve")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "resolve", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.Resolve")
    @ResponseWrapper(localName = "resolveResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ResolveResponse")
    public String resolve(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param func
     * @return
     *     returns java.lang.Integer
     */
    @WebMethod(action = "urn:addQualityFunction")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addQualityFunction", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddQualityFunction")
    @ResponseWrapper(localName = "addQualityFunctionResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddQualityFunctionResponse")
    public Integer addQualityFunction(
        @WebParam(name = "func", targetNamespace = "http://webservices.storm.ufc.br")
        String func);

    /**
     * 
     * @param cst
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getStatus")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getStatus", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetStatus")
    @ResponseWrapper(localName = "getStatusResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetStatusResponse")
    public String getStatus(
        @WebParam(name = "cst", targetNamespace = "http://webservices.storm.ufc.br")
        String cst);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Integer
     */
    @WebMethod(action = "urn:addConcreteUnit")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addConcreteUnit", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddConcreteUnit")
    @ResponseWrapper(localName = "addConcreteUnitResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddConcreteUnitResponse")
    public Integer addConcreteUnit(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param cst
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:instantiate")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "instantiate", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.Instantiate")
    @ResponseWrapper(localName = "instantiateResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.InstantiateResponse")
    public String instantiate(
        @WebParam(name = "cst", targetNamespace = "http://webservices.storm.ufc.br")
        String cst);

    /**
     * 
     * @param candidateList
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:deploy")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "deploy", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.Deploy")
    @ResponseWrapper(localName = "deployResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.DeployResponse")
    public String deploy(
        @WebParam(name = "candidateList", targetNamespace = "http://webservices.storm.ufc.br")
        String candidateList);

    /**
     * 
     * @param sessionID
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:cancelSession")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "cancelSession", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.CancelSession")
    @ResponseWrapper(localName = "cancelSessionResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.CancelSessionResponse")
    public Boolean cancelSession(
        @WebParam(name = "sessionID", targetNamespace = "http://webservices.storm.ufc.br")
        Integer sessionID);

    /**
     * 
     * @param data
     * @param xml
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:addUnitFile")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addUnitFile", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddUnitFile")
    @ResponseWrapper(localName = "addUnitFileResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddUnitFileResponse")
    public Boolean addUnitFile(
        @WebParam(name = "data", targetNamespace = "http://webservices.storm.ufc.br")
        byte[] data,
        @WebParam(name = "xml", targetNamespace = "http://webservices.storm.ufc.br")
        String xml);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:addInnerComponent")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addInnerComponent", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddInnerComponent")
    @ResponseWrapper(localName = "addInnerComponentResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddInnerComponentResponse")
    public Boolean addInnerComponent(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param cst
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:releasePlatform")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "releasePlatform", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ReleasePlatform")
    @ResponseWrapper(localName = "releasePlatformResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ReleasePlatformResponse")
    public Boolean releasePlatform(
        @WebParam(name = "cst", targetNamespace = "http://webservices.storm.ufc.br")
        String cst);

    /**
     * 
     * @param ccId
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:exportContextContract")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "exportContextContract", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ExportContextContract")
    @ResponseWrapper(localName = "exportContextContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ExportContextContractResponse")
    public String exportContextContract(
        @WebParam(name = "cc_id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer ccId);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:addContextParameter")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addContextParameter", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddContextParameter")
    @ResponseWrapper(localName = "addContextParameterResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddContextParameterResponse")
    public Boolean addContextParameter(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     * @throws CoreServicesSAXException_Exception
     * @throws CoreServicesIOException_Exception
     * @throws CoreServicesDBHandlerException_Exception
     * @throws CoreServicesParserConfigurationException_Exception
     */
    @WebMethod(action = "urn:addAbstractComponent")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addAbstractComponent", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddAbstractComponent")
    @ResponseWrapper(localName = "addAbstractComponentResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddAbstractComponentResponse")
    public Boolean addAbstractComponent(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp)
        throws CoreServicesDBHandlerException_Exception, CoreServicesIOException_Exception, CoreServicesParserConfigurationException_Exception, CoreServicesSAXException_Exception
    ;

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Integer
     */
    @WebMethod(action = "urn:addAbstractUnit")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addAbstractUnit", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddAbstractUnit")
    @ResponseWrapper(localName = "addAbstractUnitResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddAbstractUnitResponse")
    public Integer addAbstractUnit(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param id
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getAbstractComponentByID")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getAbstractComponentByID", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetAbstractComponentByID")
    @ResponseWrapper(localName = "getAbstractComponentByIDResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetAbstractComponentByIDResponse")
    public String getAbstractComponentByID(
        @WebParam(name = "id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer id);

    /**
     * 
     * @param acId
     * @return
     *     returns java.lang.String
     * @throws CoreServicesDBHandlerException_Exception
     */
    @WebMethod(action = "urn:listContract")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "listContract", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ListContract")
    @ResponseWrapper(localName = "listContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ListContractResponse")
    public String listContract(
        @WebParam(name = "ac_id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer acId)
        throws CoreServicesDBHandlerException_Exception
    ;

    /**
     * 
     * @param name
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getAbstractComponent")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getAbstractComponent", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetAbstractComponent")
    @ResponseWrapper(localName = "getAbstractComponentResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetAbstractComponentResponse")
    public String getAbstractComponent(
        @WebParam(name = "name", targetNamespace = "http://webservices.storm.ufc.br")
        String name);

    /**
     * 
     * @param acId
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:exportComponentSignature")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "exportComponentSignature", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ExportComponentSignature")
    @ResponseWrapper(localName = "exportComponentSignatureResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ExportComponentSignatureResponse")
    public String exportComponentSignature(
        @WebParam(name = "ac_id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer acId);

    /**
     * 
     * @param name
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getContextParameter")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getContextParameter", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetContextParameter")
    @ResponseWrapper(localName = "getContextParameterResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetContextParameterResponse")
    public String getContextParameter(
        @WebParam(name = "name", targetNamespace = "http://webservices.storm.ufc.br")
        String name);

    /**
     * 
     * @param id
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getProfile")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getProfile", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetProfile")
    @ResponseWrapper(localName = "getProfileResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.GetProfileResponse")
    public String getProfile(
        @WebParam(name = "id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer id);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:convertContextContract")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "convertContextContract", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ConvertContextContract")
    @ResponseWrapper(localName = "convertContextContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ConvertContextContractResponse")
    public String convertContextContract(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:list")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "list", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.List")
    @ResponseWrapper(localName = "listResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.ListResponse")
    public String list();

    /**
     * 
     * @param candidateList
     * @param i
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:sortCandidates")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "sortCandidates", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.SortCandidates")
    @ResponseWrapper(localName = "sortCandidatesResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.SortCandidatesResponse")
    public String sortCandidates(
        @WebParam(name = "candidateList", targetNamespace = "http://webservices.storm.ufc.br")
        String candidateList,
        @WebParam(name = "i", targetNamespace = "http://webservices.storm.ufc.br")
        Integer i);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     * @throws CoreServicesSAXException_Exception
     * @throws CoreServicesIOException_Exception
     * @throws CoreServicesParserConfigurationException_Exception
     */
    @WebMethod(action = "urn:addContextContract")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addContextContract", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddContextContract")
    @ResponseWrapper(localName = "addContextContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.AddContextContractResponse")
    public Boolean addContextContract(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp)
        throws CoreServicesIOException_Exception, CoreServicesParserConfigurationException_Exception, CoreServicesSAXException_Exception
    ;

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:setObsolete")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "setObsolete", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.SetObsolete")
    @ResponseWrapper(localName = "setObsoleteResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "webservice.SetObsoleteResponse")
    public Boolean setObsolete(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

}
