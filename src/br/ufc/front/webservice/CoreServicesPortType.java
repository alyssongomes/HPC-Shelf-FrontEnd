
package br.ufc.front.webservice;

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
    @RequestWrapper(localName = "getContextContract", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetContextContract")
    @ResponseWrapper(localName = "getContextContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetContextContractResponse")
    public String getContextContract(
        @WebParam(name = "id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer id);

    /**
     * 
     * @param name
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getContextParameter")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getContextParameter", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetContextParameter")
    @ResponseWrapper(localName = "getContextParameterResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetContextParameterResponse")
    public String getContextParameter(
        @WebParam(name = "name", targetNamespace = "http://webservices.storm.ufc.br")
        String name);

    /**
     * 
     * @param address
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:instantiateACK")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "instantiateACK", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.InstantiateACK")
    @ResponseWrapper(localName = "instantiateACKResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.InstantiateACKResponse")
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
    @RequestWrapper(localName = "resolve", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.Resolve")
    @ResponseWrapper(localName = "resolveResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.ResolveResponse")
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
    @RequestWrapper(localName = "addQualityFunction", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddQualityFunction")
    @ResponseWrapper(localName = "addQualityFunctionResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddQualityFunctionResponse")
    public Integer addQualityFunction(
        @WebParam(name = "func", targetNamespace = "http://webservices.storm.ufc.br")
        String func);

    /**
     * 
     * @param id
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:getProfile")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "getProfile", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetProfile")
    @ResponseWrapper(localName = "getProfileResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetProfileResponse")
    public String getProfile(
        @WebParam(name = "id", targetNamespace = "http://webservices.storm.ufc.br")
        Integer id);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:addConcreteUnit")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addConcreteUnit", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddConcreteUnit")
    @ResponseWrapper(localName = "addConcreteUnitResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddConcreteUnitResponse")
    public Boolean addConcreteUnit(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:list")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "list", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.List")
    @ResponseWrapper(localName = "listResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.ListResponse")
    public String list();

    /**
     * 
     * @param candidateList
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "urn:deploy")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "deploy", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.Deploy")
    @ResponseWrapper(localName = "deployResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.DeployResponse")
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
    @RequestWrapper(localName = "cancelSession", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.CancelSession")
    @ResponseWrapper(localName = "cancelSessionResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.CancelSessionResponse")
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
    @RequestWrapper(localName = "addUnitFile", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddUnitFile")
    @ResponseWrapper(localName = "addUnitFileResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddUnitFileResponse")
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
    @RequestWrapper(localName = "addInnerComponent", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddInnerComponent")
    @ResponseWrapper(localName = "addInnerComponentResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddInnerComponentResponse")
    public Boolean addInnerComponent(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param uri
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:releasePlatform")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "releasePlatform", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.ReleasePlatform")
    @ResponseWrapper(localName = "releasePlatformResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.ReleasePlatformResponse")
    public Boolean releasePlatform(
        @WebParam(name = "uri", targetNamespace = "http://webservices.storm.ufc.br")
        String uri);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:setObsolete")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "setObsolete", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.SetObsolete")
    @ResponseWrapper(localName = "setObsoleteResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.SetObsoleteResponse")
    public Boolean setObsolete(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     */
    @WebMethod(action = "urn:addContextParameter")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addContextParameter", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddContextParameter")
    @ResponseWrapper(localName = "addContextParameterResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddContextParameterResponse")
    public Boolean addContextParameter(
        @WebParam(name = "cmp", targetNamespace = "http://webservices.storm.ufc.br")
        String cmp);

    /**
     * 
     * @param cmp
     * @return
     *     returns java.lang.Boolean
     * @throws CoreServicesParserConfigurationException_Exception
     * @throws CoreServicesSAXException_Exception
     * @throws CoreServicesIOException_Exception
     */
    @WebMethod(action = "urn:addContextContract")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addContextContract", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddContextContract")
    @ResponseWrapper(localName = "addContextContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddContextContractResponse")
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
     * @throws CoreServicesParserConfigurationException_Exception
     * @throws CoreServicesSAXException_Exception
     * @throws CoreServicesDBHandlerException_Exception
     * @throws CoreServicesIOException_Exception
     */
    @WebMethod(action = "urn:addAbstractComponent")
    @WebResult(targetNamespace = "http://webservices.storm.ufc.br")
    @RequestWrapper(localName = "addAbstractComponent", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddAbstractComponent")
    @ResponseWrapper(localName = "addAbstractComponentResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddAbstractComponentResponse")
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
    @RequestWrapper(localName = "addAbstractUnit", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddAbstractUnit")
    @ResponseWrapper(localName = "addAbstractUnitResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.AddAbstractUnitResponse")
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
    @RequestWrapper(localName = "getAbstractComponentByID", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetAbstractComponentByID")
    @ResponseWrapper(localName = "getAbstractComponentByIDResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetAbstractComponentByIDResponse")
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
    @RequestWrapper(localName = "listContract", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.ListContract")
    @ResponseWrapper(localName = "listContractResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.ListContractResponse")
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
    @RequestWrapper(localName = "getAbstractComponent", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetAbstractComponent")
    @ResponseWrapper(localName = "getAbstractComponentResponse", targetNamespace = "http://webservices.storm.ufc.br", className = "ws2.GetAbstractComponentResponse")
    public String getAbstractComponent(
        @WebParam(name = "name", targetNamespace = "http://webservices.storm.ufc.br")
        String name);

}