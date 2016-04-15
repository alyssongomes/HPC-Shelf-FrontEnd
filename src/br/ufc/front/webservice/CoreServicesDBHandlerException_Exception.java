
package br.ufc.front.webservice;

import javax.xml.ws.WebFault;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebFault(name = "CoreServicesDBHandlerException", targetNamespace = "http://webservices.storm.ufc.br")
public class CoreServicesDBHandlerException_Exception
    extends Exception
{

    /**
     * Java type that goes as soapenv:Fault detail element.
     * 
     */
    private CoreServicesDBHandlerException faultInfo;

    /**
     * 
     * @param faultInfo
     * @param message
     */
    public CoreServicesDBHandlerException_Exception(String message, CoreServicesDBHandlerException faultInfo) {
        super(message);
        this.faultInfo = faultInfo;
    }

    /**
     * 
     * @param faultInfo
     * @param cause
     * @param message
     */
    public CoreServicesDBHandlerException_Exception(String message, CoreServicesDBHandlerException faultInfo, Throwable cause) {
        super(message, cause);
        this.faultInfo = faultInfo;
    }

    /**
     * 
     * @return
     *     returns fault bean: ws2.CoreServicesDBHandlerException
     */
    public CoreServicesDBHandlerException getFaultInfo() {
        return faultInfo;
    }

}
