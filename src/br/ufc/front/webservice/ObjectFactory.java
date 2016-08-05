
package br.ufc.front.webservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the webservice package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _CoreServicesDBHandlerExceptionDBHandlerException_QNAME = new QName("http://webservices.storm.ufc.br", "DBHandlerException");
    private final static QName _GetContextContractResponseReturn_QNAME = new QName("http://webservices.storm.ufc.br", "return");
    private final static QName _AddConcreteUnitCmp_QNAME = new QName("http://webservices.storm.ufc.br", "cmp");
    private final static QName _SAXExceptionException_QNAME = new QName("http://sax.xml.org/xsd", "exception");
    private final static QName _SAXExceptionMessage_QNAME = new QName("http://sax.xml.org/xsd", "message");
    private final static QName _SAXExceptionCause_QNAME = new QName("http://sax.xml.org/xsd", "cause");
    private final static QName _DeployCandidateList_QNAME = new QName("http://webservices.storm.ufc.br", "candidateList");
    private final static QName _CoreServicesSAXExceptionSAXException_QNAME = new QName("http://webservices.storm.ufc.br", "SAXException");
    private final static QName _AddUnitFileXml_QNAME = new QName("http://webservices.storm.ufc.br", "xml");
    private final static QName _AddUnitFileData_QNAME = new QName("http://webservices.storm.ufc.br", "data");
    private final static QName _InstantiateCst_QNAME = new QName("http://webservices.storm.ufc.br", "cst");
    private final static QName _AddQualityFunctionFunc_QNAME = new QName("http://webservices.storm.ufc.br", "func");
    private final static QName _GetContextParameterName_QNAME = new QName("http://webservices.storm.ufc.br", "name");
    private final static QName _InstantiateACKAddress_QNAME = new QName("http://webservices.storm.ufc.br", "address");
    private final static QName _CoreServicesParserConfigurationExceptionParserConfigurationException_QNAME = new QName("http://webservices.storm.ufc.br", "ParserConfigurationException");
    private final static QName _CoreServicesIOExceptionIOException_QNAME = new QName("http://webservices.storm.ufc.br", "IOException");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: webservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link DBHandlerException }
     * 
     */
    public DBHandlerException createDBHandlerException() {
        return new DBHandlerException();
    }

    /**
     * Create an instance of {@link ShelfException }
     * 
     */
    public ShelfException createShelfException() {
        return new ShelfException();
    }

    /**
     * Create an instance of {@link DeployResponse }
     * 
     */
    public DeployResponse createDeployResponse() {
        return new DeployResponse();
    }

    /**
     * Create an instance of {@link Resolve }
     * 
     */
    public Resolve createResolve() {
        return new Resolve();
    }

    /**
     * Create an instance of {@link AddQualityFunction }
     * 
     */
    public AddQualityFunction createAddQualityFunction() {
        return new AddQualityFunction();
    }

    /**
     * Create an instance of {@link GetContextContractResponse }
     * 
     */
    public GetContextContractResponse createGetContextContractResponse() {
        return new GetContextContractResponse();
    }

    /**
     * Create an instance of {@link AddConcreteUnit }
     * 
     */
    public AddConcreteUnit createAddConcreteUnit() {
        return new AddConcreteUnit();
    }

    /**
     * Create an instance of {@link GetStatus }
     * 
     */
    public GetStatus createGetStatus() {
        return new GetStatus();
    }

    /**
     * Create an instance of {@link CancelSessionResponse }
     * 
     */
    public CancelSessionResponse createCancelSessionResponse() {
        return new CancelSessionResponse();
    }

    /**
     * Create an instance of {@link Deploy }
     * 
     */
    public Deploy createDeploy() {
        return new Deploy();
    }

    /**
     * Create an instance of {@link CancelSession }
     * 
     */
    public CancelSession createCancelSession() {
        return new CancelSession();
    }

    /**
     * Create an instance of {@link AddUnitFile }
     * 
     */
    public AddUnitFile createAddUnitFile() {
        return new AddUnitFile();
    }

    /**
     * Create an instance of {@link AddQualityFunctionResponse }
     * 
     */
    public AddQualityFunctionResponse createAddQualityFunctionResponse() {
        return new AddQualityFunctionResponse();
    }

    /**
     * Create an instance of {@link AddInnerComponent }
     * 
     */
    public AddInnerComponent createAddInnerComponent() {
        return new AddInnerComponent();
    }

    /**
     * Create an instance of {@link AddContextParameter }
     * 
     */
    public AddContextParameter createAddContextParameter() {
        return new AddContextParameter();
    }

    /**
     * Create an instance of {@link CoreServicesSAXException }
     * 
     */
    public CoreServicesSAXException createCoreServicesSAXException() {
        return new CoreServicesSAXException();
    }

    /**
     * Create an instance of {@link SAXException }
     * 
     */
    public SAXException createSAXException() {
        return new SAXException();
    }

    /**
     * Create an instance of {@link InstantiateACKResponse }
     * 
     */
    public InstantiateACKResponse createInstantiateACKResponse() {
        return new InstantiateACKResponse();
    }

    /**
     * Create an instance of {@link AddAbstractComponent }
     * 
     */
    public AddAbstractComponent createAddAbstractComponent() {
        return new AddAbstractComponent();
    }

    /**
     * Create an instance of {@link AddAbstractUnit }
     * 
     */
    public AddAbstractUnit createAddAbstractUnit() {
        return new AddAbstractUnit();
    }

    /**
     * Create an instance of {@link ListContract }
     * 
     */
    public ListContract createListContract() {
        return new ListContract();
    }

    /**
     * Create an instance of {@link GetAbstractComponent }
     * 
     */
    public GetAbstractComponent createGetAbstractComponent() {
        return new GetAbstractComponent();
    }

    /**
     * Create an instance of {@link GetStatusResponse }
     * 
     */
    public GetStatusResponse createGetStatusResponse() {
        return new GetStatusResponse();
    }

    /**
     * Create an instance of {@link AddAbstractUnitResponse }
     * 
     */
    public AddAbstractUnitResponse createAddAbstractUnitResponse() {
        return new AddAbstractUnitResponse();
    }

    /**
     * Create an instance of {@link AddInnerComponentResponse }
     * 
     */
    public AddInnerComponentResponse createAddInnerComponentResponse() {
        return new AddInnerComponentResponse();
    }

    /**
     * Create an instance of {@link GetContextParameter }
     * 
     */
    public GetContextParameter createGetContextParameter() {
        return new GetContextParameter();
    }

    /**
     * Create an instance of {@link AddUnitFileResponse }
     * 
     */
    public AddUnitFileResponse createAddUnitFileResponse() {
        return new AddUnitFileResponse();
    }

    /**
     * Create an instance of {@link CoreServicesParserConfigurationException }
     * 
     */
    public CoreServicesParserConfigurationException createCoreServicesParserConfigurationException() {
        return new CoreServicesParserConfigurationException();
    }

    /**
     * Create an instance of {@link GetProfile }
     * 
     */
    public GetProfile createGetProfile() {
        return new GetProfile();
    }

    /**
     * Create an instance of {@link AddAbstractComponentResponse }
     * 
     */
    public AddAbstractComponentResponse createAddAbstractComponentResponse() {
        return new AddAbstractComponentResponse();
    }

    /**
     * Create an instance of {@link List }
     * 
     */
    public List createList() {
        return new List();
    }

    /**
     * Create an instance of {@link ListResponse }
     * 
     */
    public ListResponse createListResponse() {
        return new ListResponse();
    }

    /**
     * Create an instance of {@link GetAbstractComponentByIDResponse }
     * 
     */
    public GetAbstractComponentByIDResponse createGetAbstractComponentByIDResponse() {
        return new GetAbstractComponentByIDResponse();
    }

    /**
     * Create an instance of {@link ResolveResponse }
     * 
     */
    public ResolveResponse createResolveResponse() {
        return new ResolveResponse();
    }

    /**
     * Create an instance of {@link AddContextContract }
     * 
     */
    public AddContextContract createAddContextContract() {
        return new AddContextContract();
    }

    /**
     * Create an instance of {@link GetContextContract }
     * 
     */
    public GetContextContract createGetContextContract() {
        return new GetContextContract();
    }

    /**
     * Create an instance of {@link GetProfileResponse }
     * 
     */
    public GetProfileResponse createGetProfileResponse() {
        return new GetProfileResponse();
    }

    /**
     * Create an instance of {@link GetAbstractComponentResponse }
     * 
     */
    public GetAbstractComponentResponse createGetAbstractComponentResponse() {
        return new GetAbstractComponentResponse();
    }

    /**
     * Create an instance of {@link InstantiateACK }
     * 
     */
    public InstantiateACK createInstantiateACK() {
        return new InstantiateACK();
    }

    /**
     * Create an instance of {@link ReleasePlatformResponse }
     * 
     */
    public ReleasePlatformResponse createReleasePlatformResponse() {
        return new ReleasePlatformResponse();
    }

    /**
     * Create an instance of {@link AddContextContractResponse }
     * 
     */
    public AddContextContractResponse createAddContextContractResponse() {
        return new AddContextContractResponse();
    }

    /**
     * Create an instance of {@link AddContextParameterResponse }
     * 
     */
    public AddContextParameterResponse createAddContextParameterResponse() {
        return new AddContextParameterResponse();
    }

    /**
     * Create an instance of {@link AddConcreteUnitResponse }
     * 
     */
    public AddConcreteUnitResponse createAddConcreteUnitResponse() {
        return new AddConcreteUnitResponse();
    }

    /**
     * Create an instance of {@link Instantiate }
     * 
     */
    public Instantiate createInstantiate() {
        return new Instantiate();
    }

    /**
     * Create an instance of {@link GetContextParameterResponse }
     * 
     */
    public GetContextParameterResponse createGetContextParameterResponse() {
        return new GetContextParameterResponse();
    }

    /**
     * Create an instance of {@link ExportComponentSignatureResponse }
     * 
     */
    public ExportComponentSignatureResponse createExportComponentSignatureResponse() {
        return new ExportComponentSignatureResponse();
    }

    /**
     * Create an instance of {@link ListContractResponse }
     * 
     */
    public ListContractResponse createListContractResponse() {
        return new ListContractResponse();
    }

    /**
     * Create an instance of {@link ExportContextContractResponse }
     * 
     */
    public ExportContextContractResponse createExportContextContractResponse() {
        return new ExportContextContractResponse();
    }

    /**
     * Create an instance of {@link ReleasePlatform }
     * 
     */
    public ReleasePlatform createReleasePlatform() {
        return new ReleasePlatform();
    }

    /**
     * Create an instance of {@link ExportContextContract }
     * 
     */
    public ExportContextContract createExportContextContract() {
        return new ExportContextContract();
    }

    /**
     * Create an instance of {@link GetAbstractComponentByID }
     * 
     */
    public GetAbstractComponentByID createGetAbstractComponentByID() {
        return new GetAbstractComponentByID();
    }

    /**
     * Create an instance of {@link ExportComponentSignature }
     * 
     */
    public ExportComponentSignature createExportComponentSignature() {
        return new ExportComponentSignature();
    }

    /**
     * Create an instance of {@link CoreServicesIOException }
     * 
     */
    public CoreServicesIOException createCoreServicesIOException() {
        return new CoreServicesIOException();
    }

    /**
     * Create an instance of {@link IOException }
     * 
     */
    public IOException createIOException() {
        return new IOException();
    }

    /**
     * Create an instance of {@link CoreServicesDBHandlerException }
     * 
     */
    public CoreServicesDBHandlerException createCoreServicesDBHandlerException() {
        return new CoreServicesDBHandlerException();
    }

    /**
     * Create an instance of {@link InstantiateResponse }
     * 
     */
    public InstantiateResponse createInstantiateResponse() {
        return new InstantiateResponse();
    }

    /**
     * Create an instance of {@link SetObsoleteResponse }
     * 
     */
    public SetObsoleteResponse createSetObsoleteResponse() {
        return new SetObsoleteResponse();
    }

    /**
     * Create an instance of {@link SetObsolete }
     * 
     */
    public SetObsolete createSetObsolete() {
        return new SetObsolete();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DBHandlerException }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "DBHandlerException", scope = CoreServicesDBHandlerException.class)
    public JAXBElement<DBHandlerException> createCoreServicesDBHandlerExceptionDBHandlerException(DBHandlerException value) {
        return new JAXBElement<DBHandlerException>(_CoreServicesDBHandlerExceptionDBHandlerException_QNAME, DBHandlerException.class, CoreServicesDBHandlerException.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = GetContextContractResponse.class)
    public JAXBElement<String> createGetContextContractResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, GetContextContractResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = AddConcreteUnit.class)
    public JAXBElement<String> createAddConcreteUnitCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, AddConcreteUnit.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Object }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://sax.xml.org/xsd", name = "exception", scope = SAXException.class)
    public JAXBElement<Object> createSAXExceptionException(Object value) {
        return new JAXBElement<Object>(_SAXExceptionException_QNAME, Object.class, SAXException.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://sax.xml.org/xsd", name = "message", scope = SAXException.class)
    public JAXBElement<String> createSAXExceptionMessage(String value) {
        return new JAXBElement<String>(_SAXExceptionMessage_QNAME, String.class, SAXException.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Object }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://sax.xml.org/xsd", name = "cause", scope = SAXException.class)
    public JAXBElement<Object> createSAXExceptionCause(Object value) {
        return new JAXBElement<Object>(_SAXExceptionCause_QNAME, Object.class, SAXException.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "candidateList", scope = Deploy.class)
    public JAXBElement<String> createDeployCandidateList(String value) {
        return new JAXBElement<String>(_DeployCandidateList_QNAME, String.class, Deploy.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = GetAbstractComponentByIDResponse.class)
    public JAXBElement<String> createGetAbstractComponentByIDResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, GetAbstractComponentByIDResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = GetContextParameterResponse.class)
    public JAXBElement<String> createGetContextParameterResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, GetContextParameterResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SAXException }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "SAXException", scope = CoreServicesSAXException.class)
    public JAXBElement<SAXException> createCoreServicesSAXExceptionSAXException(SAXException value) {
        return new JAXBElement<SAXException>(_CoreServicesSAXExceptionSAXException_QNAME, SAXException.class, CoreServicesSAXException.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = DeployResponse.class)
    public JAXBElement<String> createDeployResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, DeployResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "xml", scope = AddUnitFile.class)
    public JAXBElement<String> createAddUnitFileXml(String value) {
        return new JAXBElement<String>(_AddUnitFileXml_QNAME, String.class, AddUnitFile.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link byte[]}{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "data", scope = AddUnitFile.class)
    public JAXBElement<byte[]> createAddUnitFileData(byte[] value) {
        return new JAXBElement<byte[]>(_AddUnitFileData_QNAME, byte[].class, AddUnitFile.class, ((byte[]) value));
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cst", scope = Instantiate.class)
    public JAXBElement<String> createInstantiateCst(String value) {
        return new JAXBElement<String>(_InstantiateCst_QNAME, String.class, Instantiate.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = AddAbstractComponent.class)
    public JAXBElement<String> createAddAbstractComponentCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, AddAbstractComponent.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = ExportComponentSignatureResponse.class)
    public JAXBElement<String> createExportComponentSignatureResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, ExportComponentSignatureResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = AddContextContract.class)
    public JAXBElement<String> createAddContextContractCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, AddContextContract.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = GetAbstractComponentResponse.class)
    public JAXBElement<String> createGetAbstractComponentResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, GetAbstractComponentResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "func", scope = AddQualityFunction.class)
    public JAXBElement<String> createAddQualityFunctionFunc(String value) {
        return new JAXBElement<String>(_AddQualityFunctionFunc_QNAME, String.class, AddQualityFunction.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "name", scope = GetContextParameter.class)
    public JAXBElement<String> createGetContextParameterName(String value) {
        return new JAXBElement<String>(_GetContextParameterName_QNAME, String.class, GetContextParameter.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = InstantiateResponse.class)
    public JAXBElement<String> createInstantiateResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, InstantiateResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = Resolve.class)
    public JAXBElement<String> createResolveCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, Resolve.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = AddContextParameter.class)
    public JAXBElement<String> createAddContextParameterCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, AddContextParameter.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = ListResponse.class)
    public JAXBElement<String> createListResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, ListResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = AddInnerComponent.class)
    public JAXBElement<String> createAddInnerComponentCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, AddInnerComponent.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = ResolveResponse.class)
    public JAXBElement<String> createResolveResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, ResolveResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "address", scope = InstantiateACK.class)
    public JAXBElement<String> createInstantiateACKAddress(String value) {
        return new JAXBElement<String>(_InstantiateACKAddress_QNAME, String.class, InstantiateACK.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cst", scope = ReleasePlatform.class)
    public JAXBElement<String> createReleasePlatformCst(String value) {
        return new JAXBElement<String>(_InstantiateCst_QNAME, String.class, ReleasePlatform.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cst", scope = GetStatus.class)
    public JAXBElement<String> createGetStatusCst(String value) {
        return new JAXBElement<String>(_InstantiateCst_QNAME, String.class, GetStatus.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = SetObsolete.class)
    public JAXBElement<String> createSetObsoleteCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, SetObsolete.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "cmp", scope = AddAbstractUnit.class)
    public JAXBElement<String> createAddAbstractUnitCmp(String value) {
        return new JAXBElement<String>(_AddConcreteUnitCmp_QNAME, String.class, AddAbstractUnit.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = ExportContextContractResponse.class)
    public JAXBElement<String> createExportContextContractResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, ExportContextContractResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = ListContractResponse.class)
    public JAXBElement<String> createListContractResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, ListContractResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "name", scope = GetAbstractComponent.class)
    public JAXBElement<String> createGetAbstractComponentName(String value) {
        return new JAXBElement<String>(_GetContextParameterName_QNAME, String.class, GetAbstractComponent.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Object }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "ParserConfigurationException", scope = CoreServicesParserConfigurationException.class)
    public JAXBElement<Object> createCoreServicesParserConfigurationExceptionParserConfigurationException(Object value) {
        return new JAXBElement<Object>(_CoreServicesParserConfigurationExceptionParserConfigurationException_QNAME, Object.class, CoreServicesParserConfigurationException.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = InstantiateACKResponse.class)
    public JAXBElement<String> createInstantiateACKResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, InstantiateACKResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = GetStatusResponse.class)
    public JAXBElement<String> createGetStatusResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, GetStatusResponse.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link IOException }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "IOException", scope = CoreServicesIOException.class)
    public JAXBElement<IOException> createCoreServicesIOExceptionIOException(IOException value) {
        return new JAXBElement<IOException>(_CoreServicesIOExceptionIOException_QNAME, IOException.class, CoreServicesIOException.class, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link String }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservices.storm.ufc.br", name = "return", scope = GetProfileResponse.class)
    public JAXBElement<String> createGetProfileResponseReturn(String value) {
        return new JAXBElement<String>(_GetContextContractResponseReturn_QNAME, String.class, GetProfileResponse.class, value);
    }

}
